#include <sstream>
#include <map>
#include <iostream>
#include <cstring>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <thread>  // <--- Make sure to include this for std::thread

class RecommendationSystem {
private:
    std::map<int, std::vector<int>> userWatchedVideos; // User -> List of watched videos

public:
    // Update the watch history for a user and a video
    void updateWatchHistory(int userId, int videoId) {
        userWatchedVideos[userId].push_back(videoId);
    }

    // Get recommended videos for a user
    std::vector<int> getRecommendations(int userId) {
        std::vector<int> recommendations;
        std::set<int> recommendedSet; // To avoid duplicates

        // Find videos that similar users have watched
        for (int watchedVideo : userWatchedVideos[userId]) {
            for (const auto& [otherUserId, videos] : userWatchedVideos) {
                if (otherUserId != userId) {
                    for (int otherVideo : videos) {
                        // Only recommend videos the user hasn't watched yet
                        if (std::find(userWatchedVideos[userId].begin(), userWatchedVideos[userId].end(), otherVideo) == userWatchedVideos[userId].end()) {
                            if (recommendedSet.find(otherVideo) == recommendedSet.end()) {
                                recommendations.push_back(otherVideo);
                                recommendedSet.insert(otherVideo);
                            }
                        }
                    }
                }
            }
        }        

        return recommendations;
    }
};

// Modify the handleClient function to handle user ID and video ID
void handleClient(int client_sock, RecommendationSystem& recSystem) {
    char buffer[4096];
    ssize_t bytes_received;

    while ((bytes_received = recv(client_sock, buffer, sizeof(buffer), 0)) > 0) {
        buffer[bytes_received] = '\0'; // Null-terminate the received data
        std::istringstream iss(buffer);
        std::string command;
        int userId, videoId;

        iss >> command >> userId >> videoId;

        if (command == "watch") {
            recSystem.updateWatchHistory(userId, videoId);
        } else if (command == "recommend") {
            std::vector<int> recommendations = recSystem.getRecommendations(userId);
            std::ostringstream oss;
            oss << "Recommended videos: ";
            for (int rec : recommendations) {
                oss << rec << " ";
            }
            std::string response = oss.str();
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
