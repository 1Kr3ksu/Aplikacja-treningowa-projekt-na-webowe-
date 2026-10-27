const express = require('express');

function createExerciseRoutes(pool) {
    const router = express.Router();

    router.get('/exercises', async (req, res) => {
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

    return router;
}

module.exports = createExerciseRoutes;