import { useState } from 'react'
import Input from './form/Input'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
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
