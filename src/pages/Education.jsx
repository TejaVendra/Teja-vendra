import React, { useState, useEffect, useRef } from 'react';
import './Education.css';

const educationStages = [
  {
    id: 0,
    title: "Secondary School Certificate (SSC)",
    year: "2021 – 2022",
    details: "Completed my Secondary School Certificate (SSC) at T.M.Z.P High School with a strong academic foundation across subjects including Mathematics, Science, and Social Studies.",
    coords: { x: 20, y: 82 }
  },
  {
    id: 1,
    title: "Intermediate",
    year: "2022 – 2024",
    details: "Focused on core subjects including Mathematics, Physics, and Chemistry with strong academic performance.",
    coords: { x: 80, y: 58 }
  },
  {
    id: 2,
    title: "B.Tech",
    year: "2024 – Present",
    details: "Pursuing a Bachelor of Technology in Computer Science with a specialization in Artificial Intelligence and Machine Learning",
    coords: { x: 30, y: 35 }
  },
  {
    id: 3,
    title: "Treasure",  // Changed back - black with red X
    year: "Present",
    details: "",
    coords: { x: 50, y: 12 }
  }
];

// Hand-drawn Mountain SVG
const MountainDrawing = () => (
  <svg viewBox="0 0 100 60" className="hand-drawn-mountain">
    <path d="M0 60 L20 30 L35 45 L50 15 L65 40 L80 25 L100 60 Z" 
          fill="none" stroke="#5d4037" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M15 60 L25 40" stroke="#5d4037" strokeWidth="1"/>
    <path d="M70 60 L82 35" stroke="#5d4037" strokeWidth="1"/>
  </svg>
);

// Small Island SVG
const SmallIsland = ({ x, y }) => (
  <svg viewBox="0 0 40 25" className="small-island" style={{ left: x, top: y }}>
    <ellipse cx="20" cy="20" rx="18" ry="5" fill="none" stroke="#8d6e63" strokeWidth="1"/>
    <path d="M10 20 Q20 5 30 20" fill="none" stroke="#8d6e63" strokeWidth="1"/>
    <text x="20" y="22" fontSize="8" fill="#5d4037" textAnchor="middle">☠</text>
  </svg>
);

