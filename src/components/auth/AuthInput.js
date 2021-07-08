/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'

export default function AuthInput({
  type, label, changeHandler, value, placeholder, required,
}) {
  return (
    <div className="auth-input">
      <label>{label}</label>
      <input type={type} required={!!required} placeholder={placeholder} value={value} onChange={changeHandler} />
    </div>
  )
}
