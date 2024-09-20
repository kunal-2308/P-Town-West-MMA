import Navbar from '@/components/shared/Navbar'
import React from 'react'
import HeroSection from './HeroSection'
import CoreValues from './CoreValues'
import Form from '@/components/shared/Form'

function About() {
  return (
    <>
        <Navbar/>
        <HeroSection/>
        <CoreValues/>
        <Form/>
    </>
  )
}

export default About
