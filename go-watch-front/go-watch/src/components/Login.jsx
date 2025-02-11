import { useState } from 'react'
import Input from './form/Input'
import { useOutletContext } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setJwtToken } = useOutletContext()
  const { setAlertMessage, setAlertClassName } = useOutletContext()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    let payload = {
      email: email,
      password: password,
    }

    console.log("Payload enviado:", payload)  // Verifique se os dados estão corretos.

    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    }

    try {
      const response = await fetch('/authenticate', requestOptions)

      console.log("Resposta do servidor:", response)  // Para verificar o status da resposta.

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        setAlertClassName("alert-danger")
        setAlertMessage(data.message)
        console.log("Erro de autenticação:", data.message)
      } else {
        setJwtToken(data.access_token)
        setAlertClassName("d-none")
        setAlertMessage("")
        navigate('/')
      }
    } catch (err) {
      setAlertClassName("alert-danger")
      setAlertMessage(err.message || "An unexpected error occurred")
      console.log("Erro no envio da requisição:", err)
    }
  }


  return (
    <div className="col-md-6 offset-md-3">
      <h2>Login!</h2>
      <hr />

      <form onSubmit={handleSubmit}>
        <Input
          title="Email"
          type="email"
          className="form-control"
          name="email"
          autoComplete="email-new"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          title="Password"
          type="password"
          className="form-control"
          name="password"
          autoComplete="password-new"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <hr />

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
    </div>
  )
}
