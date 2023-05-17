import { useContext } from "react"
import { useForm } from "react-hook-form"
import { InstanceContext } from "../../context"
import "./AuthPage.scss"

export function AuthPage() {
  const { register, handleSubmit } = useForm()
  const { setInstance } = useContext(InstanceContext)

  const onSubmit = (data) => {
    setInstance(data)
  }

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='idInstance'>idInstance</label>
        <input
          {...register("idInstance", {
            required: true,
            minLength: 6,
            maxLength: 100,
          })}
          placeholder='Введите idInstance'
        />
        <label htmlFor='apiTokenInstance'>apiTokenInstance</label>
        <input
          {...register("apiTokenInstance", {
            required: true,
            minLength: 10,
            maxLength: 200,
          })}
          placeholder='Введите apiTokenInstance'
          type='password'
        />
        <a
          href='https://green-api.com/docs/before-start/'
          target='_blank'
          rel='noreferrer'
        >
          Где взять?
        </a>
        <button type='submit'>Начать</button>
      </form>
    </div>
  )
}
