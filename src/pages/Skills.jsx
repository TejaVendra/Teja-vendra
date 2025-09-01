import "../styles/Skills.css";
import { FaReact, FaDatabase } from "react-icons/fa";
import { FaWrench, FaLightbulb, FaPaintBrush } from "react-icons/fa";
import { SiDjango, SiMysql, SiSqlite } from "react-icons/si";
import { FaCog } from "react-icons/fa";
import { FaCubes } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";



function Skills() {
  return (
    <section className="skills-section" id="Skills">
      <h2 className="skills-heading">Skills</h2>
      <div className="underline"></div>

      <div className="skills-grid">
        {/* Development Section */}
        <div className="skills-block">
          <h3><FaCog /> DEVELOPMENT</h3>
          <div className="skills-tags">
            <span>Java</span>
             <span>Python</span>
            <span>JavaScript</span>
            <span>HTML5</span>
            <span>CSS3</span>
            <span>Django</span>
            <span>Node js</span>
            <span>Express js</span>
          </div>
        </div>


         {/* Frameworks & Libraries */}
          <div className="skills-category">
            <h3 className="category-title"><FaCubes /> Frameworks & Libraries</h3>
            <div className="skills-grid">
              <div className="skill-item"><FaReact /> React.js</div>
              <div className="skill-item"><SiDjango /> rest Framework</div>
              <div className="skill-item"><SiTailwindcss /> Tailwind css</div>
            </div>
          </div>


         {/* Databases */}
          <div className="skills-category">
            <h3 className="category-title"><FaDatabase /> Databases</h3>
            <div className="skills-grid">
              <div className="skill-item"><SiMysql /> MySQL</div>
              <div className="skill-item"><SiSqlite /> SQLite</div>
            </div>
          </div>

        {/* Design */}
        <div className="skills-block">
          <h3><FaPaintBrush /> Design</h3>
          <div className="design-icons">
            <span>Figma</span>
            <span>Canva</span>
            <span>Photoshop</span>
          </div>
        </div>

        {/* Tools */}
        <div className="skills-block">
          <h3><FaWrench /> Tools</h3>
          <ul>
            <li>Git & GitHub</li>
            <li>VS Code</li>
            <li>Cursur</li>
            <li>Linux / CLI</li>
            <li>Pycharm & Intellij IDEAL</li>
          </ul>
        </div>

        {/* Knowledge */}
        <div className="skills-block">
          <h3><FaLightbulb /> Learning</h3>
          <ul>
            <li>Data Engineering Concepts</li>
            <li>SQL Optimization</li>
            <li>ETL Pipelines</li>
            <li>API Integration</li>
            <li>System Design Basics</li>
            <li>Python Libraries</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Skills;
