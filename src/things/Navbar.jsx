import { useState } from "react";
import {TextIndent,XCircle} from 'phosphor-react'
import '../styles/Things.css'
function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
   <header className={`navbar ${menuOpen ? 'responsive' : ''}`} id="Home">
      <div className="name"><img src="/logo-here.png" alt="Logo-here" /></div>
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
