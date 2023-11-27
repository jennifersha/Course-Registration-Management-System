# Design Document for Course Registration Application

## Introduction

This design document outlines the architecture and key design decisions for the Course Registration Application.

## Overall Architecture

The application follows a three-tier architecture:

### Presentation Tier:

- Handled by the Express.js framework.
- Accepts HTTP requests from clients.
- Contains the registration route to handle incoming student data.

### Application Tier:

- Manages business logic and interacts with the database.
- Validates student data and processes registration.
- Uses Mongoose for MongoDB interaction.

### Data Tier:

- MongoDB is chosen as our database.
- Stores student details.

## Rationale Behind Database Choice

We chose MongoDB for the following reasons:

- **Flexibility:**
  - MongoDB's flexible schema allows us to store diverse student data without a predefined structure.

- **Scalability:**
  - MongoDB is well-suited for scalable applications, allowing us to handle a growing number of student registrations.

- **Document-Oriented:**
  - The document-oriented model aligns with the structure of our student data, making it easy to store and retrieve.

## Database Schema Description

The MongoDB schema for our Student model includes the following fields:

- **name (String):** The name of the student.
- **age (Number):** The age of the student.
- **coursePayment (String):** Enumerated values for course payment status (paid, pending, not_paid).
- **residence (String):** The student's residence.
- **cityAccessPermit (Boolean):** Indicates whether the student has a city access permit.
- **courseRegistration (String):** The course for which the student is registering.
- **registrationDate (Date):** The date and time of student registration.

### Sequence Diagram

```plaintext
Client          Server          Database
   |                |                |
   |   Registration |                |
   |--------------->|                |
   |                |                |
   |                |    Insert      |
   |                |--------------->|
   |                |                |
   |                |   Respond      |
   |                |<---------------|
   |                |                |

