// src/pages/NotFound.jsx
import React from "react";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "4rem" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/" style={{ color: "blue", textDecoration: "underline" }}>Go to Home</a>
    </div>
  );
};

export default NotFound;
