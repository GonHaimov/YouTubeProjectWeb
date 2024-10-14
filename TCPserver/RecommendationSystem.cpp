#include "RecommendationSystem.hpp"

/// Update the watch history for a user and a video
void RecommendationSystem::updateWatchHistory(const std::string& userId, const std::string& videoId) {
    // Check if the video is already in the user's watched list
    if (std::find(userWatchedVideos[userId].begin(), userWatchedVideos[userId].end(), videoId) == userWatchedVideos[userId].end()) {
        // If the video is not already watched, add it to the list
        userWatchedVideos[userId].push_back(videoId);
    }
}


// Get recommended videos for a user
std::vector<std::string> RecommendationSystem::getRecommendations(const std::string& userId) {
    std::vector<std::string> recommendations;
    std::set<std::string> recommendedSet; // To avoid duplicates

    // Find videos that similar users have watched
    for (const std::string& watchedVideo : userWatchedVideos[userId]) {
        for (const auto& [otherUserId, videos] : userWatchedVideos) {
            if (otherUserId != userId) {
                for (const std::string& otherVideo : videos) {
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
