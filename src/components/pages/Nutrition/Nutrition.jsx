import Navbar from '@/components/shared/Navbar'
import React from 'react'
import HeroSection from './HeroSection'
import InfoSection from './InfoSection'
import HeroSection2 from './HeroSection2'
import DataContainer from './DataContainer'

function Nutrition() {
  return (
    <>
        <Navbar/>
        <HeroSection/>
        <InfoSection/>
        <HeroSection2/>
        <DataContainer/>
    </>
  )
}

export default Nutrition
