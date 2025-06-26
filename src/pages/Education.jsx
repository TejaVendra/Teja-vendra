import EducationTimeline from "../things/EducationTimeline"
import '../styles/Education.css'
import Resume from "../things/Resume"
function Education() {
  return (
     <div className="education-section" id="Education" >
      <div className="section-heading">
         <h2>Education</h2>
        <div className="underline" />
       </div>
      <EducationTimeline />
      <Resume/>
    </div>
  )
}

export default Education
