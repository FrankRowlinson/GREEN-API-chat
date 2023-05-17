import PropTypes from "prop-types"
import "./ChatWindow.scss"

export function ChatWindow({ currentChat }) {
  return (
    <>
      {currentChat ? (
        <div className='chat-window'>
          <div className='contact-info'>
            <span>{currentChat}</span>
          </div>
          <div className='chat-box'></div>
          <form>
            <input></input>
            <button></button>
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
