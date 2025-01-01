import { Helmet } from "react-helmet"; // Import Helmet
import Navbar from "../../shared/Navbar";
import HeroSection from "./HeroSection";
import InfoSection from "./InfoSection";
import HeroSection2 from "./HeroSection2";
import HeroSection3 from "./HeroSection3";
import Form from "../../shared/Form";
import HeroSection4 from "./HeroSection4";
import HeroSection5 from "./HeroSection5";
import HeroSection6 from "./HeroSection6";
import Benefit from "./Benefit";
import Footer from "../../shared/Footer";

function Strength() {
  return (
    <>
      <Helmet>
        <title>P-Town West MMA | Strength Program</title>
        <meta
          name="description"
          content="Transform your fitness journey with our Strength Program at P-Town West MMA in Pune, Baner. Focused on muscle building, endurance, and overall physical conditioning, our expert-led sessions are ideal for all fitness levels."
        />
        <meta
          name="keywords"
          content="Strength training Pune, fitness programs Baner, muscle building Pune, endurance training, strength and conditioning Pune, fitness for athletes, MMA fitness training"
        />
      </Helmet>
      <Navbar />
      <HeroSection />
      <InfoSection />
      <HeroSection2 />
      <HeroSection3 />
      <Form />
      <HeroSection4 />
      <HeroSection5 />
      <HeroSection6 />
      <Benefit />
      <Footer />
    </>
  );
}

export default Strength;
