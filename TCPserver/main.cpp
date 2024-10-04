#include <sstream>
#include <iostream>
#include <cstring>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <thread>
#include "RecommendationSystem.hpp"  // Include the header

void handleClient(int client_sock, RecommendationSystem& recSystem) {
    char buffer[4096];
    ssize_t bytes_received;

    while ((bytes_received = recv(client_sock, buffer, sizeof(buffer), 0)) > 0) {
        buffer[bytes_received] = '\0'; // Null-terminate the received data
        std::istringstream iss(buffer);
        std::string command, userId, videoId;

        iss >> command >> userId >> videoId;
        std:: cout << command << userId << videoId << std:: endl;
        if (command == "watch") {
            recSystem.updateWatchHistory(userId, videoId);
        } else if (command == "recommend") {
            recSystem.updateWatchHistory(userId, videoId);
            std::vector<std::string> recommendations = recSystem.getRecommendations(userId);
            std::ostringstream oss;
            for (const std::string& rec : recommendations) {
                oss << rec << " ";
            }
            std::string response = oss.str();
            std:: cout << response.c_str() << std:: endl;
            send(client_sock, response.c_str(), response.size(), 0);
        }
    }

    if (bytes_received < 0) {
        perror("error receiving data");
    }

    close(client_sock);
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

    RecommendationSystem recSystem;  // Create the RecommendationSystem object

    while (true) {
        struct sockaddr_in client_sin;
        unsigned int addr_len = sizeof(client_sin);
        int client_sock = accept(sock, (struct sockaddr*)&client_sin, &addr_len);

        if (client_sock < 0) {
            perror("error accepting client");
            continue;
        }

        // Create a new thread to handle communication with the client
        std::thread client_thread(handleClient, client_sock, std::ref(recSystem));
        client_thread.detach(); // Detach the thread to run independently
    }

    close(sock);

    return 0;
}
