import '../styles/Things.css';
import { useLocation } from 'react-router-dom';
import { FaGithub, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

function SocialBar() {
     const location = useLocation();

  // Hide on contact page
  if (location.pathname === "/Contact") return null;
  return (
    <div className="social-bar">
      <ul>
        <li><a href="https://github.com/TejaVendra" target="_blank" rel="noopener noreferrer"><FaGithub /></a></li>
        <li><a href="https://www.instagram.com/its_t_e_j_a_01/?next=%2F" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
        <li><a href="https://x.com/T_E_J_A_01" target="_blank" rel="noopener noreferrer"><FaTwitter /></a></li>
        <li><a href="https://www.linkedin.com/in/teja-vendra-62bab7319/?originalSubdomain=in" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a></li>
      </ul>
    </div>
  );
}

export default SocialBar;
