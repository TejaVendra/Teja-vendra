import Home from './pages/Home'
import About from './pages/About'
import {Route,Routes} from 'react-router-dom'
import './App.css'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Contact from './pages/Contact'
import Footer from './pages/Footer'
import Education from './pages/Education'
import SocialBar from './things/SocialBar'
import HomeButton from './things/HomeButton'
import NotFound from './pages/NotFound'
function App() {
  

  return (
    <div>
      <SocialBar />
      <HomeButton />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/Education" element={<Education />} />
        <Route path="/Skills" element={<Skills />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>

      <Footer />
    </div>
  )
}

export default App
