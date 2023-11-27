const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/student');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/course-registration', { useNewUrlParser: true, useUnifiedTopology: true });

// Validation Functions
// TODO: Implement specific validation logic based on your application requirements
function isValidCourse(coursePayment) {
  // Example: Valid courses are 'Computer Science', 'Mathematics', 'Physics'
  const validCourses = ['Computer Science', 'Mathematics', 'Physics'];
  return validCourses.includes(coursePayment);
}

function isValidAge(age) {
  // Example: Age must be between 18 and 40
  return age >= 18 && age <= 40;
}

function isValidResidence(residence) {
  // Example: Valid residences are 'CityA', 'CityB', 'CityC'
  const validResidences = ['CityA', 'CityB', 'CityC'];
  return validResidences.includes(residence);
}

function hasCityAccess(cityAccessPermit) {
  // Example: City access permit is required
  return cityAccessPermit === true;
}

function isCourseAvailable(courseRegistration) {
  // Example: Valid courses are 'Computer Science', 'Mathematics', 'Physics'
  const availableCourses = ['Computer Science', 'Mathematics', 'Physics'];
  return availableCourses.includes(courseRegistration);
}

// Registration Route
app.post('/register', async (req, res) => {
  try {
    const { name, age, coursePayment, residence, cityAccessPermit, courseRegistration } = req.body;

    // Basic data validation
    if (!name || !age || !coursePayment || !residence || cityAccessPermit === undefined || !courseRegistration) {
      console.error('All fields are required for student:', name);
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // TODO: Implement additional checks based on your validation logic
    if (!isValidCourse(coursePayment)) {
      console.error('Invalid course payment for student:', name);
      return res.status(400).json({ error: 'Invalid course payment. Registration failed.' });
    }

    if (!isValidAge(age)) {
      console.error('Invalid age for student:', name);
      return res.status(400).json({ error: 'Invalid age. Registration failed.' });
    }

    if (!isValidResidence(residence)) {
      console.error('Invalid residence for student:', name);
      return res.status(400).json({ error: 'Invalid residence. Registration failed.' });
    }

    if (!hasCityAccess(cityAccessPermit)) {
      console.error('City access permit required for student:', name);
      return res.status(400).json({ error: 'City access permit required. Registration failed.' });
    }

    if (!isCourseAvailable(courseRegistration)) {
      console.error('Course registration not available for student:', name);
      return res.status(400).json({ error: 'Course registration not available. Registration failed.' });
    }

    // Create a new student
    const student = new Student({ name, age, coursePayment, residence, cityAccessPermit, courseRegistration });

    // Save the student to the database
    await student.save();

    // Provide success message
    res.status(201).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error(error);
    // Provide a generic error message
    res.status(500).json({ error: 'Internal Server Error. Registration failed.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Installation and Usage Instructions
console.log(`
# Course Registration Application

## Installation
1. Clone the repository: \`git clone <repository-url>\`
2. Navigate to the project directory: \`cd course-registration-app\`
3. Install dependencies: \`npm install\`
4. Set up MongoDB: Make sure you have MongoDB installed and running.

## Usage
1. Start the application: \`node app.js\`
2. Open your preferred API testing tool (e.g., Postman).
3. Send a POST request to \`http://localhost:3000/register\` with student details in the request body.

Example Request Body:
\`\`\`
{
  "name": "John Doe",
  "age": 25,
  "coursePayment": "paid",
  "residence": "CityA",
  "cityAccessPermit": true,
  "courseRegistration": "Computer Science"
}
\`\`\`

4. Check the console logs for success or error messages.
`);
