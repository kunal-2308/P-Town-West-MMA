import Navbar from "../../shared/Navbar";
import HeroSection from "./HeroSection";
import InfoSection from "./InfoSection";
import HeroSection2 from "./HeroSection2";
import Form from "../../shared/Form";
import Footer from "../../shared/Footer";
import { Helmet } from "react-helmet";
function Kids() {
  return (
    <>
      <Helmet>
        <title>P-Town West MMA | Kids Program</title>
        <meta name="description" content="Introduce your child to martial arts with our Kids Program at P-Town West MMA in Pune, Baner. Our fun, beginner-friendly sessions focus on discipline, self-defense, and fitness, fostering confidence and teamwork in young learners." />
        <meta name="keywords" content="Kids martial arts Pune, MMA for kids Baner, self-defense for kids, fitness programs for children Pune, Kids Kickboxing Pune, beginner-friendly martial arts for kids, child development through sports Pune" />
      </Helmet>

      <Navbar />
      <HeroSection />
      <InfoSection />
      <HeroSection2 />
      <Form />
      <Footer />
    </>
  );
}

export default Kids;
