import React from 'react'
import { useAppContext } from '../../context/state'

export default function Login() {
  const { actions } = useAppContext()
  return (
    <div>
      <h1>Login page, have the login form</h1>
      <button
        type="button"
        onClick={() => {
          actions.setToken('123456')
        }}
      >
        Login
      </button>
    </div>
  )
}
