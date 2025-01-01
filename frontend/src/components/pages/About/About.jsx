import Navbar from "../../shared/Navbar";
import HeroSection from "./HeroSection";
import CoreValues from "./CoreValues";
import Form from "../../shared/Form";
import Footer from "../../shared/Footer";
import { Helmet } from "react-helmet";
function About() {
  return (
    <>
      <Helmet>
        <title>P-Town West MMA | About Us</title>
        <meta name="description" content="Discover P-Town West MMA, Pune's premier martial arts training center in Baner. We specialize in MMA, Muay Thai, kickboxing, boxing, wrestling, and fitness, providing expert coaching for all skill levels in a supportive community." />
        <meta name="keywords" content="About P-Town West MMA, martial arts training Pune, MMA center Baner, MMA community Pune, combat sports training, fitness programs Baner, martial arts gym Pune" />
      </Helmet>

      <Navbar />
      <HeroSection />
      <CoreValues />
      <Form />
      <Footer />
    </>
  );
}

export default About;
