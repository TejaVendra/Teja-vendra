import '../styles/Footer.css'
import { Phone ,Envelope,LinkedinLogo} from 'phosphor-react';
function Footer() {
    const today = new Date();

  return (
    <footer className="footer-section">
        <div className="quick-section">
            <div className="quick-heading">
              Quick Links
            </div>
            <div className="quick-links-section">
                <div className="quick-nav-section">
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#About">About</a></li>
                                <li><a href="#Projects">Works</a></li>
                                <li><a href="#Skills">Skills</a></li>
                                <li><a href="#Contact">Contact</a></li>
                            </ul>
                </div>
                <div className="quick-connections-section">
                        <ul>
                            <li><Phone size={16} /> : <a href="tel:+919704260084">+91 9704260084</a></li>
                            <li><Envelope size={16} /> : <a href="mailto:tejavendra2006@gmail.com">tejavendra2006@gmail.com</a></li>
                            <li><LinkedinLogo size={16} /> : <a href="https://www.linkedin.com/in/teja-vendra-62bab7319/?originalSubdomain=in">Teja vendra</a></li>
                        </ul>
                </div>
            </div>
        </div>
        <div className="footer">
             <p>&copy; {today.getFullYear()} Teja Vendra. All rights reserved.</p>
        </div>
         
    </footer>
  )
}

export default Footer
