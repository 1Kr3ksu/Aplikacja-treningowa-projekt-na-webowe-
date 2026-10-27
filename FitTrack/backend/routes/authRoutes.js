const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const createSessionService = require('../services/sessionService');
const {
    SESSION_COOKIE_NAME,
    SESSION_DURATION_MS,
    parseCookies,
    createSessionCookie,
    clearSessionCookie,
} = require('../utils/cookies');
const SALT_ROUNDS = 10;

function createAuthRoutes(pool) {
    const router = express.Router();
    const sessionService = createSessionService(pool);

    router.post('/register', async (req, res) => {
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

            const [existingUsers] = await pool.execute(
                'SELECT id FROM users WHERE email = ? LIMIT 1',
                [trimmedEmail]
            );

            if (existingUsers.length > 0) {
                return res.status(409).json({ message: 'Taki e-mail już istnieje.' });
            }

            const [existingNick] = await pool.execute(
                'SELECT id FROM users WHERE nick = ? LIMIT 1',
                [trimmedName]
            );

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

    router.post('/login', async (req, res) => {
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

    router.get('/me', async (req, res) => {
        try {
            const cookies = parseCookies(req.headers.cookie || '');
            const sessionToken = cookies[SESSION_COOKIE_NAME];

            if (!sessionToken) {
                return res.status(401).json({ message: 'Brak aktywnej sesji.' });
            }

            const user = await sessionService.getUserBySessionToken(sessionToken);

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

    router.post('/logout', async (req, res) => {
        try {
            const cookies = parseCookies(req.headers.cookie || '');
            const sessionToken = cookies[SESSION_COOKIE_NAME];

            if (sessionToken) {
                const sessionTokenHash = crypto.createHash('sha256').update(sessionToken).digest('hex');
                await pool.execute(
                    'DELETE FROM sessions WHERE session_token_hash = ?',
                    [sessionTokenHash]
                );
            }

            res.setHeader('Set-Cookie', clearSessionCookie());

            return res.status(200).json({ message: 'Wylogowano.' });
        } catch (error) {
            console.error('Logout error:', error);
            return res.status(500).json({ message: 'Błąd serwera.' });
        }
    });

    return router;
}

module.exports = createAuthRoutes;
