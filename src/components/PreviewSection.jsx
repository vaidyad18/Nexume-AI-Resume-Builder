import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetails from './preview/PersonalDetails'
import Summary from './preview/Summary'
import Experience from './preview/Experience'
import Education from './preview/Education'
import Projects from './preview/Projects'
import Skills from './preview/Skills'

const PreviewSection = () => {

  const {resumeInfo, setResumeInfo}=useContext(ResumeInfoContext)

  return (
    <div className='mt-5 bg-white -mb-5 h-full p-10 shadow-xl text-center border-t-[20px]' style={{borderColor:resumeInfo?.theme}}>
      <PersonalDetails resumeInfo={resumeInfo}/>
      <Summary resumeInfo={resumeInfo}/>
      {resumeInfo?.experience && <Experience resumeInfo={resumeInfo}/>}
      <Projects resumeInfo={resumeInfo}/>
      <Education resumeInfo={resumeInfo}/>
      <Skills resumeInfo={resumeInfo}/>
    </div>
  )
}

export default PreviewSection
