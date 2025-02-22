import React, { useContext } from 'react'
import Image from 'next/image'
import Countdown from 'react-countdown'

// INTERNAL IMPORT
import { VotingContext } from '../context/Voter'
import Card from '../components/Card/Card'
// import Style 
// import image from "../ass"

const index = () => {
  const { votingTitle } = useContext(VotingContext)
  return (
    <div>
      {votingTitle}
    </div>
  )
}

export default index
