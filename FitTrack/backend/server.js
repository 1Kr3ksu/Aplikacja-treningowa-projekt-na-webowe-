require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const createAuthRoutes = require('./routes/authRoutes');
const createSessionService = require('./services/sessionService');
const { SESSION_COOKIE_NAME, parseCookies } = require('./utils/cookies');

const app = express();
const PORT = process.env.PORT || 3000;

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

const sessionService = createSessionService(pool);

app.use('/api', createAuthRoutes(pool));

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/api/exercises', async (req, res) => {
    try {
        const [exercises] = await pool.execute(
            `SELECT id, name, category, description, difficulty, image_url
             FROM exercises
             ORDER BY name ASC`
        );

        return res.json({ exercises });
    } catch (error) {
        console.error('Exercises error:', error);
        return res.status(500).json({ message: 'Nie udało się pobrać ćwiczeń.' });
    }
});

app.get('/api/plans', async (req, res) => {
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

        const [plans] = await pool.execute(
            `SELECT training_plans.id,
                    training_plans.name,
                    training_plans.description,
                    training_plans.goal,
                    training_plans.target_per_week,
                    COUNT(training_plan_exercises.id) AS exercise_count
             FROM training_plans
             LEFT JOIN training_plan_exercises
                ON training_plan_exercises.training_plan_id = training_plans.id
             WHERE training_plans.user_id = ?
             GROUP BY training_plans.id
             ORDER BY training_plans.created_at DESC`,
            [user.id]
        );

        return res.json({ plans });
    } catch (error) {
        console.error('Plans error:', error);
        return res.status(500).json({ message: 'Nie udało się pobrać planów.' });
    }
});

app.get('/', (req, res) => {
    res.send('FitTrack backend is running.');
});

async function startServer() {
    try {
        await sessionService.ensureSessionTable();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Server start error:', error);
        process.exit(1);
    }
}

startServer();
