-- 1. UŻYTKOWNICY
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nick VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    registration_date DATETIME NOT NULL
        DEFAULT CURRENT_TIMESTAMP
);


-- 1b. SESJE UŻYTKOWNIKÓW
CREATE TABLE sessions (
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
);


-- 2. KATALOG ĆWICZEŃ
CREATE TABLE exercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    difficulty VARCHAR(20) NOT NULL,
    image_url VARCHAR(255),
    created_at DATETIME NOT NULL
        DEFAULT CURRENT_TIMESTAMP
);


-- 3. PLANY TRENINGOWE
CREATE TABLE training_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    goal VARCHAR(100),
    target_per_week TINYINT UNSIGNED NOT NULL,
    created_at DATETIME NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_plans_users
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CHECK (target_per_week BETWEEN 1 AND 7)
);


-- 4. ĆWICZENIA PRZYPISANE DO PLANÓW
CREATE TABLE training_plan_exercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    training_plan_id INT NOT NULL,
    exercise_id INT NOT NULL,
    position INT UNSIGNED NOT NULL,
    sets TINYINT UNSIGNED NOT NULL,
    reps VARCHAR(30) NOT NULL,

    CONSTRAINT fk_tpe_plans
        FOREIGN KEY (training_plan_id)
        REFERENCES training_plans(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_tpe_exercises
        FOREIGN KEY (exercise_id)
        REFERENCES exercises(id),

    UNIQUE (training_plan_id, position),
    CHECK (sets > 0)
);


-- 5. WYKONANE TRENINGI
CREATE TABLE workouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    training_plan_id INT NULL,
    name VARCHAR(100) NOT NULL,
    started_at DATETIME NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    finished_at DATETIME NULL,
    notes TEXT,

    CONSTRAINT fk_workouts_users
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_workouts_plans
        FOREIGN KEY (training_plan_id)
        REFERENCES training_plans(id)
        ON DELETE SET NULL
);


-- 6. WYKONANE SERIE ĆWICZEŃ
CREATE TABLE workout_exercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    workout_id INT NOT NULL,
    exercise_id INT NOT NULL,
    set_number TINYINT UNSIGNED NOT NULL,
    reps SMALLINT UNSIGNED NOT NULL,
    weight_kg DECIMAL(6,2) NOT NULL DEFAULT 0,

    CONSTRAINT fk_we_workouts
        FOREIGN KEY (workout_id)
        REFERENCES workouts(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_we_exercises
        FOREIGN KEY (exercise_id)
        REFERENCES exercises(id),

    UNIQUE (workout_id, exercise_id, set_number),

    CHECK (set_number > 0),
    CHECK (reps > 0),
    CHECK (weight_kg >= 0)
);


-- 7. CELE UŻYTKOWNIKÓW
CREATE TABLE goals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    target_value DECIMAL(10,2),
    current_value DECIMAL(10,2) NOT NULL DEFAULT 0,
    unit VARCHAR(20),
    deadline DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at DATETIME NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_goals_users
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CHECK (
        status IN ('active', 'completed', 'cancelled')
    )
);