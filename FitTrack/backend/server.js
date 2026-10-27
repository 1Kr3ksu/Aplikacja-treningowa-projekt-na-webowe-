require('dotenv').config();

const express = require('express');
const cors = require('cors');
const createAuthRoutes = require('./routes/authRoutes');
const createExerciseRoutes = require('./routes/exerciseRoutes');
const createPlanRoutes = require('./routes/planRoutes');
const createSessionService = require('./services/sessionService');
const pool = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());

const sessionService = createSessionService(pool);

app.use('/api', createAuthRoutes(pool));
app.use('/api', createExerciseRoutes(pool));
app.use('/api', createPlanRoutes(pool, sessionService));

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
