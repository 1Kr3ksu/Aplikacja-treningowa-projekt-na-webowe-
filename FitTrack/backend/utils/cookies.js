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

module.exports = {
    SESSION_COOKIE_NAME,
    SESSION_DURATION_MS,
    parseCookies,
    createSessionCookie,
    clearSessionCookie,
};