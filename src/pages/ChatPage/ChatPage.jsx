import { useState } from "react"
import { ChatWindow, ContactList } from "./components"
import "./ChatPage.scss"

export function ChatPage() {
  const [currentChat, setCurrentChat] = useState(null)

  function onSelection(contact) {
    return () => setCurrentChat(contact)
  }

  return (
    <div className='container'>
      <ContactList currentChat={currentChat} onSelection={onSelection} />
      <ChatWindow currentChat={currentChat} />
    </div>
  )
}
