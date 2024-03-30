---

# User Authentication System with Neo4j and Express

This is a basic user authentication system built using Node.js with the Express framework, Neo4j as the database, and bcrypt for password hashing. This system allows users to register, log in, and validate their credentials against the stored data in the Neo4j database.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js
- Neo4j database
- npm (Node Package Manager)

## Installation

1. Clone or download the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install dependencies using npm:

   ```
   npm install
   ```

4. Set up Neo4j database:
   - Make sure Neo4j is installed and running on your machine.
   - Update the Neo4j URI, username, and password in the `app.js` file to match your Neo4j configuration:

     ```javascript
     const neo4jUri = 'bolt://127.0.0.1:7687';
     const neo4jUser = 'neo4j';
     const neo4jPassword = '12345678';
     ```

5. Run the application:

   ```
   node app.js
   ```

## Usage

Once the application is running, you can access it in your web browser by navigating to `http://localhost:3000`.

- `/register`: Register a new user by providing a username, email, and password.
- `/login`: Login with an existing username and password.

## Folder Structure

- `public`: Contains static files (e.g., CSS, client-side JavaScript).
- `app.js`: Main application file where routes, middleware, and server setup are defined.
- `package.json`: Contains metadata and dependencies information.

## Dependencies

- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **body-parser**: Parse incoming request bodies in a middleware before handlers.
- **bcrypt**: Library to help hash passwords.
- **neo4j-driver**: Official Neo4j Driver for JavaScript.
- **path**: Provides utilities for working with file and directory paths.

## Contributing

Contributions are welcome! Feel free to fork the repository, make changes, and submit pull requests.

## Additional Notes

- Ensure to keep your Neo4j database secure by following best practices for authentication and authorization.
- For production use, consider adding additional security measures such as input validation and session management.

Feel free to customize and extend this application according to your needs! If you have any questions or need further assistance, don't hesitate to reach out.

---
