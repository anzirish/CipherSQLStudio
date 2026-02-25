import { Assignment } from '../models/Assignment.js';

const sampleAssignments = [
  {
    title: 'Basic SELECT Query',
    difficulty: 'Easy',
    description: 'Learn to retrieve data from a single table',
    question: 'Write a query to select all students from the students table.',
    sampleDataTables: ['students'],
    expectedSchema: {
      students: {
        id: 'integer',
        name: 'varchar',
        email: 'varchar',
        age: 'integer',
      },
    },
  },
  {
    title: 'Join Two Tables',
    difficulty: 'Medium',
    description: 'Practice joining related tables',
    question: 'Write a query to show all students and their enrolled courses. Include student name and course name.',
    sampleDataTables: ['students', 'enrollments', 'courses'],
    expectedSchema: {
      students: { id: 'integer', name: 'varchar' },
      courses: { id: 'integer', name: 'varchar' },
      enrollments: { student_id: 'integer', course_id: 'integer' },
    },
  },
  {
    title: 'Aggregate Functions',
    difficulty: 'Hard',
    description: 'Use GROUP BY and aggregate functions',
    question: 'Write a query to find the average grade for each course, showing only courses with an average grade above 75.',
    sampleDataTables: ['courses', 'enrollments', 'grades'],
    expectedSchema: {
      courses: { id: 'integer', name: 'varchar' },
      grades: { enrollment_id: 'integer', grade: 'numeric' },
    },
  },
];

export const feedDatabase = async () => {
  try {
    // Check if assignments already exist
    const count = await Assignment.countDocuments();
    if (count > 0) {
      return;
    }

    // Insert sample assignments
    await Assignment.insertMany(sampleAssignments);
    console.log('Sample assignments inserted');

  } catch (error) {
    console.error('Feed data error:', error);
  }
};
