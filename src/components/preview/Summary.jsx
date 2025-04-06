import React from 'react'

const Summary = ({resumeInfo}) => {
  return (
    <div className='text-sm text-left'>
      {resumeInfo?.summary}
    </div>
  )
}

export default Summary
