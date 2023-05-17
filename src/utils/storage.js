import localforage from "localforage"

export const getStoredMessages = async (contact) => {
  const messages = await localforage.getItem(contact)
  return messages || []
}

export const setStoredMessages = async (contact, messages) => {
  localforage.setItem(contact, messages)
}
