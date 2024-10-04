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
      <Navbar />
      <HeroSection1 />
      <HeroSection2 />
      <HeroSection3 />
      {/* DO RESPONSVE */}
      <InfoSection />
      <Form />
      <BenefitSection />
      <BenefitInfo />
      <Footer />
    </>
  );
}

export default Jitsu;
