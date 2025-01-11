import { Helmet } from "react-helmet"; // Ensure Helmet is imported

import Navbar from "../../shared/Navbar";
import HeroSection1 from "./HeroSection1";
import HeroSection2 from "./HeroSection2";
import HeroSection3 from "./HeroSection3";
import InfoSection from "./InfoSection";
import Form from "../../shared/Form";
import BenefitSection from "./BenefitSection";
import BenefitInfo from "./BenefitInfo";
import Footer from "../../shared/Footer";

function Muay() {
  return (
    <>
      <Helmet>
        <title>P-Town West MMA | Muay Thai</title>
        <meta
          name="description"
          content="Explore the art of Muay Thai with P-Town West MMA in Pune, Baner. Learn striking techniques, improve fitness, and develop self-defense skills with expert-led classes for all skill levels."
        />
        <meta
          name="keywords"
          content="Muay Thai Pune, Muay Thai classes Baner, kickboxing Pune, Muay Thai training Pune, striking techniques, beginner Muay Thai Pune, advanced Muay Thai classes, self-defense training Pune"
        />
      </Helmet>
      <Navbar />
      <HeroSection1 />
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

export default Muay;
