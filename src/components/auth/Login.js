import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAppContext } from '../../context/state'
import AuthLayout from './AuthLayout'
import AuthInput from './AuthInput'
import BtnLoader from '../spinners/BtnLoader'

export default function Login() {
  const { actions } = useAppContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  const loginUserReq = async () => {
    setLoading(true)
    try {
      const res = await fetch('https://fullstack-role.busara.io/api/v1/oauth/token/', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'password&username',
          username: email,
          password,
          '-u': '12345:efghjkopdfghjkl',
        }),
      })
      if (res.status === 201) {
        // registration request created
        toast.success('Login success', {
          duration: 6000,
          position: 'top-center',
        })
        setLoading(false)
        const data = await res.json()
        actions.setToken(data.access_token)
      } else {
        // bad request
        toast.error(res.statusText, {
          duration: 6000,
          position: 'top-center',
        })
        setLoading(false)
      }
    } catch (e) {
      // request error
      toast.error('Error sending registration request', {
        duration: 6000,
        position: 'top-center',
      })
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    loginUserReq()
  }

  return (
    <AuthLayout>
      <form className="auth-form" onSubmit={handleSubmit}>
        <AuthInput type="email" required label="Email address" placeholder="your@email.com" value={email} changeHandler={(e) => setEmail(e.target.value)} />
        <AuthInput type="password" required label="Password" placeholder="password" value={password} changeHandler={(e) => setPassword(e.target.value)} />
        <button type="submit" disabled={loading} className="auth-submit">
          {loading ? <BtnLoader color="#fff" /> : <h5>Sign In</h5>}
        </button>
      </form>
    </AuthLayout>
  )
}
