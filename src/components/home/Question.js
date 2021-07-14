/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'

export default function Question({
  question, changeHandler, ans,
}) {
  const answered = ans.find((el) => (el.q_id === question.id))
  const value = answered ? answered.q_ans : ''
  const {
    type, q_options, error_message, text, column_match,
  } = question
  if (type === 'select') {
    const options = q_options.map((option, index) => <option key={index} value={option.name}>{option.name}</option>)
    return (
      <div className="question-input">
        <select value={value} required onChange={(e) => changeHandler(question, e)}>
          <option value="">{`Select ${column_match}`}</option>
          {options}
        </select>
      </div>
    )
  }
  return (
    <div className="question-input">
      <label>{text}</label>
      <input type={type} value={value} onChange={(e) => changeHandler(question, e)} placeholder={error_message} />
    </div>
  )
}
