import { useState, useRef, useEffect, useCallback } from "react";
import "../styles/Hero.css";
import { FaAngleDoubleDown } from "react-icons/fa";
import { motion } from "framer-motion";

function Hero() {
  const [showContent, setShowContent] = useState(false);
  const [showText, setShowText] = useState(false);
  const [pulled, setPulled] = useState(false);

  const videoRef = useRef(null);

  // Rope refs
  const ballGroupRef = useRef(null);
  const ropeMainRef = useRef(null);
  const ropeDetailRef = useRef(null);
  const ropeShadowRef = useRef(null);
  const ballGlowRef = useRef(null);
  const ballMainRef = useRef(null);

  // Physics - MORE FLEXIBLE for rubber band feel
  const BALL_REST_Y = 200;
  const TRIGGER_THRESHOLD = 140;
  const SPRING_STIFFNESS = 120;    // Lower = softer/more stretchy
  const SPRING_DAMPING = 8;        // Lower = more bounce
  const SPRING_MASS = 0.8;

  const dragging = useRef(false);
  const dragStartY = useRef(0);
  const stretch = useRef(0);
  const velocity = useRef(0);
  const animFrame = useRef(null);
  const lastTime = useRef(null);
  const isPulled = useRef(false);
  const wasTriggered = useRef(false);  // Track if download happened

  const getClientY = (e) => (e.touches ? e.touches[0].clientY : e.clientY);

  // Update rope visual based on stretch
  const updateRope = useCallback((s) => {
    if (!ballGroupRef.current) return;

    const ballY = BALL_REST_Y + s;
    const t = Math.min(s / 250, 1);  // Normalized stretch
    
    // Rope gets thinner as it stretches
    const strokeW = Math.max(5 - t * 4, 0.6);
    const detailW = Math.max(2.5 - t * 2, 0.3);

    // Control point swings out like real rubber
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

    // Move ball
    ballGroupRef.current.setAttribute("transform", `translate(90, ${ballY})`);

    // Ball squishes
    if (ballMainRef.current) {
      const squishX = s > 0 ? Math.max(1 - t * 0.4, 0.5) : 1;
      const squishY = s > 0 ? Math.min(1 + t * 0.5, 1.6) : 1;
      ballMainRef.current.setAttribute("transform", `scale(${squishX}, ${squishY})`);
    }

    // Glow intensifies
    if (ballGlowRef.current) {
      ballGlowRef.current.setAttribute("r", (20 + s * 0.08).toFixed(1));
      ballGlowRef.current.setAttribute("opacity", (0.3 + t * 0.6).toFixed(2));
    }
  }, []);

  // Spring physics - runs every frame
  const runSpring = useCallback((timestamp) => {
    if (lastTime.current === null) lastTime.current = timestamp;
    const dt = Math.min((timestamp - lastTime.current) / 1000, 0.05);
    lastTime.current = timestamp;

    const k = SPRING_STIFFNESS;
    const d = SPRING_DAMPING;
    const m = SPRING_MASS;

    // Spring force: F = -k*x - d*v
    const force = -k * stretch.current - d * velocity.current;
    velocity.current += (force / m) * dt;
    stretch.current += velocity.current * dt;

    // Prevent negative stretch (can't push up)
    const s = Math.max(stretch.current, 0);
    updateRope(s);

    // Stop when settled
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

  // Release rope with bounce
  const releaseRope = useCallback(() => {
    if (animFrame.current) cancelAnimationFrame(animFrame.current);
    lastTime.current = null;
    // Add velocity for bounce back - negative means snap back
    velocity.current = -stretch.current * 8;
    animFrame.current = requestAnimationFrame(runSpring);
  }, [runSpring]);

  // Trigger download
  const triggerDownload = useCallback(() => {
    if (isPulled.current) return;
    isPulled.current = true;
    wasTriggered.current = true;
    setPulled(true);

    // Download resume
    const link = document.createElement("a");
    link.href = "/RESUME.pdf";
    link.download = "RESUME.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Snap back to rest with extra bounce
    setTimeout(() => {
      releaseRope();
    }, 150);

    // Reset flag after animation completes
    setTimeout(() => {
      isPulled.current = false;
      wasTriggered.current = false;
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
    
    // Soft resistance - allows stretching far
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

  // Setup event listeners
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

  const handleVideoEnd = () => setShowContent(true);
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.duration - video.currentTime <= 1.5) setShowText(true);
  };

  return (
    <section className="hero-section">

      {/* ROPE & BALL */}
      <div className="resume-pull-container">
        <div className={`resume-message ${pulled ? "pulled" : ""}`}>
          {pulled ? "✓ Resume Downloaded!" : "Pull the rope for Resume"}
        </div>

        <svg className="rope-svg" width="180" height="380" style={{ overflow: "visible" }}>
          {/* Shadow */}
          <path ref={ropeShadowRef} d="M93 3 Q93 103 93 203" stroke="rgba(0,0,0,0.15)" strokeWidth="5" fill="none" strokeLinecap="round" />
          
          {/* Main rope */}
          <path ref={ropeMainRef} d="M90 0 Q90 100 90 200" stroke="#8B4513" strokeWidth="5" fill="none" strokeLinecap="round" />
          
          {/* Rope detail */}
          <path ref={ropeDetailRef} d="M90 0 Q90 100 90 200" stroke="#D2691E" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="10 5" opacity="0.5" />

          {/* Top anchor */}
          <circle cx="90" cy="0" r="6" fill="#654321" />
          <line x1="65" y1="0" x2="115" y2="0" stroke="#654321" strokeWidth="4" strokeLinecap="round" />

          {/* Ball */}
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

      {/* VIDEO */}
      {!showContent && (
        <>
          <div className="hero-video-container">
            <video ref={videoRef} className="hero-video" autoPlay muted playsInline onEnded={handleVideoEnd} onTimeUpdate={handleTimeUpdate}>
              <source src="/intro.mp4" type="video/mp4" />
            </video>
          </div>
          {showText && (
            <motion.div className="video-text" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <p className="greeting">Hey,</p>
              <h1 className="hero-name">I'm Teja Vendra</h1>
              <p className="hero-bio">Web & GenAI Developer</p>
            </motion.div>
          )}
        </>
      )}

      {/* MAIN CONTENT */}
      {showContent && (
        <>
          <div className="particles-bg">
            {[...Array(100)].map((_, i) => <span key={i} style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 8}s`, animationDuration: `${4 + Math.random() * 6}s` }} />)}
          </div>
          <motion.div className="hero-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
            <p className="greeting">Hey,</p>
            <h1 className="hero-name">I'm Teja Vendra</h1>
            <p className="hero-bio">Web & GenAI Developer</p>
            <p className="hero-tagline">Focused on building modern full-stack applications and integrating advanced AI solutions.</p>
          </motion.div>
          <a href="#About" className="scroll-down"><FaAngleDoubleDown /></a>
        </>
      )}
    </section>
  );
}

export default Hero;