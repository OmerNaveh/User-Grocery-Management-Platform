## LetsTok Web Application

Welcome, this repo is for a web application built with React and Node.js, designed to facilitate user and product management.

### Tech Stack

#### Frontend

- **React**: A JavaScript library for building user interfaces.
- **React Router**: A library for routing in React applications.
- **React Query**: A data-fetching library for React applications.
- **Tailwind CSS**: A utility-first CSS framework for styling the application.
- **Axios**: A promise-based HTTP client for making API requests.

#### Backend

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **TypeORM**: An Object-Relational Mapping (ORM) library for TypeScript and JavaScript.
- **PostgreSQL**: A relational database management system used for storing data.

### Features

1. **User Management**: Users can sign up, log in, and log out of the application, edit user details.
2. **Product Management**: Users can search, add, edit, and delete products.
3. **Cart Management**: Users can add products to the cart, edit the quantity of products in the cart, and remove products from the cart.

### How to use

1. **Sign Up**: Click on the `Sign Up` button to create a new account.
2. **User Management**: Click on the any user's Pen Button to edit the user details.
3. **User Cart Management**: Click on the any user's name to view his cart, add, remove or update any items and checkout.
4. **Navigating around**: Click on the user Avatarto navigate to the Product dashboard.
5. **Product Management**: Click on the any product's Pen Button to edit the product details.

### How to Run

#### With Docker

1. Make sure Docker is installed on your system.
2. Clone the repository:
   ```bash
   git clone https://github.com/OmerNaveh/User-Grocery-Management-Platform.git
   ```
3. Change into the project directory:
   ```bash
   cd User-Grocery-Management-Platform
   ```
4. Create a `.env` file in the main directory and add the following environment variables:
   ```env
   POSTGRES_USER=Your postgres user name || postgres
    POSTGRES_PASSWORD=Your postgres user name || root
    POSTGRES_DB=Your postgres DB || LetsTok
    POSTGRES_PORT=Your postgres port || 5431
    PORT=3001
   ```
5. Run the following command to start the application:
   ```bash
   docker-compose up --detach --build
   ```
6. The application will be available at `http://localhost:3000`.

#### Without Docker

1. Clone the repository:
   ````bash
   git clone
   ```bash
   git clone https://github.com/OmerNaveh/User-Grocery-Management-Platform.git
   ````
2. Change into the project directory:
   ```bash
    cd User-Grocery-Management-Platform
   ```
3. Change into the `backend` directory:
   ```bash
   cd backend
   ```
4. Create a `.env` file and add the following environment variables:
   ```env
   POSTGRES_USER=Your postgres user name || postgres
   POSTGRES_PASSWORD=Your postgres user name || root
   POSTGRES_DB=Your postgres DB || LetsTok
   POSTGRES_PORT=Your postgres port || 5431
   PORT=3001
   ```
5. Install the dependencies:
   ```bash
   npm install
   ```
6. Run the following command to start the backend server:
   ```bash
   npm run start
   ```
7. Open a new terminal and change into the project directory:
   ```bash
   cd ../
   ```
8. Change into the `frontend` directory:
   ```bash
   cd frontend
   ```
9. Install the dependencies:
   ```bash
   npm install
   ```
10. Run the following command to start the frontend server:
    ```bash
    npm start
    ```
11. The application will be available at `http://localhost:3000`.

### License

All rights reserved to Omer Naveh
