import { useState } from 'react';
import { Download } from 'lucide-react';
import '../styles/Things.css'

const Resume = () => {
  const [hover, setHover] = useState(false);

  return (
    <div className="resume-section">
      <a
        href="/RESUME.pdf" // Replace with actual path
        target="_blank"
        rel="noopener noreferrer"
        className="resume-link"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="resume-content">
          {hover ? (
            <Download className="resume-icon" />
          ) : (
            <span className="resume-text">VIEW MY FULL RÉSUMÉ</span>
          )}
        </div>
      </a>
    </div>
  );
};

export default Resume;
