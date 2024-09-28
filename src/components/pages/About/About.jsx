import Navbar from '@/components/shared/Navbar'
import React from 'react'
import HeroSection from './HeroSection'
import CoreValues from './CoreValues'
import Form from '@/components/shared/Form'
import Footer from '@/components/shared/Footer'

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