// Red X Mark for Dream Job
const RedXMark = () => (
  <svg viewBox="0 0 20 20" width="14" height="14" className="red-x-mark">
    <line x1="3" y1="3" x2="17" y2="17" stroke="#c0392b" strokeWidth="3" strokeLinecap="round"/>
    <line x1="17" y1="3" x2="3" y2="17" stroke="#c0392b" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

// Anchor Drawing for other points
const AnchorDrawing = () => (
  <svg viewBox="0 0 16 20" width="12" height="14" className="anchor-drawing">
    <circle cx="8" cy="5" r="3" fill="none" stroke="#2c1810" strokeWidth="1.5"/>
    <line x1="8" y1="8" x2="8" y2="16" stroke="#2c1810" strokeWidth="1.5"/>
    <line x1="4" y1="11" x2="12" y2="11" stroke="#2c1810" strokeWidth="1.5"/>
    <path d="M5 16 Q8 20 11 16" fill="none" stroke="#2c1810" strokeWidth="1.5"/>
  </svg>
);

// NPC Ship SVG
const NpcShipGraphic = ({ color = "#5d4037" }) => (
  <svg viewBox="0 0 50 40" className="npc-ship-graphic">
    <path d="M5 25 Q5 40 25 40 Q45 40 45 25 L45 20 L5 20 Z" fill={color} stroke="#2c1810" strokeWidth="1"/>
    <rect x="23" y="5" width="3" height="20" fill="#4e342e" stroke="#2c1810" strokeWidth="0.5"/>
    <path d="M8 8 L8 22 Q18 22 18 12 Q18 8 8 8 Z" fill="#f5f5f5" stroke="#9e9e9e" strokeWidth="0.5"/>
    <path d="M42 8 L42 22 Q32 22 32 12 Q32 8 42 8 Z" fill="#f5f5f5" stroke="#9e9e9e" strokeWidth="0.5"/>
    <path d="M26 2 L26 6 L32 6 L26 2 Z" fill="#c0392b" stroke="#2c1810" strokeWidth="0.5"/>
  </svg>
);

const Education = () => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [hoveredStage, setHoveredStage] = useState(null);
  const [shipPosition, setShipPosition] = useState(educationStages[2].coords);
  const [compassRotation, setCompassRotation] = useState(0);
  const pathRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCompassRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Handle ship movement to a location along the path
  const handleMoveToStage = (index) => {
    setCurrentStageIdx(index);
    
    // Animate ship along the path
    if (pathRef.current && index > 0) {
      const path = pathRef.current;
      const targetStage = educationStages[index];
      
      // Simple animation - move through path waypoints
      let startPos = { ...shipPosition };
      const endPos = targetStage.coords;
      const steps = 20;
      let currentStep = 0;
      
      const animate = () => {
        currentStep++;
        const progress = currentStep / steps;
        
        // Interpolate position along the path (simplified)
        const newX = startPos.x + (endPos.x - startPos.x) * progress;
        const newY = startPos.y + (endPos.y - startPos.y) * progress;
        
        setShipPosition({ x: newX, y: newY });
        
        if (currentStep < steps) {
          requestAnimationFrame(animate);
        } else {
          startPos = endPos;
        }
      };
      
      requestAnimationFrame(animate);
    } else {
      setShipPosition(educationStages[index].coords);
    }
  };

  return (
    <div className="pirate-map-container">
      <div className="map-paper">
        
        <h1 className="map-title">🏴‍☠️ EDUCATION JOURNEY</h1>

        {/* Compass */}
        <div className="compass-rose">
          <div className="compass-inner" style={{ transform: `rotate(${compassRotation}deg)` }}>
            <span className="compass-n">N</span>
            <div className="compass-needle-n"></div>
            <div className="compass-needle-s"></div>
          </div>
        </div>

        {/* BACKGROUND DETAILS - More elements */}
        <div className="map-details">
          {/* Hand-drawn mountains */}
          <div className="detail-mountain-1"><MountainDrawing /></div>
          <div className="detail-mountain-2"><MountainDrawing /></div>
          
          {/* Small islands */}
          <SmallIsland x="5%" y="60%" />
          <SmallIsland x="85%" y="70%" />
          <SmallIsland x="70%" y="20%" />
          
          {/* Waves decorations */}
          <div className="waves-line w-1">〰️ 〰️ 〰️ 〰️ 〰️</div>
          <div className="waves-line w-2">〰️ 〰️ 〰️</div>
          <div className="waves-line w-3">〰️ 〰️</div>
          
          {/* Decorative dots/secrets */}
          <div className="secret-dot d-1"></div>
          <div className="secret-dot d-2"></div>
          <div className="secret-dot d-3"></div>
          
          {/* Sea creatures hints */}
          <div className="sea-creature sc-1">🐙</div>
          <div className="sea-creature sc-2">🐠</div>
        </div>

        {/* THE PATH - Reference for animation */}
        <svg className="treasure-path-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path 
            ref={pathRef}
            id="mainPath"
            d="M 20 82 Q 50 82 80 58 Q 50 50 30 35 Q 20 20 50 12" 
            className="path-line"
          />
          <path 
            d="M 20 82 Q 50 82 80 58 Q 50 50 30 35 Q 20 20 50 12" 
            className="path-dots"
          />
        </svg>

        {/* Locations */}
        {educationStages.map((stage, index) => (
          <div 
            key={stage.id}
            className={`location-marker ${currentStageIdx === index ? 'active' : ''} ${hoveredStage === index ? 'hovered' : ''} ${index === 3 ? 'dream-job-marker' : ''}`}
            style={{ left: `${stage.coords.x}%`, top: `${stage.coords.y}%` }}
            onMouseEnter={() => {
              setHoveredStage(index);
              handleMoveToStage(index); // Move on hover!
            }}
            onMouseLeave={() => setHoveredStage(null)}
          >
            <div className="marker-pin">
              <div className="pin-head">
                {index === 3 ? <RedXMark /> : <AnchorDrawing />}
              </div>
              <div className="pin-point"></div>
            </div>
            
            <div className={`marker-label ${index === 3 ? 'dream-job-label' : ''}`}>
              {stage.title}
            </div>
            
            <div className="map-tooltip">
              <h3>{stage.title}</h3>
              <span className="year">{stage.year}</span>
              <p>{stage.details}</p>
            </div>
          </div>
        ))}

        {/* Player Ship */}
        <div 
          className="player-ship-wrapper"
          style={{ left: `${shipPosition.x}%`, top: `${shipPosition.y}%` }}
        >
          <div className="ship-model">
            <div className="ship-hull"></div>
            <div className="ship-mast">
              <div className="ship-sail">
                <text>🏴‍☠️</text>
              </div>
            </div>
            <div className="ship-flag">🏴‍☠️</div>
          </div>
          <div className="ship-wake"></div>
        </div>

        {/* NPC Ships */}
        <div className="npc-ship-wrapper n-1">
          <NpcShipGraphic color="#6d4c41" />
        </div>
        <div className="npc-ship-wrapper n-2">
          <NpcShipGraphic color="#455a64" />
        </div>
        <div className="npc-ship-wrapper n-3">
          <NpcShipGraphic color="#7b5544" />
        </div>

      </div>
    </div>
  );
};

export default Education;