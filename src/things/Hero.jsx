import '../styles/Things.css';
import { motion } from "framer-motion";
import { FaAngleDoubleDown } from "react-icons/fa";

function Hero() {
  return (
    <section className="hero-section">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <motion.p
          className="greeting"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Hey,
        </motion.p>

        <motion.h1
          className="hero-name"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          I'm Teja Vendra
        </motion.h1>

        <motion.p
          className="hero-bio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
         Web & GenAI Developer  
        </motion.p>

        {/* Optional: You can add a short subtext */}
        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
      Focused on building modern full-stack applications and integrating advanced AI solutions.
        </motion.p>
      </motion.div>

      <a href="#About" className="scroll-down">
        <FaAngleDoubleDown />
      </a>
    </section>
  );
}

export default Hero;
