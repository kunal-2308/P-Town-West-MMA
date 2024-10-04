import Navbar from 'frontend/src/components/shared/Navbar'
import React from 'react'
import HeroSection from './HeroSection'
import CoreValues from './CoreValues'
import Form from 'frontend/src/components/shared/Form'
import Footer from 'frontend/src/components/shared/Footer'

function About() {
  return (
    <>
        <Navbar/>
        <HeroSection/>
        <CoreValues/>
        <Form/>
        <Footer/>
    </>
  )
}

export default About
