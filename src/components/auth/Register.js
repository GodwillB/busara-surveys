import React, { useState } from 'react'
import toast from 'react-hot-toast'
import AuthInput from './AuthInput'
import AuthLayout from './AuthLayout'
import BtnLoader from '../spinners/BtnLoader'

export default function Register() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [fullName, setFullName] = useState('')
  const [password1, setPassword] = useState('')
  const [password2, setRepeatPassword] = useState('')
  const [referralCode, setReferralCode] = useState('')

  const [loading, setLoading] = useState(false)

  const registerUserReq = async () => {
    setLoading(true)
    try {
      const res = await fetch('https://fullstack-role.busara.io/api/v1/users/registration/', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          email,
          password1,
          password2,
          referral_code: referralCode,
          phone_number: phone,
          full_name: fullName,
          device_details: { device: 'Dummy' },
          location: 'Dummy',
        }),
      })
      if (res.status === 201) {
        // registration request created
        toast.success('Registration request', {
          duration: 6000,
          position: 'top-center',
        })
        setLoading(false)
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
    registerUserReq()
  }

  return (
    <AuthLayout>
      <form className="auth-form" onSubmit={handleSubmit}>
        <AuthInput type="email" required label="Email address" placeholder="your@email.com" value={email} changeHandler={(e) => setEmail(e.target.value)} />
        <AuthInput type="phone" required label="Phone number" placeholder="phone number e.g +254712345678" value={phone} changeHandler={(e) => setPhone(e.target.value)} />
        <AuthInput type="text" required label="Full name" placeholder="full name" value={fullName} changeHandler={(e) => setFullName(e.target.value)} />
        <AuthInput type="password" required label="Password" placeholder="password" value={password1} changeHandler={(e) => setPassword(e.target.value)} />
        <AuthInput type="password" required label="Repeat password" placeholder="repeat password" value={password2} changeHandler={(e) => setRepeatPassword(e.target.value)} />
        <AuthInput type="text" label="Referall code (if any)" placeholder="referall code" value={referralCode} changeHandler={(e) => setReferralCode(e.target.value)} />
        <button type="submit" disabled={loading} className="auth-submit">
          {loading ? <BtnLoader color="#fff" /> : <h5>Sign Up</h5>}
        </button>
      </form>
    </AuthLayout>
  )
}
