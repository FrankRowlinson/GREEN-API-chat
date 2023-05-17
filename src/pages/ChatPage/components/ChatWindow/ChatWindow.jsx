import { useContext, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import PropTypes from "prop-types"

import { InstanceContext } from "./../../../../context"
import { sendMessage, getMessageOrNull } from "../../../../utils/API"
import { useInterval } from "../../../../hooks"
import "./ChatWindow.scss"
import { getStoredMessages, setStoredMessages } from "../../../../utils/storage"

export function ChatWindow({ currentChat }) {
  const [messages, setMessages] = useState([])
  const { register, handleSubmit, reset } = useForm()

  const { instance } = useContext(InstanceContext)

  useEffect(() => {
    const fetchData = async () => {
      const messages = await getStoredMessages(currentChat)
      setMessages(messages)
    }
    fetchData()
  }, [currentChat])

  useInterval(async () => {
    const message = await getMessageOrNull(
      instance.idInstance,
      instance.apiTokenInstance
    )
    if (message) {
      setMessages((prev) => {
        const newMessages = [...prev, { me: false, message, id: prev.length }]
        setStoredMessages(currentChat, newMessages)
        return newMessages
      })
    }
  }, 5000)

  const onSubmit = (data) => {
    sendMessage(
      instance.idInstance,
      instance.apiTokenInstance,
      currentChat,
      data.message
    )
    setMessages((prev) => {
      const newMessages = [
        ...prev,
        { me: true, message: data.message, id: prev.length },
      ]
      setStoredMessages(currentChat, newMessages)
      return newMessages
    })
    reset()
  }

  return (
    <>
      {currentChat ? (
        <div className='chat-window'>
          <div className='contact-info'>
            <span>{currentChat}</span>
          </div>
          <div className='chat-box'>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message-container ${msg.me ? "me" : ""}`}
              >
                <div className={`message ${msg.me ? "me" : ""}`}>
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("message")}
              placeholder='Напишите что-нибудь...'
              autoComplete='off'
            />
            <button type='submit'>Отправить</button>
          </form>
        </div>
      ) : (
        <p>Выберите чат для отправки сообщений...</p>
      )}
    </>
  )
}

ChatWindow.propTypes = {
  currentChat: PropTypes.string,
}
