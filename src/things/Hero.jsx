import { useState, useRef, useEffect, useCallback } from "react";
import "../styles/Hero.css";
import { FaAngleDoubleDown } from "react-icons/fa";
import { motion } from "framer-motion";

function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [pulled, setPulled] = useState(false);


  // Set loaded after mount
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero-section">

      {/* PARTICLES BG */}
      <div className="particles-bg">
        {[...Array(100)].map((_, i) => (
          <span 
            key={i} 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      {/* ROPE & BALL */}
     

      {/* PIRATE BOTTOM */}
      <div className="pirate-bottom">
        <div className="wave-line w1" />
        <div className="wave-line w2" />
        <div className="wave-line w3" />
        <div className="anchor-symbol">⚓</div>
        <div className="ship-wheel">⚓</div>
      </div>

      {/* MAIN CONTENT */}
      <motion.div 
        className="hero-content" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: loaded ? 1 : 0 }} 
        transition={{ duration: 1.2 }}
      >
        <p className="greeting">Hey,</p>
        <h1 className="hero-name">I'm Teja Vendra</h1>
        <p className="hero-bio">Web & GenAI Developer</p>
        <p className="hero-tagline">Focused on building modern full-stack applications and integrating advanced AI solutions.</p>
      </motion.div>

      <a href="#About" className="scroll-down">
        <FaAngleDoubleDown />
      </a>
    </section>
  );
}

export default Hero;