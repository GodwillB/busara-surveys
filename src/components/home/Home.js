import React from 'react'
import { useAppContext } from '../../context/state'

export default function Home() {
  const { actions } = useAppContext()
  return (
    <main>
      <h1>This is the main page, it should be protected</h1>
      <button
        type="button"
        onClick={actions.removeToken}
      >
        Logout
      </button>
    </main>
  )
}
