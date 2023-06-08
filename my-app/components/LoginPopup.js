import { useState, useContext } from "react"
import { UserContext } from "@/pages/_app"

export default function LoginPopup({ closePopup }) {
  const { user, setUser } = useContext(UserContext)
  const [emailId, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    console.log("handleLogin: ", emailId)
    setUser(emailId)
    const data = {
      email: emailId,
      password: password,
    }

    const req = await fetch("http://localhost:3000/auth", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log(req)
    const res = await req.json()
    console.log(res)
    if (req.status == 201) {
      return { respond: req.status, message: "success" }
    } else {
      return { respond: req.status, message: res.message }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { respond, message } = await handleLogin()
    if (respond == 201) closePopup()
    else {
      alert("Invalid Credentials: ")
    }
  }

  return (
    <div className=" space-y-4">
      <h2 className="text-center font-bold text-2xl text-white">Log in</h2>
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
          Login In
        </button>
      </form>
    </div>
  )
}
