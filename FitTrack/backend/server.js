require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const createAuthRoutes = require('./routes/authRoutes');
const createSessionService = require('./services/sessionService');

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
