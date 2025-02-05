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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('email/pass', email, password)

    if (email === 'admin@gmail.com') {
      setJwtToken('abc')
      setAlertClassName('d-none')
      setAlertMessage('')
      navigate('/')
    } else {
      setAlertClassName('alert-danger')
      setAlertMessage('Invalid email or password')
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
