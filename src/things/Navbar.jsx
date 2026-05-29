import { useState } from "react";
import {TextIndent,XCircle} from 'phosphor-react'
import { GiPirateFlag } from 'react-icons/gi';
import '../styles/Things.css'
function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
   <header className={`navbar ${menuOpen ? 'responsive' : ''}`} id="Home">
      <div className="name">
        <div style={{ 
            width: 45, 
            height: 45, 
            
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {/* Flag icon in background */}
            <GiPirateFlag 
              size={45} 
              color='#ff1500' 
              style={{ position: 'absolute', opacity: 0.3 }}
            />
            
            {/* Letter T */}
            <span style={{ 
              fontSize: 38, 
              fontWeight: 'bold', 
              color: '#f4e4bc',
              fontFamily: 'Georgia, serif',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}>T</span>
          </div>
      </div>
      <div className="menu-toggle" onClick={toggleMenu}>
        { menuOpen ?<XCircle  size={32} />: <TextIndent size={32} />}
      </div>
      <nav className="nav">
        <ul>
          <li><a href="#">Intro</a></li>
          <li><a href="#About">About</a></li>
          <li><a href="#Education">Education</a></li>
          <li><a href="#Projects">Projects</a></li>
          <li><a href="#Skills">Skills</a></li> 
          <li><a href="#Contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
