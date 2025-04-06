import React from 'react'

const PersonalDetails = ({resumeInfo}) => {
  return (
    <div>
      <h1 className='text-2xl -mt-2 font-bold' style={{color:resumeInfo?.theme}}>{resumeInfo?.firstName} {resumeInfo?.lastName}</h1>
      <p className='font-semibold'>{resumeInfo?.jobTitle}</p>
      <p className='text-xs font-semibold mt-1' style={{color:resumeInfo?.theme}}>{resumeInfo?.address}</p>
      <div className='flex font-semibold justify-between'>
        <p className='text-xs' style={{color:resumeInfo?.theme}}>{resumeInfo?.phone}</p>
        
        <p className='text-xs' style={{color:resumeInfo?.theme}}>{resumeInfo?.email}</p>
      </div>
      <hr className='border-2 my-2' style={{borderColor:resumeInfo?.theme}}/>
    </div>
  )
}

export default PersonalDetails
