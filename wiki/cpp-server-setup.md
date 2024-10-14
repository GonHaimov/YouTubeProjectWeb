C++ TCP Server Setup:

1. Navigate to the TCPserver directory inside the YouTubeProjectWeb folder:
cd YouTubeProjectWeb/TCPserver

2. Compile the C++ TCP server code:
g++ -o tcpserver main.cpp -pthread

3. Run the compiled TCP server:
./tcpserver

The TCP server will now be running and waiting for incoming connections from the Node.js server or other clients.