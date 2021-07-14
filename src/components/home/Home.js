/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import toast, { Toaster } from 'react-hot-toast'
import SendIcon from '@material-ui/icons/Send'
import { useAppContext } from '../../context/state'
import BtnLoader from '../spinners/BtnLoader'
import Header from './Header'
import '../../styles/home.css'
import Question from './Question'

function Section({
  section, index, changeHandler, ans,
}) {
  const { questions } = section
  return (
    <div className="section">
      <h5>{`Section ${index + 1}: ${section.name}`}</h5>
      { questions.map((question) => <Question key={question.id} changeHandler={changeHandler} ans={ans} question={question} />) }
    </div>
  )
}

function FormPage({ page, changeHandler, ans }) {
  const { sections } = page
  return (
    <div className="form-page">
      <h4>{page.name}</h4>
      { sections.map((section, index) => <Section key={section.id} changeHandler={changeHandler} ans={ans} index={index} section={section} />) }
    </div>
  )
}

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [forms, setForms] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [pages, setPages] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentStep, setStep] = useState(1)
  const [ans, updateAns] = useState([])
  const [startTime] = useState(new Date(Date.now()).toISOString())
  const [endTime, setEndTime] = useState(new Date(Date.now()).toISOString())

  const { state } = useAppContext()
  const { userToken } = state

  const next = () => {
    const newStep = currentStep >= totalPages ? 4 : currentStep + 1
    setStep(newStep)
  }
  const prev = () => {
    const newStep = currentStep <= 1 ? 1 : currentStep - 1
    setStep(newStep)
  }

  const getQuestionsReq = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://fullstack-role.busara.io/api/v1/recruitment/forms/?node_type=Both', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      })
      if (res.status === 200) {
        setLoading(false)
        const data = await res.json()
        setForms(data.forms)
      } else {
        // bad request
        setLoading(false)
      }
    } catch (e) {
      // request error
      setLoading(false)
    }
  }
  const submitSurveyReq = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('https://fullstack-role.busara.io//api/v1/recruitment/answers/submit/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          ans,
          end_time: endTime,
          local_id: 0,
          location: {
            accuracy: 0,
            lat: 0,
            lon: 0,
          },
          start_time: startTime,
          survey_id: `${forms[0].id}`,
        }),
      })
      if (res.status === 200) {
        // login success
        toast.success('Answers Submitted', {
          duration: 4000,
          position: 'top-center',
        })
        setSubmitting(false)
      } else {
        // bad request
        toast.error(res.statusText, {
          duration: 6000,
          position: 'top-center',
        })
        setSubmitting(false)
      }
    } catch (e) {
      // request error
      toast.error('Error sending answer request', {
        duration: 6000,
        position: 'top-center',
      })
      setSubmitting(false)
    }
  }
  const handleSubmit = () => {
    setEndTime(new Date(Date.now()).toISOString())
    submitSurveyReq()
  }
  useEffect(() => {
    // calculate total pages
    const reducer = (accumulator, currentValue) => accumulator + currentValue.pages.length
    setTotalPages(forms.reduce(reducer, 0))
    // all pages loaded
    if (forms.length) {
      setPages(forms[0].pages)
    }
  }, [forms])
  useEffect(() => {
    getQuestionsReq()
  }, [])
  const NextBtn = () => {
    if (currentStep < totalPages) {
      return (
        <button type="button" onClick={next} className="form-nav-btn">
          <h4>Next</h4>
          <NavigateNextIcon style={{ fontSize: '30px', color: '#fff' }} />
        </button>
      )
    }
    return null
  }
  const PrevBtn = () => {
    if (currentStep !== 1) {
      return (
        <button type="button" onClick={prev} className="form-nav-btn">
          <NavigateBeforeIcon style={{ fontSize: '30px', color: '#fff' }} />
          <h4>Prev</h4>
        </button>
      )
    }
    return null
  }
  const SubmitBtn = () => {
    if (currentStep === totalPages) {
      return (
        <button type="submit" className="form-nav-btn" onClick={handleSubmit}>
          { !submitting ? (
            <>
              <h4>Submit</h4>
              <SendIcon style={{ fontSize: '30px', color: '#fff' }} />
            </>
          ) : <BtnLoader color="#fff" /> }
        </button>
      )
    }
    return null
  }
  function updateObjectInArray(array, updateIndex, newValue) {
    return array.map((item, index) => {
      if (index !== updateIndex) {
        return item
      }
      const newItem = item
      newItem.q_ans = newValue
      return {
        ...item,
        ...newItem,
      }
    })
  }
  function handleAnsChange(q, e) {
    const newAns = {
      column_match: q.column_match,
      q_ans: e.target.value,
      q_id: q.id,
    }
    // check  if question id is in the ans arr
    const isInAns = ans.findIndex((el) => el.q_id === q.id)
    if (isInAns >= 0) {
      // update the value
      updateAns(updateObjectInArray(ans, isInAns, e.target.value))
    } else {
      // insert the value
      updateAns([...ans, newAns])
    }
  }

  return (
    <main className="home-page">
      <Toaster />
      <Header />
      <h3 className="pages-header">{`Page ${currentStep} of ${totalPages}`}</h3>
      {loading ? <BtnLoader color="#000080" /> : null}
      { pages.length ? <FormPage page={pages[currentStep - 1]} changeHandler={handleAnsChange} ans={ans} /> : null }
      <div className="form-nav">
        <PrevBtn />
        <NextBtn />
        <SubmitBtn />
      </div>
    </main>
  )
}
