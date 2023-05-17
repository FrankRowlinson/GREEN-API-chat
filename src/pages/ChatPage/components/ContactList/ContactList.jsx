import { useForm } from "react-hook-form"
import { useState } from "react"
import PropTypes from "prop-types"
import "./ContactList.scss"

export function ContactList({ currentChat, onSelection }) {
  const { register, handleSubmit, reset } = useForm()
  const [contacts, setContacts] = useState([])

  const onSubmit = (data) => {
    if (contacts.indexOf(data.contact) === -1) {
      setContacts((prev) => [...prev, data.contact])
    }
    onSelection(data.contact)()
    reset()
  }

  return (
    <div className='contact-list'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("contact", {
            required: true,
            minLength: 11,
            maxLength: 12,
          })}
          placeholder='Введите номер для создания нового чата'
          autoComplete='off'
          title='Номер без специальных знаков в международном формате. Длина - 11-12 цифр'
        />
        <button>+</button>
      </form>
      {contacts.length ? (
        <>
          {contacts.map((el) => (
            <div
              key={el}
              onClick={onSelection(el)}
              className={`contact ${currentChat === el && "selected"}`}
            >
              {el}
            </div>
          ))}
        </>
      ) : (
        <p>Список контактов пуст</p>
      )}
    </div>
  )
}

ContactList.propTypes = {
  currentChat: PropTypes.string,
  onSelection: PropTypes.func.isRequired,
}
