import Navbar from "../../shared/Navbar";
import React from "react";
import HeroSection from "./HeroSection";
import HeroSection2 from "./HeroSection2";
import HeroSection3 from "./HeroSection3";
import InfoSection from "./InfoSection";
import Form from "../../shared/Form";
import BenefitSection from "./BenefitSection";
import BenefitInfo from "./BenefitInfo";
import Footer from "../../shared/Footer";

function KickBoxing() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HeroSection2 />
      <HeroSection3 />
      <InfoSection />
      <Form />
      <BenefitSection />
      <BenefitInfo />
      <Footer />
    </>
  );
}

export default KickBoxing;
