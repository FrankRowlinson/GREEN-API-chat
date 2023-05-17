import localforage from "localforage"

export const getStoredMessages = async (contact) => {
  const messages = await localforage.getItem(contact)
  return messages || []
}

export const setStoredMessages = async (contact, message) => {
  const prevMessages = (await localforage.getItem(contact)) || []
  localforage.setItem(contact, [
    ...prevMessages,
    { ...message, id: prevMessages.length },
  ])
}
