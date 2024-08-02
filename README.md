# YouTube Project

## Project Overview
This project is a YouTube-like application that consists of a frontend and a backend. The backend is built with Node.js, Express, and MongoDB, while the frontend is built with React.

## Project Structure
- `AP_Ex_1_web-main`: This folder contains the frontend code.
- `server`: This folder contains the backend code, including the server, models and routes.

## Prerequisites
- Node.js
- MongoDB

## Setup Instructions

1. **Start the MongoDB server locally**:
    ```bash
    mongod
    ```

2. **Import collections into MongoDB**:

   Ensure your MongoDB server is running.
   Import each JSON file in the MongoDB folder into your local MongoDB instance. You can use the mongoimport command for this:
   mongoimport --db youtube --collection users --file MongoDB/users.json --jsonArray
   mongoimport --db youtube --collection videos --file MongoDB/videos.json --jsonArray
   mongoimport --db youtube --collection comments --file MongoDB/comments.json --jsonArray


### Backend Setup

1. **Navigate to the server directory**:
    cd server (YouTubeProjectWeb\server)

2. **Start the backend server**:
    node server.js

    The server will start on the port specified in the `.env` file or default to port 5000.

### Frontend Setup

1. **Navigate to the frontend directory**:

    cd ../AP_Ex_1_web-main (YouTubeProjectWeb\AP_Ex_1_web-main)


2. **Install dependencies**:
    npm install
    

3. **Start the frontend**:
    npm start
    

    The frontend will start on the default port 3000.

