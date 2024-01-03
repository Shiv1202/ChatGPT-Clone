import { DocumentData } from "firebase/firestore"
type Props = {
    message: DocumentData
}

function Message({ message}: Props ) {
    console.log(message)

    const isChatGPT = message.user.name ==='ChatGPT';
  return (
    <div className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}>
        <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
            <img src={message.user.avatar} alt="user-avatar" className="h-8 w-8 rounded rounded-full" />
            <p className="pt-1 text-sm">
                {message.text}
            </p>
        </div>
    </div>
  )
}

export default Message