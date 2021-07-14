/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../context/state'
import Busara from '../../img/lo.png'
import BtnLoader from '../spinners/BtnLoader'

function UserDetails({ user }) {
  if (!user) {
    return null
  }
  return (
    <div className="user-details">
      <div className="user-details-name">{user.name}</div>
      <div className="user-details-email">{user.email}</div>
    </div>
  )
}

function AccCard({ visible, user, close }) {
  const { actions } = useAppContext()
  if (!visible) {
    return null
  }
  return (
    <>
      <div className="close-overlay" onClick={close} />
      <div className="acc-card">
        <UserDetails user={user} />
        <button className="sign-out" type="button" onClick={actions.removeToken}>Sign Out</button>
      </div>
    </>
  )
}

export default function Header() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [cardOpen, toggleCard] = useState(false)

  const { state } = useAppContext()
  const { userToken } = state

  const getCurrentUserReq = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://fullstack-role.busara.io/api/v1/users/current-user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      })
      if (res.status === 200) {
        setLoading(false)
        const data = await res.json()
        setUser(data)
      } else {
        // bad request
        setLoading(false)
      }
    } catch (e) {
      // request error
      setLoading(false)
    }
  }
  useEffect(() => {
    getCurrentUserReq()
  }, [])
  return (
    <header className="home-header">
      <div className="brand">
        <img src={Busara} alt="busara logo" />
      </div>
      <div className="acc">
        <div className="initials" onClick={() => toggleCard(!cardOpen)}>
          {loading ? <BtnLoader color="#fff" /> : null}
          {user ? <span>{`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}</span> : null}
        </div>
        <AccCard visible={cardOpen} user={user} close={() => toggleCard(false)} />
      </div>
    </header>
  )
}
