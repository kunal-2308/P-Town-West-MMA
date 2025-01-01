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

function Jitsu() {
  return (
    <>
      <Helmet>
        <title>P-Town West MMA | Brazilian Jiu-Jitsu</title>
        <meta
          name="description"
          content="Dive into the world of Brazilian Jiu-Jitsu with P-Town West MMA in Pune, Baner. Learn techniques for grappling, submission, and defense from expert instructors. Our training programs cater to both beginners and experienced practitioners."
        />
        <meta
          name="keywords"
          content="Brazilian Jiu-Jitsu Pune, BJJ classes Pune, BJJ training Baner, beginner Brazilian Jiu-Jitsu Pune, advanced BJJ techniques, MMA grappling Pune, self-defense training Pune"
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

export default Jitsu;
