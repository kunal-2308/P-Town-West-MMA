import Navbar from "../../shared/Navbar";
import Container from "./Container";
import Footer from "../../shared/Footer";
import { Helmet } from "react-helmet";
function Trainer() {
  return (
    <>
      <Helmet>
        <title>P-Town West MMA | Our Trainers</title>
        <meta name="description" content="Meet the team of expert trainers at P-Town West MMA in Pune, Baner. With years of professional experience in MMA, Muay Thai, boxing, and wrestling, our coaches are dedicated to helping you achieve your martial arts and fitness goals." />
        <meta name="keywords" content="MMA trainers Pune, expert martial arts coaching Baner, professional MMA coaches Pune, Muay Thai trainers Pune, Boxing coaches Baner, Wrestling trainers Pune, experienced combat sports coaches Pune" />
      </Helmet>

      <Navbar />
      <Container />
      <Footer />
    </>
  );
}

export default Trainer;
