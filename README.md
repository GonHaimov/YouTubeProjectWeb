# YouTube Project

## Project Overview
This project is a YouTube-like application that allows users to upload and watch videos, write comments, and interact with other users. It includes a frontend built with React and a backend developed using Node.js, Express, and MongoDB.

Key features include:

User authentication (registration and login).
Uploading videos and storing them in the server.
Browsing and watching videos.
Writing, editing, and deleting comments.
A recommendation system for videos based on viewing history.
## Project Structure
- `AP_Ex_1_web-main`: This folder contains the frontend code.
- `server`: This folder contains the backend code, including the server, models and routes.

## Prerequisites
- Node.js
- MongoDB

## MongoDB Setup
Open your MongoDB GUI or terminal:
1. **Create a New Database**:

Click on the plus icon near "Databases" to add a new database.
Database Name: youtube
Collection Name: videos

2. **Add Collections**:

After creating the videos collection, add two more collections:
comments
users

3. **Import JSON Data**:

For each collection, click on Add Data -> Import JSON.
Import the corresponding JSON files from YouTubeProjectWeb\MongoDB:
videos.json for the videos collection.
comments.json for the comments collection.
users.json for the users collection.

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

