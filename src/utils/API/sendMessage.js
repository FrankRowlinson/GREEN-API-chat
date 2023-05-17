import axios from "axios"

export const sendMessage = async (
  idInstance,
  apiTokenInstance,
  phoneNumber,
  message
) => {
  const response = await axios.post(
    `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
    {
      chatId: `${phoneNumber}@c.us`,
      message,
    }
  )

  return response.data
}
