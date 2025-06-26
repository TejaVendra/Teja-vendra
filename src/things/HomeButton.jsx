
import { FaHome } from 'react-icons/fa';
import '../styles/Things.css'
function HomeButton() {
 

  return (
    <div className="home-button-container">
      <a className="home-button" href='#'>
        <FaHome />
      </a>
      <div className="vertical-line" />
    </div>
  );
}

export default HomeButton;
