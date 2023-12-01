'use client'
import NewChat from "./NewChat"
import { useSession, signOut } from "next-auth/react"
import { collection, query, orderBy } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import ChatRow from "./ChatRow";

function SideBar() {
    const { data } = useSession()

    const [chats, loading, errors] = useCollection(
        data && query(
            collection(db, "users", data?.user?.email!, 'chats'), orderBy('createdAt', 'asc')
        )
    )

  return (
    <div className="p-2 flex flex-col h-screen">
        <div className="flex-1">
            <div>
                <NewChat />
                <div>
                    {/* ModelSelection */}
                </div>
                {/* Map through the ChatRows */}
                {
                    chats?.docs.map((chat) => {
                        return <ChatRow key={chat.id} id={chat.id} /> 
                    })
                }
            </div>
        </div>

        {data && (
            <img onClick={() => signOut()} className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50" src={data.user?.image!} alt="Profile Img" title="Log Out" />
            )}
    </div>
  )
}

export default SideBar