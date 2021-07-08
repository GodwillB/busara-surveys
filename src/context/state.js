/* eslint-disable max-len */
import {
  createContext, useContext, useState, useMemo,
} from 'react'

const AppContext = createContext()

const useAppState = () => {
  const userToken = localStorage.getItem('userToken') || null
  const initialState = {
    userToken,
  }
  // Manage the state using React.useState()
  const [state, setState] = useState(initialState)
  // Build our actions. We'll use useMemo() as an optimization,
  // so this will only ever be called once.
  // eslint-disable-next-line no-use-before-define
  const actions = useMemo(() => getActions(setState), [setState])
  return { state, actions }
}

// Define your actions as functions that call setState().
// It's a bit like Redux's dispatch(), but as individual
// functions.
const getActions = (setState) => ({
  setToken: (newToken) => {
    setState((state) => {
      localStorage.setItem('userToken', newToken)
      return ({ ...state, userToken: newToken })
    })
  },
  removeToken: () => {
    setState((state) => {
      localStorage.removeItem('userToken')
      return ({ ...state, userToken: null })
    })
  },
})

function AppWrapper({ children }) {
  const { state, actions } = useAppState()

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  )
}

function useAppContext() {
  return useContext(AppContext)
}
export { AppWrapper, useAppState, useAppContext }
