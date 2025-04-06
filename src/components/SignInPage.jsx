import React from 'react'
import { SignIn } from '@clerk/clerk-react'

const SignInPage = () => {
  return (
    <div className="flex justify-center h-screen  bg-[url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjg4Mi1zYXNpLTEzLmpwZw.jpg')] bg-cover items-center">
      <SignIn/>
    </div>
  )
}

export default SignInPage
