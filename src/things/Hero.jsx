import { useState, useRef, useEffect, useCallback } from "react";
import "../styles/Hero.css";
import { FaAngleDoubleDown } from "react-icons/fa";
import { motion } from "framer-motion";

function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [pulled, setPulled] = useState(false);

  // Rope refs
  const ballGroupRef = useRef(null);
  const ropeMainRef = useRef(null);
  const ropeDetailRef = useRef(null);
  const ropeShadowRef = useRef(null);
  const ballGlowRef = useRef(null);
  const ballMainRef = useRef(null);

  // Physics
  const BALL_REST_Y = 200;
  const TRIGGER_THRESHOLD = 140;
  const SPRING_STIFFNESS = 120;
  const SPRING_DAMPING = 8;
  const SPRING_MASS = 0.8;

  const dragging = useRef(false);
  const dragStartY = useRef(0);
  const stretch = useRef(0);
  const velocity = useRef(0);
  const animFrame = useRef(null);
  const lastTime = useRef(null);
  const isPulled = useRef(false);

  const getClientY = (e) => (e.touches ? e.touches[0].clientY : e.clientY);

  // Update rope visual
  const updateRope = useCallback((s) => {
    if (!ballGroupRef.current) return;

    const ballY = BALL_REST_Y + s;
    const t = Math.min(s / 250, 1);
    
    const strokeW = Math.max(5 - t * 4, 0.6);
    const detailW = Math.max(2.5 - t * 2, 0.3);

    const swingX = 90 + Math.sin(t * Math.PI * 0.7) * 55;
    const controlY = BALL_REST_Y + s * 0.5;
    const path = `M90 0 Q${swingX} ${controlY} 90 ${ballY}`;

    if (ropeMainRef.current) {
      ropeMainRef.current.setAttribute("d", path);
      ropeMainRef.current.setAttribute("stroke-width", strokeW.toFixed(2));
    }
    if (ropeDetailRef.current) {
      ropeDetailRef.current.setAttribute("d", path);
      ropeDetailRef.current.setAttribute("stroke-width", detailW.toFixed(2));
    }
    if (ropeShadowRef.current) {
      ropeShadowRef.current.setAttribute("d", `M93 3 Q${swingX + 3} ${controlY + 3} 93 ${ballY + 3}`);
    }

    ballGroupRef.current.setAttribute("transform", `translate(90, ${ballY})`);

    if (ballMainRef.current) {
      const squishX = s > 0 ? Math.max(1 - t * 0.4, 0.5) : 1;
      const squishY = s > 0 ? Math.min(1 + t * 0.5, 1.6) : 1;
      ballMainRef.current.setAttribute("transform", `scale(${squishX}, ${squishY})`);
    }

    if (ballGlowRef.current) {
      ballGlowRef.current.setAttribute("r", (20 + s * 0.08).toFixed(1));
      ballGlowRef.current.setAttribute("opacity", (0.3 + t * 0.6).toFixed(2));
    }
  }, []);

  // Spring physics
  const runSpring = useCallback((timestamp) => {
    if (lastTime.current === null) lastTime.current = timestamp;
    const dt = Math.min((timestamp - lastTime.current) / 1000, 0.05);
    lastTime.current = timestamp;

    const k = SPRING_STIFFNESS;
    const d = SPRING_DAMPING;
    const m = SPRING_MASS;

    const force = -k * stretch.current - d * velocity.current;
    velocity.current += (force / m) * dt;
    stretch.current += velocity.current * dt;

    const s = Math.max(stretch.current, 0);
    updateRope(s);

    if (Math.abs(s) < 0.5 && Math.abs(velocity.current) < 0.3) {
      stretch.current = 0;
      velocity.current = 0;
      updateRope(0);
      lastTime.current = null;
      if (animFrame.current) {
        cancelAnimationFrame(animFrame.current);
        animFrame.current = null;
      }
      return;
    }

    animFrame.current = requestAnimationFrame(runSpring);
  }, [updateRope]);

  // Release rope
  const releaseRope = useCallback(() => {
    if (animFrame.current) cancelAnimationFrame(animFrame.current);
    lastTime.current = null;
    velocity.current = -stretch.current * 8;
    animFrame.current = requestAnimationFrame(runSpring);
  }, [runSpring]);

  // Trigger download
  const triggerDownload = useCallback(() => {
    if (isPulled.current) return;
    isPulled.current = true;
    setPulled(true);

    const link = document.createElement("a");
    link.href = "/RESUME.pdf";
    link.download = "RESUME.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      releaseRope();
    }, 150);

    setTimeout(() => {
      isPulled.current = false;
    }, 1500);
  }, [releaseRope]);

  const onPointerDown = useCallback((e) => {
    if (isPulled.current) return;
    if (animFrame.current) cancelAnimationFrame(animFrame.current);
    dragging.current = true;
    dragStartY.current = getClientY(e) - stretch.current;
    e.preventDefault();
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!dragging.current || isPulled.current) return;
    const dy = getClientY(e) - dragStartY.current;
    const raw = Math.max(dy, 0);
    
    const softCap = 160;
    if (raw <= softCap) {
      stretch.current = raw;
    } else {
      stretch.current = softCap + (raw - softCap) * 0.4;
    }
    updateRope(stretch.current);
    e.preventDefault();
  }, [updateRope]);

  const onPointerUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    
    if (stretch.current >= TRIGGER_THRESHOLD) {
      triggerDownload();
    } else {
      releaseRope();
    }
  }, [triggerDownload, releaseRope]);

  // Event listeners
  useEffect(() => {
    const ball = ballGroupRef.current;
    if (!ball) return;

    ball.addEventListener("mousedown", onPointerDown);
    ball.addEventListener("touchstart", onPointerDown, { passive: false });
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("touchmove", onPointerMove, { passive: false });
    window.addEventListener("mouseup", onPointerUp);
    window.addEventListener("touchend", onPointerUp);

    return () => {
      ball.removeEventListener("mousedown", onPointerDown);
      ball.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchend", onPointerUp);
    };
  }, [onPointerDown, onPointerMove, onPointerUp]);

  // Idle glow pulse
  useEffect(() => {
    let t = 0;
    const pulse = () => {
      if (!dragging.current && !isPulled.current && ballGlowRef.current) {
        t += 0.04;
        ballGlowRef.current.setAttribute("r", (19 + Math.sin(t) * 4).toFixed(1));
        ballGlowRef.current.setAttribute("opacity", (0.25 + Math.sin(t) * 0.12).toFixed(2));
      }
      requestAnimationFrame(pulse);
    };
    const rafId = requestAnimationFrame(pulse);
    return () => cancelAnimationFrame(rafId);
  }, []);

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
      <div className="resume-pull-container">
        <div className={`resume-message ${pulled ? "pulled" : ""}`}>
          {pulled ? "✓ Resume Downloaded!" : "Pull the rope for Resume"}
        </div>

        <svg className="rope-svg" width="180" height="380" style={{ overflow: "visible" }}>
          <path ref={ropeShadowRef} d="M93 3 Q93 103 93 203" stroke="rgba(0,0,0,0.15)" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path ref={ropeMainRef} d="M90 0 Q90 100 90 200" stroke="#8B4513" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path ref={ropeDetailRef} d="M90 0 Q90 100 90 200" stroke="#D2691E" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="10 5" opacity="0.5" />
          <circle cx="90" cy="0" r="6" fill="#654321" />
          <line x1="65" y1="0" x2="115" y2="0" stroke="#654321" strokeWidth="4" strokeLinecap="round" />

          <g ref={ballGroupRef} transform="translate(90, 200)" style={{ cursor: pulled ? "default" : "grab" }}>
            <circle ref={ballGlowRef} r="20" fill="none" stroke="#c0392b" strokeWidth="2" opacity="0.3" />
            <circle ref={ballMainRef} r="18" fill="#c0392b" />
            <circle r="8" cx="-5" cy="-5" fill="rgba(255,255,255,0.15)" />
            <text y="5" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.9)" style={{ userSelect: "none", pointerEvents: "none" }}>
              {pulled ? "✓" : "↓"}
            </text>
          </g>
        </svg>
      </div>

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