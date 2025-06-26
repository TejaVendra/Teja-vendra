import { FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa6";
import { MdLocalPhone } from "react-icons/md";
import { motion } from "framer-motion";
import '../styles/Contact.css';
import axios from 'axios';
import { useState } from "react";

function Contact() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [message,setMessage] = useState('');
  const [responseMess,setResponseMess] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

   const handleSubmit = async (e) => {
     e.preventDefault();
      setIsSubmitted(true);

      // Hide the popup after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);

       try{
        const res =  axios.post('https://teja-vendra-ch93.onrender.com/api/v2/ContactData/',
         { 
          name:name,
          email:email,
          message:message
         });
         setResponseMess('Your Response submitted successfully!')
         console.log(res.data);
         setName('');
         setEmail('');
          setMessage('');
         
    }catch(error){
      setResponseMess("Submission failed.")
      console.log(error)
      setName('');
         setEmail('');
          setMessage('');
    }
   };

  return (
    <section className="contact-section" id="Contact">
      <motion.div 
        className="contact-heading"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Get in Touch</h2>
        <p>Feel free to drop me a message. I’m open to opportunities, collaborations, or just a friendly chat!</p>
      </motion.div>

      <div className="contact-content">
        <motion.div 
          className="contact-form"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <form className="modern-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <input type="text" name="name"  onChange={(e) => setName(e.target.value)} value={name} required />
                <label>Name</label>
              </div>

              <div className="input-group">
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email}  required />
                <label>Email</label>
              </div>

              <div className="input-group">
                <textarea name="message" rows="6" onChange={(e) => setMessage(e.target.value)} value={message} required></textarea>
                <label>Message</label>
              </div>

              <button type="submit">Send Message</button>
            </form>
              {isSubmitted && (
            <div className="popup-message">
              {responseMess}
            </div>
          )}
        </motion.div>

        <motion.div 
          className="contact-info"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3>Let's connect!</h3>
          <p>I’m currently available for freelance work, internships or full-time roles. Let’s build something great together.</p>
          <div className="info-icons">
            <p><FaInstagram /> <a href="https://www.instagram.com/its_t_e_j_a_01/?next=%2F" target="_blank">Instagram</a></p>
            <p><FaGithub /> <a href="https://github.com/TejaVendra" target="_blank">GitHub</a></p>
            <p><FaLinkedinIn /> <a href="https://www.linkedin.com/in/teja-vendra-62bab7319/?originalSubdomain=in" target="_blank">LinkedIn</a></p>
            <p><MdLocalPhone /> <a href="tel:+919704260084">+91 97042 60084</a></p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
