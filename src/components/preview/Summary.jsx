import React from 'react'

const Summary = ({resumeInfo}) => {
  return (
    <div className='sm:text-sm text-xs text-left'>
      {resumeInfo?.summary}
    </div>
  )
}

export default Summary
