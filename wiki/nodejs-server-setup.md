Node.js Server Setup:

1. Navigate to the server directory inside the YouTubeProjectWeb folder:
cd YouTubeProjectWeb/server

2. Install the required Node.js dependencies:
npm install

3. Make sure your MongoDB service is running. 

Seed the MongoDB database with initial data if needed:
# Importing collections
mongoimport --db youtube --collection users --file ./MongoDB/users.json
mongoimport --db youtube --collection videos --file ./MongoDB/videos.json
(In addition there is a folder MongoDB which have the collections about users, videos and comments)

4. Start the Node.js server:
node server.js
The server should now be running on http://localhost:3000.


