import React, { useContext } from 'react'
import Image from 'next/image'
import Countdown from 'react-countdown'

// INTERNAL IMPORT
import { VotingContext } from '../context/Voter'
import Card from '../components/Card/Card'
import Style from '../styles/index.module.css'
import image from "../assets/candidate1.jpg"

const index = () => {
  const { votingTitle } = useContext(VotingContext)
  return (
    <div>
      {votingTitle}
    </div>
  )
}

export default index
