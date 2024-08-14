// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'; // Import the App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Mount the React app to the div with id 'root'
);
