import { PlusIcon } from "@heroicons/react/24/solid"
import { addDoc, serverTimestamp, collection } from "firebase/firestore";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { db } from "@/firebase";

function NewChat() {

    const router = useRouter();
    const {data: userData} = useSession();

    const createNewChat = async () => {
        const doc = await addDoc(collection(db, 'users', userData?.user?.email!, 'chats'), {
            userId: userData?.user?.email!,
            createdAt: serverTimestamp()
        });

        router.push(`/chat/${doc.id}`)
    }

  return (
    <div onClick={createNewChat} className="border border-gray-700 chatRow">
        <PlusIcon className="h-4 w-4" />
        <p>New Chat</p>
    </div>
  )
}

export default NewChat