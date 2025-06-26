
import '../styles/Home.css';
import Hero from '../things/Hero';
import Navbar from '../things/Navbar';
import About from './About';
import Education from './Education';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';
import Footer from './Footer';
function Home() {
  
          
  return ( 
    <>
       <Navbar/>
       Home page
       <Hero/>
       <About />
      <Education />
      <Projects />
      <Skills />
      <Contact />
    </>
     
  );
}

export default Home;

