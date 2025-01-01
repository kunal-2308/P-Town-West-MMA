import Navbar from "../../shared/Navbar";
import HeroSection1 from "./HeroSection1";
import Footer from "../../shared/Footer";
import { Helmet } from "react-helmet";
function Contact() {
  return (
    <>
      <Helmet>
        <title>P-Town West MMA | Contact Us</title>
        <meta name="description" content="Get in touch with P-Town West MMA in Pune, Baner, for expert training programs in MMA, Muay Thai, kickboxing, boxing, and wrestling. Contact us to learn more or book a free trial class today." />
        <meta name="keywords" content="Contact P-Town West MMA, MMA training inquiries Pune, martial arts gym Baner, MMA contact details Pune, book a free trial class Pune, fitness training Baner" />
      </Helmet>



      <Navbar />
      <HeroSection1 />
      <Footer />
    </>
  );
}

export default Contact;
