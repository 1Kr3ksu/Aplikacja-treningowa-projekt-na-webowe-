const crypto = require('crypto');

function createSessionService(pool) {
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
            await pool.execute(
                'DELETE FROM sessions WHERE user_id = ? AND session_token_hash = ?',
                [session.user_id, sessionTokenHash]
            );
            return null;
        }

        return {
            id: session.user_id,
            name: session.nick,
            email: session.email,
        };
    }

    return {
        ensureSessionTable,
        getUserBySessionToken,
    };
}

module.exports = createSessionService;