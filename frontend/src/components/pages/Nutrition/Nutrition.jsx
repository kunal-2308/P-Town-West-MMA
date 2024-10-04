import Navbar from 'frontend/src/components/shared/Navbar'
import React from 'react'
import HeroSection from './HeroSection'
import InfoSection from './InfoSection'
import HeroSection2 from './HeroSection2'
import DataContainer from './DataContainer'
import Footer from 'frontend/src/components/shared/Footer'

function Nutrition() {
  return (
    <>
        <Navbar/>
        <HeroSection/>
        <InfoSection/>
        <HeroSection2/>
        <DataContainer/>
        <Footer/>
    </>
  )
}

export default Nutrition
