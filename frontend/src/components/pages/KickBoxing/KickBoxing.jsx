import { Helmet } from "react-helmet"; // Ensure Helmet is imported
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
      <Helmet>
        <title>P-Town West MMA | Kickboxing</title>
        <meta
          name="description"
          content="Refine your kickboxing skills at P-Town West MMA in Pune, Baner. Our programs focus on strength, agility, and striking techniques, designed for fitness enthusiasts, beginners, and professional athletes alike."
        />
        <meta
          name="keywords"
          content="Kickboxing classes Pune, Kickboxing training Baner, Kickboxing for beginners Pune, advanced Kickboxing techniques, MMA Kickboxing Pune, combat fitness Pune, striking techniques training"
        />
      </Helmet>
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
