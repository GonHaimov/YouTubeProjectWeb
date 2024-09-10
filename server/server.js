// server.js
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');
const commentRoutes = require('./routes/commentRoutes');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const net = require('net');

dotenv.config();
connectDB();

const app = express();
app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const HOST = '192.168.245.128'; // Server IP address
const PORTTCP = 5555;        // Server port

// Create a TCP client
const client = new net.Socket();

// Connect to the server
client.connect(PORTTCP, HOST, () => {
    console.log(`Connected to server at ${HOST}:${PORTTCP}`);

    // Send a message to the server
    client.write(`Hello, server! This is a test message.`);
});

// Listen for data from the server
client.on('data', (data) => {
    console.log(`Received from server: ${data}`);

    // Close the connection after receiving the response
    client.end();
});

// Handle connection close
client.on('close', () => {
    console.log('Connection closed');
});

// Handle errors
client.on('error', (err) => {
    console.error(`Error: ${err.message}`);
});

process.on('SIGINT', () => {
    console.log('Stopping server...');
    client.end(); // Close TCP connection before exiting
    process.exit(); // Exit the server process
})

app.use('/api', userRoutes);
app.use('/api', videoRoutes);
app.use('/api', commentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

