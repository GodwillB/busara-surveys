import React from 'react'
import { useAppContext } from '../../context/state'
import AuthLayout from './AuthLayout'

export default function Login() {
  const { actions } = useAppContext()
  return (
    <AuthLayout>
      <div>
        <button
          type="button"
          onClick={() => {
            actions.setToken('123456')
          }}
        >
          Login
        </button>
      </div>
    </AuthLayout>
  )
}
