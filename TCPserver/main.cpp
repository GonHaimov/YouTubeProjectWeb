#include <sstream>
#include <map>
#include <iostream>
#include <cstring>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <thread>  // <--- Make sure to include this for std::thread

void handleClient(int client_sock) {
    char buffer[4096];
    ssize_t bytes_received;

    // Receive data from the client
    while ((bytes_received = recv(client_sock, buffer, sizeof(buffer), 0)) > 0) {
        // Echo the received data back to the client
        send(client_sock, buffer, bytes_received, 0);
    }

    if (bytes_received < 0) {
        perror("error receiving data");
    }

    close(client_sock); // Close the client socket
}

int main() {
    const int server_port = 5555;
    int sock = socket(AF_INET, SOCK_STREAM, 0);

    if (sock < 0) {
        perror("error creating socket");
        return 1;
    }

    struct sockaddr_in sin;
    memset(&sin, 0, sizeof(sin));
    sin.sin_family = AF_INET;
    sin.sin_addr.s_addr = INADDR_ANY;
    sin.sin_port = htons(server_port);

    if (bind(sock, (struct sockaddr*)&sin, sizeof(sin)) < 0) {
        perror("error binding socket");
        return 1;
    }

    if (listen(sock, 5) < 0) {
        perror("error listening to a socket");
        return 1;
    }

    while (true) {
        struct sockaddr_in client_sin;
        unsigned int addr_len = sizeof(client_sin);
        int client_sock = accept(sock, (struct sockaddr*)&client_sin, &addr_len);

        if (client_sock < 0) {
            perror("error accepting client");  // Fixed typo here
            continue;
        }

        // Create a new thread to handle communication with the client
        std::thread client_thread(handleClient, client_sock);
        client_thread.detach(); // Detach the thread to run independently
    }

    close(sock);

    return 0;
}
