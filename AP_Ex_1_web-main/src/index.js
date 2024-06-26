import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client for React 18
import App from './app/App'; // Import the main App component
import './index.css'; // Import global CSS styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling

// Create the root element for rendering the app
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Render the App component
root.render(<App />);
