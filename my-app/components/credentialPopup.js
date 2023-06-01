import LoginPopup from "./LoginPopup"
import SignInPopup from "./SignInPopup"
import { useState } from "react"

export default function CredentialPopup({ closePopup }) {
  const [credential, setCredential] = useState("")
  const [login, setLogin] = useState(false)
  const [signin, setSignin] = useState(false)

  const handleCredential = async (credentialType) => {
    setCredential(credentialType)
    if (credentialType == "Login") {
      setLogin(true)
      setSignin(false)
    } else if (credentialType == "Signin") {
      setSignin(true)
      setLogin(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-8">
      <div className="flex flex-col w-80 space-y-8">
        {login && <LoginPopup closePopup={closePopup} />}
        {signin && <SignInPopup closePopup={closePopup} />}
        <div className=" flex flex-row space-x-5 justify-center">
          <button
            className="bg-white text-blue-500 py-2 px-4 rounded-lg"
            onClick={() => {
              handleCredential("Signin")
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              handleCredential("Login")
            }}
            className="bg-white text-blue-500 py-2 px-4 rounded-lg"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  )
}
