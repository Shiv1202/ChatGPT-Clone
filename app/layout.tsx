import ClientProvider from '@/components/ClientProvider'
import Login from '@/components/Login'
import {SessionProvider} from '@/components/SessionProvider'
import SideBar from '@/components/SideBar'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'My ChatGPT clone',
  description: 'ChatGPT clone using OpenAI API and next 14',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          { !session ? (
            <Login />
          ) : (
            <div className='flex'>
            <div className='bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]'>
              <SideBar />
            </div>
            { /* Cilent Provider -  Notification */ }
            <ClientProvider />
  
            <div className='bg-[#343541] flex-1'>
              {children}
            </div>
  
          </div>
          )}
        
        </SessionProvider>
        </body>
    </html>
  )
}
