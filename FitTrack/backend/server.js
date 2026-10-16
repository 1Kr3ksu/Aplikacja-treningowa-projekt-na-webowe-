require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const SALT_ROUNDS = 10;
const SESSION_COOKIE_NAME = 'fittrack_session';
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7;

function parseCookies(cookieHeader = '') {
    return cookieHeader.split(';').reduce((cookies, part) => {
        const [rawKey, ...rest] = part.trim().split('=');

        if (!rawKey) {
            return cookies;
        }

        cookies[rawKey] = decodeURIComponent(rest.join('='));
        return cookies;
    }, {});
}

function createSessionCookie(token) {
    const parts = [
        `${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}`,
        'Path=/',
        'HttpOnly',
        `Max-Age=${Math.floor(SESSION_DURATION_MS / 1000)}`,
        'SameSite=Lax',
    ];

    if (process.env.NODE_ENV === 'production') {
        parts.push('Secure');
    }

    return parts.join('; ');
}

function clearSessionCookie() {
    const parts = [
        `${SESSION_COOKIE_NAME}=`,
        'Path=/',
        'HttpOnly',
        'Max-Age=0',
        'SameSite=Lax',
    ];

    if (process.env.NODE_ENV === 'production') {
        parts.push('Secure');
    }

    return parts.join('; ');
}

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fittrack',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

async function ensureSessionTable() {
    await pool.execute(`
        CREATE TABLE IF NOT EXISTS sessions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            session_token_hash CHAR(64) NOT NULL UNIQUE,
            expires_at DATETIME NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

            CONSTRAINT fk_sessions_users
                FOREIGN KEY (user_id)
                REFERENCES users(id)
                ON DELETE CASCADE,

            INDEX idx_sessions_user_id (user_id),
            INDEX idx_sessions_expires_at (expires_at)
        )
    `);
}

async function getUserBySessionToken(sessionToken) {
    const sessionTokenHash = crypto.createHash('sha256').update(sessionToken).digest('hex');
    const [sessions] = await pool.execute(
        `SELECT sessions.user_id, sessions.expires_at, users.nick, users.email
         FROM sessions
         INNER JOIN users ON users.id = sessions.user_id
         WHERE sessions.session_token_hash = ?
         LIMIT 1`,
        [sessionTokenHash]
    );

    if (sessions.length === 0) {
        return null;
    }

    const session = sessions[0];

    if (new Date(session.expires_at).getTime() <= Date.now()) {
        await pool.execute('DELETE FROM sessions WHERE user_id = ? AND session_token_hash = ?', [session.user_id, sessionTokenHash]);
        return null;
    }

    return {
        id: session.user_id,
        name: session.nick,
        email: session.email,
        sessionTokenHash,
    };
}

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password, confirmPassword, acceptTerms } = req.body;
        const trimmedName = typeof name === 'string' ? name.trim() : '';
        const trimmedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

        if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
            return res.status(400).json({ message: 'Wypełnij wszystkie pola.' });
        }

        if (trimmedName.length < 2 || trimmedName.length > 20) {
            return res.status(400).json({ message: 'Imię musi mieć od 2 do 20 znaków.' });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            return res.status(400).json({ message: 'Niepoprawny e-mail.' });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: 'Hasło musi mieć co najmniej 8 znaków.' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Hasła nie są takie same.' });
        }

        if (!acceptTerms) {
            return res.status(400).json({ message: 'Musisz zaakceptować regulamin.' });
        }

        const [existingUsers] = await pool.execute('SELECT id FROM users WHERE email = ? LIMIT 1', [trimmedEmail]);

        if (existingUsers.length > 0) {
            return res.status(409).json({ message: 'Taki e-mail już istnieje.' });
        }

        const [existingNick] = await pool.execute('SELECT id FROM users WHERE nick = ? LIMIT 1', [trimmedName]);

        if (existingNick.length > 0) {
            return res.status(409).json({ message: 'Takie imię już istnieje.' });
        }

        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

        const [result] = await pool.execute(
            'INSERT INTO users (nick, email, password_hash) VALUES (?, ?, ?)',
            [trimmedName, trimmedEmail, passwordHash]
        );

        return res.status(201).json({
            message: 'Rejestracja udana.',
            user: {
                id: result.insertId,
                name: trimmedName,
                email: trimmedEmail,
            },
        });
    } catch (error) {
        console.error('Register error:', error);
        return res.status(500).json({ message: 'Błąd serwera.' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const trimmedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

        if (!trimmedEmail || !password) {
            return res.status(400).json({ message: 'Wypełnij wszystkie pola.' });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            return res.status(400).json({ message: 'Niepoprawny e-mail.' });
        }

        const [users] = await pool.execute(
            'SELECT id, nick, email, password_hash FROM users WHERE email = ? LIMIT 1',
            [trimmedEmail]
        );

        if (users.length === 0) {
            return res.status(401).json({ message: 'Nieprawidłowy e-mail lub hasło.' });
        }

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Nieprawidłowy e-mail lub hasło.' });
        }

        const sessionToken = crypto.randomBytes(32).toString('hex');
        const sessionTokenHash = crypto.createHash('sha256').update(sessionToken).digest('hex');
        const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

        await pool.execute(
            'INSERT INTO sessions (user_id, session_token_hash, expires_at) VALUES (?, ?, ?)',
            [user.id, sessionTokenHash, expiresAt]
        );

        res.setHeader('Set-Cookie', createSessionCookie(sessionToken));

        return res.status(200).json({
            message: 'Logowanie udane.',
            user: {
                id: user.id,
                name: user.nick,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Błąd serwera.' });
    }
});

app.get('/api/me', async (req, res) => {
    try {
        const cookies = parseCookies(req.headers.cookie || '');
        const sessionToken = cookies[SESSION_COOKIE_NAME];

        if (!sessionToken) {
            return res.status(401).json({ message: 'Brak aktywnej sesji.' });
        }

        const user = await getUserBySessionToken(sessionToken);

        if (!user) {
            return res.status(401).json({ message: 'Sesja wygasła.' });
        }

        return res.status(200).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Me error:', error);
        return res.status(500).json({ message: 'Błąd serwera.' });
    }
});

app.post('/api/logout', async (req, res) => {
    try {
        const cookies = parseCookies(req.headers.cookie || '');
        const sessionToken = cookies[SESSION_COOKIE_NAME];

        if (sessionToken) {
            const sessionTokenHash = crypto.createHash('sha256').update(sessionToken).digest('hex');
            await pool.execute('DELETE FROM sessions WHERE session_token_hash = ?', [sessionTokenHash]);
        }

        res.setHeader('Set-Cookie', clearSessionCookie());

        return res.status(200).json({ message: 'Wylogowano.' });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ message: 'Błąd serwera.' });
    }
});

app.get('/', (req, res) => {
    res.send('FitTrack backend is running.');
});

async function startServer() {
    try {
        await ensureSessionTable();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Server start error:', error);
        process.exit(1);
    }
}

startServer();
