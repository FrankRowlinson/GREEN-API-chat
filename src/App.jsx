import { useState } from "react"
import { AuthPage, ChatPage } from "./pages"
import { InstanceContext } from "./context"
import "./App.scss"

function App() {
  const [instance, setInstance] = useState(null)
  return (
    <InstanceContext.Provider value={{ instance, setInstance }}>
      <div className='App'>{instance ? <ChatPage /> : <AuthPage />}</div>
    </InstanceContext.Provider>
  )
}

export default App
