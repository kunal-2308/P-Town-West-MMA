import { Helmet } from "react-helmet"; // Ensure Helmet is imported

import Navbar from "../../shared/Navbar";
import HeroSection1 from "./HeroSection1";
import HeroSection2 from "./HeroSection2";
import PoppperContainer from "./PoppperContainer";
import TrainingPrograms from "./TrainingPrograms";
import Reviews from "./Reviews";
import VideoSection from "./VideoSection";
import InfoSection from "./InfoSection";
import Trainers from "./Trainers";
import MmaClub from "./MmaClub";
import Form from "../../shared/Form";
import Footer from "../../shared/Footer";
import Unstop from "./Unstop";

function Home() {
  return (
    <>
      <Helmet>
        <title>P-Town West MMA</title>
        <meta
          name="description"
          content="P-Town West MMA in Pune, Baner, is the ultimate destination to master MMA, Muay Thai, kickboxing, boxing, and wrestling. Our expert trainers provide programs tailored for beginners and advanced practitioners, ensuring personalized attention in a supportive community."
        />
        <meta
          name="keywords"
          content="MMA training Pune, Muay Thai Pune, Kickboxing Pune, Boxing Pune, Wrestling Pune, beginner-friendly MMA, expert MMA coaching Baner, combat sports Pune, martial arts Pune"
        />
      </Helmet>
      <div className="overflow-hidden">
        <Navbar />
        <div className="block md:hidden">
          <HeroSection2 />
          <HeroSection1 />
        </div>
        <div className="hidden md:block">
          <HeroSection1 />
          <HeroSection2 />
        </div>
        <PoppperContainer />
        <TrainingPrograms />
        <Reviews />
        <VideoSection />
        <InfoSection />
        <div className="div hidden md:block">
          <Trainers />
        </div>
        <MmaClub />
        <Form />
        <Unstop />
        <Footer />
      </div>
    </>
  );
}

export default Home;
