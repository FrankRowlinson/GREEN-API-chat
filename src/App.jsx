import { useState, useEffect } from "react"
import { AuthPage, ChatPage } from "./pages"
import { InstanceContext } from "./context"
import "./App.scss"
import localforage from "localforage"

function App() {
  const [instance, setInstance] = useState(null)

  useEffect(() => {
    localforage.clear()
  }, [])

  return (
    <InstanceContext.Provider value={{ instance, setInstance }}>
      <div className='App'>{instance ? <ChatPage /> : <AuthPage />}</div>
    </InstanceContext.Provider>
  )
}

export default App
