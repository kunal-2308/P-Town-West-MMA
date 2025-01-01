import Navbar from "../../shared/Navbar";
import HeroSection from "./HeroSection";
import InfoSection from "./InfoSection";
import HeroSection2 from "./HeroSection2";
import DataContainer from "./DataContainer";
import Footer from "../../shared/Footer";
import { Helmet } from "react-helmet";
function Nutrition() {
  return (
    <>
      <Helmet>
        <title>P-Town West MMA | Nutrition Program</title>
        <meta name="description" content="Achieve your fitness goals with tailored nutrition plans at P-Town West MMA in Pune, Baner. Our expert-guided programs focus on fueling your body for peak performance, weight management, and overall well-being." />
        <meta name="keywords" content="Nutrition program Pune, fitness nutrition Baner, diet plans for MMA athletes, performance nutrition, healthy eating habits Pune, weight management nutrition, sports dietitian Pune" />
      </Helmet>

      <Navbar />
      <HeroSection />
      <InfoSection />
      <HeroSection2 />
      <DataContainer />
      <Footer />
    </>
  );
}

export default Nutrition;
