# YouTube Project

## Project Overview
This project is a YouTube-like application that consists of a frontend and a backend. The backend is built with Node.js, Express, and MongoDB, while the frontend is built with React.

## Project Structure
- `AP_Ex_1_web-main`: This folder contains the frontend code.
- `server`: This folder contains the backend code, including the server, models, routes, and database seeding script.

## Prerequisites
- Node.js
- MongoDB

## Setup Instructions

### Backend Setup

1. **Navigate to the server directory**:
    ```bash
    cd server
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the MongoDB server locally**:
    ```bash
    mongod
    ```

4. **Seed the database with default data**:
    ```bash
    npm run seed
    ```

5. **Start the backend server**:
    ```bash
    node server.js
    ```

    The server will start on the port specified in the `.env` file or default to port 5000.

### Frontend Setup

1. **Navigate to the frontend directory**:
    ```bash
    cd ../AP_Ex_1_web-main
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the frontend**:
    ```bash
    npm start
    ```

    The frontend will start on the default port 3000.

## Environment Variables
Create a `.env` file in the `server` directory with the following variables:
```plaintext
PORT=5000
MONGO_URI=mongodb://localhost:27017/yourdb
SEED_DB=true
