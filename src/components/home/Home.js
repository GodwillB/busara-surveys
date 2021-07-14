import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../context/state'
import BtnLoader from '../spinners/BtnLoader'
import Header from './Header'
import '../../styles/home.css'

export default function Home() {
  const [loading, setLoading] = useState(false)

  const { state } = useAppContext()
  const { userToken } = state

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
        // const data = await res.json()
        console.log(await res.json())
      } else {
        // bad request
        console.log(res)
        setLoading(false)
      }
    } catch (e) {
      // request error
      console.log(e)
      setLoading(false)
    }
  }
  useEffect(() => {
    getQuestionsReq()
  }, [])
  return (
    <main>
      <Header />
      {loading ? <BtnLoader color="#000080" /> : null}
    </main>
  )
}
