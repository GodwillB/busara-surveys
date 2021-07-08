/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAppContext } from './state'

export default function PublicRoute({ component: Component, userLogin, ...rest }) {
  const { state } = useAppContext()
  const { userToken } = state
  return (
    <Route
      {...rest}
      render={(props) => {
        if (userToken) {
          return <Redirect to="/" />
        }
        return <Component {...props} />
      }}
    />
  )
}
