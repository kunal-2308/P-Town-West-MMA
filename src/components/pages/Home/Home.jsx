import React from 'react'
import Navbar from '../../shared/Navbar'
import HeroSection1 from './HeroSection1'
import HeroSection2 from './HeroSection2'
import PoppperContainer from './PoppperContainer'
import TrainingPrograms from './TrainingPrograms'
import Reviews from './Reviews'
import VideoSection from './VideoSection'
import InfoSection from './InfoSection'
import Trainers from './Trainers'
import MmaClub from './MmaClub'
import Form from '@/components/shared/Form'

function Home() {
  return (
    <>
      <Navbar/>
      <HeroSection1/>
      <HeroSection2/>
      <PoppperContainer/>
      <TrainingPrograms/>
      <Reviews/>
      <VideoSection/>
      <InfoSection/>
      <Trainers/>
      <MmaClub/>
      <Form/>
    </>
  )
}

export default Home
