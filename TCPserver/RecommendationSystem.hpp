#ifndef RECOMMENDATIONSYSTEM_HPP
#define RECOMMENDATIONSYSTEM_HPP

#include <vector>
#include <map>
#include <set>
#include <string>
#include <algorithm>

class RecommendationSystem {
private:
    std::map<std::string, std::vector<std::string>> userWatchedVideos; // User -> List of watched videos

public:
    // Update the watch history for a user and a video
    void updateWatchHistory(const std::string& userId, const std::string& videoId);

    // Get recommended videos for a user
    std::vector<std::string> getRecommendations(const std::string& userId);
};

#endif // RECOMMENDATIONSYSTEM_HPP
