import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Busara from '../../img/lo.png'
import '../../styles/auth.css'

export default function AuthLayout({ children }) {
  const location = useLocation()
  const { pathname } = location
  const splitLocation = pathname.split('/')
  return (
    <main className="auth-page">
      <Toaster />
      <header className="auth-header">
        <div className="brand">
          <img src={Busara} alt="busara logo" />
        </div>
      </header>
      <div className="auth-holder">
        <nav className="auth-nav">
          <NavLink
            className={splitLocation[1] === 'register' ? 'nav-link nav-active' : 'nav-link'}
            to="/register"
          >
            <h4>SIGN UP</h4>
          </NavLink>
          <NavLink
            className={splitLocation[1] === 'login' ? 'nav-link nav-active' : 'nav-link'}
            to="/login"
          >
            <h4>SIGN IN</h4>
          </NavLink>
        </nav>
        <div className="auth-intro">
          <h3>{splitLocation[1] === 'register' ? 'Create an account' : 'Sign in to your account' }</h3>
          <p>Your insights will help us build a better experience.</p>
        </div>
        {children}
      </div>
    </main>
  )
}
