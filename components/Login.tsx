'use client'

import { signIn } from 'next-auth/react';
import Image from 'next/image';

function Login() {
  return (
    <div className='bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center'>
        <Image 
            src="/main-logo.png"
            width={200}
            height={200}
            alt="logo"
        />
        <button onClick={() => signIn("google")} className="font-bold text-white text-3xl animate-pulse mt-5">Sign In to use ChatGPT</button>
    </div>
  )
}

export default Login

