-- certs table
CREATE TABLE certifications (
    cert_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    cert_name VARCHAR(255) NOT NULL,
    cert_link VARCHAR(255) NOT NULL,
    cert_origin VARCHAR(255) NOT NULL, --name of website or course institution cert was attained
);

-- classes table
CREATE TABLE classes (
    class_id SERIAL PRIMARY KEY,
    education_id INT REFERENCES education(education_id)
    class_name VARCHAR(255) NOT NULL,
    class_label VARCHAR(255),
    class_description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- education table
CREATE TABLE education (
    education_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES user(user_id),
    institution VARCHAR(255), --Name of place where education was received
    level_education VARCHAR(255), --e.g. bachelor's, master's, diploma, etc.
    major VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- experiences table
CREATE TABLE experiences (
    experience_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    company_name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    job_location VARCHAR(255) NOT NULL,
    job_start DATE NOT NULL,
    job_end DATE,
    employment_type VARCHAR(255),
    job_description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- skills table
CREATE TABLE skills (
    skill_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id)
    skill_name VARCHAR(255) NOT NULL,
    skill_duration VARCHAR(255), -- can list years of experience here if applicable, or if wanted
);

-- users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50),
    user_location VARCHAR(255), -- City, Country
    headline VARCHAR(255), -- Brief statement on who you are and what your goals are

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);