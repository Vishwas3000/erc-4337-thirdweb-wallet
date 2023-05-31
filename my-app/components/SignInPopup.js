import { useState } from "react"

const SignInPopup = ({ closePopup }) => {
  const [emailId, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignIn = async () => {
    const data = {
      email: emailId,
      password: password,
    }
    const req = await fetch("/user/create", {
      mode: "no-cors",
      method: "POST",
      body: JSON.parse(JSON.stringify(data)),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const res = await req.json()
    console.log(res)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSignIn()
    closePopup()
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-8">
      <div className="flex flex-col w-80 space-y-8">
        <h2 className="text-center font-bold text-2xl text-white">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={emailId}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className="border border-gray-300 py-2 px-4 rounded-lg text-violet-950"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 py-2 px-4 rounded-lg text-violet-950"
          />
          <button
            type="submit"
            className="bg-white text-blue-500 py-2 px-4 rounded-lg"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignInPopup
