const express = require('express');
const { SESSION_COOKIE_NAME, parseCookies } = require('../utils/cookies');

function createPlanRoutes(pool, sessionService) {
    const router = express.Router();

    router.get('/plans', async (req, res) => {
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

    return router;
}

module.exports = createPlanRoutes;