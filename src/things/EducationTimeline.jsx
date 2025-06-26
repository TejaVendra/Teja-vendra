// src/components/EducationTimeline.jsx

import { educationData } from "../Data/educationData";
import '../styles/Education.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";


const EducationTimeline = () => {
  return (
    <div className="timeline-container">
      {educationData.map((item, index) => (
        <div
          className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
          key={index}
        >
          <div className="timeline-icon">
            <FontAwesomeIcon icon={faGraduationCap} />
          </div>
          <div className="content">
            <p className="date">{item.date}</p>
            <h3 className="title">{item.title}</h3>
            <h4 className="subtitle">{item.subtitle}</h4>
            <p className="description">{item.description}</p>
          </div>
        </div>
      ))}
      <div className="timeline-line"></div>
    </div>
  );
};

export default EducationTimeline;
