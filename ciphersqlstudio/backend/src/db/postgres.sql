-- Sample PostgreSQL setup script to create sample tables and data

-- Students table
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INTEGER
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    credits INTEGER
);

-- Enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id),
    course_id INTEGER REFERENCES courses(id),
    enrollment_date DATE DEFAULT CURRENT_DATE
);

-- Grades table
CREATE TABLE IF NOT EXISTS grades (
    id SERIAL PRIMARY KEY,
    enrollment_id INTEGER REFERENCES enrollments(id),
    grade NUMERIC(5,2)
);

-- Insert sample data with Lord of thee Rings characters
INSERT INTO students (name, email, age) VALUES
    ('Frodo Baggins', 'frodo@shire.com', 33),
    ('Aragorn Elessar', 'aragorn@gondor.com', 87),
    ('Gandalf Grey', 'gandalf@istari.com', 2019),
    ('Legolas Greenleaf', 'legolas@mirkwood.com', 2931),
    ('Gimli Gloin', 'gimli@erebor.com', 139),
    ('Samwise Gamgee', 'sam@shire.com', 38),
    ('Arwen Undomiel', 'arwen@rivendell.com', 2778),
    ('Boromir Denethor', 'boromir@gondor.com', 41);

INSERT INTO courses (name, credits) VALUES
    ('Sword Fighting', 3),
    ('Ancient Languages', 4),
    ('Archery Mastery', 3),
    ('Ring Lore', 4),
    ('Healing Arts', 3);

INSERT INTO enrollments (student_id, course_id) VALUES
    (1, 1), (1, 4),
    (2, 1), (2, 3),
    (3, 2), (3, 4),
    (4, 3), (4, 2),
    (5, 1), (5, 3),
    (6, 1), (6, 5),
    (7, 2), (7, 5),
    (8, 1), (8, 4);

INSERT INTO grades (enrollment_id, grade) VALUES
    (1, 95.0), (2, 88.5),
    (3, 98.0), (4, 92.0),
    (5, 100.0), (6, 97.5),
    (7, 99.0), (8, 94.0),
    (9, 87.5), (10, 91.0),
    (11, 93.0), (12, 89.5),
    (13, 96.0), (14, 90.0),
    (15, 94.5), (16, 86.0);
