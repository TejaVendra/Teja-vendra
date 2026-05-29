import "../styles/Projects.css";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";

function Projects() {
  const projects = [
    {
      title: "College-X (CX)",
      description: "A full-stack social media platform inspired by X (formerly Twitter), built using the MERN stack. Features include secure user authentication, profile customization, post creation, likes, comments, reposts, follow/unfollow functionality, image uploads, personalized feeds, notifications, and a fully responsive UI. Designed to replicate the core social networking experience of X while providing a seamless and engaging user experience.",
      tech: ["MongoDB", "Express.js", "React", "Node.js", "JWT Authentication", "Cloudinary"],
      image: "/cx.png", // update with your actual image path
      github: "https://github.com/TejaVendra/cx",
      demo: "https://cx-wh9z.onrender.com",
      },

    {
      title: "Raju Welding Shop Website",
      description: "A full-stack business website for a local welding shop, built with React for the frontend and Django for the backend. Includes product image display, contact form, and responsive UI.",
      tech: ["React", "CSS", "Framer Motion", "Django", "Cloudinary"],
      image: "/rajuwelding.png", // update with your actual image path
      github: "https://github.com/TejaVendra/Raju-welding",
      demo: "https://raju-weldings.onrender.com", // live deployed link
    },
    {
      title: "FrameStack - Website Builder Platform",
      description: "A comprehensive full-stack web development platform similar to Wix, enabling users to create, customize, and deploy professional websites. Features include drag-and-drop interface, pre-built templates, real-time project tracking, user authentication, payment integration, and automated deployment. Administrators can manage projects, communicate with clients, and handle orders efficiently.",
      tech: ["React", "Django", "PostgreSQL", "Cloudinary", "Framer Motion", "Tailwind CSS"],
      image: "/framestack.png",
      github: "https://github.com/TejaVendra/framestack",
      demo: "https://framestack.onrender.com/",
    },
{
      title: "Study Assistance - AI-Powered Learning Tool",
      description: "An intelligent study companion that leverages AI to generate customized questions and quizzes from uploaded PDF documents. Users can upload study materials, select difficulty levels, and receive AI-generated practice questions to enhance learning. Features include PDF parsing, natural language processing, question generation algorithms, and progress tracking for effective exam preparation.",
      tech: ["Python", "GEMINI API", "Django", "React", "PyPDF2", "LangChain", "SQLlite", "Tailwind CSS"],
      image: "/study-assistance.png",
      github: "https://github.com/TejaVendra/-Study-assistant",
      demo: "https://study-assistant04.onrender.com/",
    },
    {
      title: "Student Management System",
      description: "A web-based application with separate interfaces for Admin and Students. Students can view the list of all students, while Admins have full access to perform CRUD (Create, Read, Update, Delete) operations on student records.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: "/PROJECT-02.png", // update with your actual image path
      github: "https://github.com/TejaVendra/studentManagement", // update with actual repo
      demo: "https://tejavendra.github.io/studentManagement/", // optional, update if available
},
   
   

  ];

  return (
     <section className="projects-section" id="Projects">
      <div className="projects-header">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          Some of My Works
        </motion.h2>
        <div className="underline"></div>
        <p className="projects-subtext">(More soon...)</p>
      </div>

      <div className="projects-grid">
        {projects.map((proj, index) => (
          <motion.div
            className="project-card"
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <img src={proj.image} alt={proj.title} className="project-image" />
            <div className="project-content">
              <h3>{proj.title}</h3>
              <p>{proj.description}</p>
              <div className="tech-tags">
                {proj.tech.map((t, i) => <span key={i}>{t}</span>)}
              </div>
              <div className="project-buttons">
                <a href={proj.github} target="_blank" rel="noopener noreferrer"><FaGithub /> Code</a>
                {proj.demo && (
                  <a href={proj.demo} target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> Live</a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
