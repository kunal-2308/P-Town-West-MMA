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
