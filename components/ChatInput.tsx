'use client'

import { db } from "@/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react"
import { toast } from "react-hot-toast";

type Props = {
    chatId: string
}

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session} = useSession();

  //TODO: useSWR to get the model
  const model = 'text-davinci-003'

  const sendMessage =async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!prompt) return;
    const input = prompt.trim()
    setPrompt('')

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name!}`
      }
    }

    await addDoc(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'), message)

    // Toast notification to say Loading!
    const notification = toast.loading('ChatGPT is Processing...');


    await fetch('/api/askQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session
      })
    }).then((res) => {
      // Toast notification to say successful
      toast.success('ChatGPT has responded!', {
        id: notification,
      })
    })

  }

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
        <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
          <input
          className="bg-transparent flex-1 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!session}
          type="text"
          value={prompt}
          placeholder="type your message here..."
          onChange={(e) => setPrompt(e.target.value)} 
          />
          <button 
          disabled={ !prompt || !session }
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          type="submit">
            <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
          </button>
        </form>

        <div>
          {/* ModelSelection */}
        </div>
    </div>
  )
}

export default ChatInput