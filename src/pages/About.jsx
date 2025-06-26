import '../styles/About.css'
import profileImg from '/my-photo.webp'
function About() {
  return (
    <div className="about-container" id='About'>
      <div className="about-text">
        <h2 className="about-heading">A Little Bit About Me</h2>
        <p className="intro">Hey, I’m <strong>Teja</strong> — a curious mind and passionate learner currently studying at <strong>VIT-AP</strong>. I'm deeply interested in <strong>technology, design</strong>, and how creative ideas can shape the future.</p>

        <p>I enjoy diving into projects that challenge the way we think and work. I believe in <strong>learning by doing</strong>, and I’m always on the lookout for opportunities to grow and create.</p>

        <p>Right now, I’m focused on developing my skills, connecting with like-minded people, and slowly carving my own path in the world of innovation.</p>

        <p className="thanks">Thanks for stopping by — feel free to explore more of what I’m up to.</p>

        <p className="signature"><strong>Teja</strong><br />Student • Explorer • Creator</p>
      </div>
      <div className="about-image">
        <img src={profileImg} alt="Teja" />
      </div>
    </div>
  );
}

export default About
