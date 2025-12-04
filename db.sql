-- Database initialization script
-- Note: Create the database manually if it doesn't exist, or use a setup script.
-- CREATE DATABASE qa_task_tracker;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('QA', 'DEV')),
    avatar TEXT
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project Members Table (Many-to-Many)
CREATE TABLE IF NOT EXISTS project_members (
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, user_id)
);

-- QA Tasks Table
CREATE TABLE IF NOT EXISTS qa_tasks (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    scenario VARCHAR(255),
    category VARCHAR(255),
    test_case TEXT,
    test_steps TEXT,
    data TEXT,
    expected_result TEXT,
    actual_result TEXT,
    kategori VARCHAR(255),
    status VARCHAR(50) CHECK (status IN ('PASS', 'FAIL', 'PENDING')),
    catatan_from_qa TEXT,
    respon_from_programmer TEXT,
    status_perbaikan_from_programmer VARCHAR(50),
    status_selesai_from_qa VARCHAR(50),
    assigned_qa_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    assigned_dev_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Repair Loops Table
CREATE TABLE IF NOT EXISTS repair_loops (
    id SERIAL PRIMARY KEY,
    task_id INTEGER REFERENCES qa_tasks(id) ON DELETE CASCADE,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),
    notes TEXT
);
