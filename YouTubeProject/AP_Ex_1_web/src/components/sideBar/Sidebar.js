import React from 'react';
import './Sidebar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

function Sidebar() {
  return (
    <div className="sidebar">
      <button className="sidebar-button">
        <i className="bi bi-house-door icon"></i> {/* Bootstrap icon */}
        Home
      </button>
      <button className="sidebar-button">
        <i className="bi bi-collection-play icon"></i> {/* Bootstrap icon */}
        Shorts
      </button>
      <button className="sidebar-button">
        <i className="bi bi-collection icon"></i> {/* Bootstrap icon */}
        Subscriptions
      </button>
      <hr />
      <button className="sidebar-button">
        <i className="bi bi-music-note-list icon"></i> {/* Bootstrap icon */}
        Playlists
      </button>
      <button className="sidebar-button">
        <i className="bi bi-camera-video icon"></i> {/* Bootstrap icon */}
        Your videos
      </button>
      <button className="sidebar-button">
        <i className="bi bi-clock-history icon"></i> {/* Bootstrap icon */}
        Watch later
      </button>
      <button className="sidebar-button">
        <i className="bi bi-hand-thumbs-up icon"></i> {/* Bootstrap icon */}
        Liked videos
      </button>
      <hr />
      <div className="sidebar-section">
        <h5>Explore</h5>
        <button className="sidebar-button">
          <i className="bi bi-lightning icon"></i> {/* Bootstrap icon */}
          Trending
        </button>
        <button className="sidebar-button">
          <i className="bi bi-music-note-beamed icon"></i> {/* Bootstrap icon */}
          Music
        </button>
        <button className="sidebar-button">
          <i className="bi bi-controller icon"></i> {/* Bootstrap icon */}
          Gaming
        </button>
        <button className="sidebar-button">
          <i className="bi bi-newspaper icon"></i> {/* Bootstrap icon */}
          News
        </button>
        <button className="sidebar-button">
          <i className="bi bi-trophy icon"></i> {/* Bootstrap icon */}
          Sports
        </button>
        <button className="sidebar-button">
          <i className="bi bi-mic icon"></i> {/* Bootstrap icon */}
          Podcasts
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
