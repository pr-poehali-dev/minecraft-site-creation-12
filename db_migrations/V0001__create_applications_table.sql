CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    email VARCHAR(255) NOT NULL,
    discord VARCHAR(255),
    experience TEXT NOT NULL,
    why_join TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);