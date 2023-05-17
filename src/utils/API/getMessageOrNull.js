import axios from "axios"

const baseUrl = "https://api.green-api.com/waInstance"

export const getMessageOrNull = async (idInstance, apiTokenInstance) => {
  const response = await axios.get(
    `${baseUrl}${idInstance}/ReceiveNotification/${apiTokenInstance}`
  )
  if (response.data) {
    await axios.delete(
      `${baseUrl}${idInstance}/DeleteNotification/${apiTokenInstance}/${response.data.receiptId}`,
      {
        params: {
          receiptId: Number(response.data.receiptId),
        },
      }
    )
    if (response.data.body.typeWebhook === "incomingMessageReceived") {
      return response.data.body.messageData.textMessageData.textMessage
    }
  }
  return null
}
