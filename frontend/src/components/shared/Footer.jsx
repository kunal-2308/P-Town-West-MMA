import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="main-footer-container w-full h-auto lg:pl-0 sm:pl-12 sm:p-4 bg-black flex flex-col items-start justify-start -mt-2 pt-10 gap-x-20 z-[999999]">
        <div className="div-img-main-container w-full flex flex-col justify-center items-center md:gap-y-0 gap-y-4">
          <div className="div-sec-a flex justify-center items-center flex-col gap-y-2">
            <img
              src="/images/logo/mainLogo.png"
              alt="footer image"
              className="invert h-[120px] md:h-[120px] lg:h-[120px] object-contain pr-5 md:pr-0 items-center"
            />
          </div>
          <span className="text-white md:hidden text-center text-2xl pt-5  md:pl-4 font-semibold md:font-semibold md:text-lg">
            P-Town West MMA
          </span>
        </div>

        {/* For Desktop */}
        <div className=" hidden md:flex justify-between items-start div-section-b-container w-full h-auto  mt-12 text-white pl-20 pr-20 pb-10">
          <div className="div-1-container flex flex-col justify-start items-start gap-y-5">
            <div className="div-a">
              <span className="font-semibold ">P-Town West MMA</span>
            </div>
            <div className="div-b w-[60%]">
              <a
                href="https://maps.app.goo.gl/qaAATNaYECv89qj37"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                P-Town West MMA, Ground Floor, Vithala Rukmini Mandir, Baner Gaon, Pune, Maharashtra 411045
              </a>
            </div>
           <div className="div-c text-white flex flex-row w-[60%] justify-start items-center invert gap-x-4">
              <a href="https://www.instagram.com/ptown.west.mma/?hl=en"><AiFillInstagram className="invert hover:cursor-pointer size-9"></AiFillInstagram></a>
              <a href="https://www.facebook.com/UFC.HEALTH.HEAVEN/"><FaFacebookSquare className="invert hover:cursor-pointer size-8"></FaFacebookSquare></a>
              <a href="https://www.youtube.com/channel/UClDttBJMHABxojtVyFSmyIg"><FaYoutube className="invert hover:cursor-pointer size-9"></FaYoutube></a>
            </div>
          </div>
          <div className="div-2-container w-[25%] flex flex-row justify-stat items-start gap-x-10">
            <div className="div-a flex flex-col gap-y-3">
              <div className="div-title">
                <span className="font-semibold text-white text-lg">Quick Links</span>
              </div>
              <div className="div flex flex-col text-sm gap-y-1 text-gray-400">
                <Link to="/"><span>Home</span></Link>
                <Link to="/trainer"><span>Our Trainers</span></Link>
                <Link to="/about"><span>About Us</span></Link>
                <Link to="/class/schedule"><span>Class Schedule</span></Link>
              </div>
            </div>
            <div className="div-a flex flex-col gap-y-3">
              <div className="div-title">
                <span className="font-semibold text-white text-lg">Contact Us</span>
              </div>
              <div className="div flex flex-col text-sm gap-y-1 text-gray-400">
                <span>+917796870291</span>
                <span>+917887549292</span>
                <span>+917767970291</span>
              </div>
            </div>
          </div>
        </div>

        {/* For Mobile */}
        <div className="flex md:hidden div-mobile-footer-address justify-center items-center pl-20 pr-20 md:pl-7 md:pr-7 mt-7">
          <a
            href="https://maps.app.goo.gl/qaAATNaYECv89qj37"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-center hover:underline"
          >
            P-Town West MMA, Ground Floor, Vithala Rukmini Mandir, Baner Gaon, Pune, Maharashtra 411045
          </a>
        </div>
        <div className="div-3-1 flex md:hidden w-full mt-6 flex-row justify-center items-center md:justify-end md:items-end h-auto gap-x-4 md:pr-28">
          <AiFillInstagram className="invert hover:cursor-pointer size-8"></AiFillInstagram>
          <FaFacebookSquare className="invert hover:cursor-pointer size-7"></FaFacebookSquare>
          <FaYoutube className="invert hover:cursor-pointer size-7"></FaYoutube>
        </div>
        <div className="contactUs-footer-mobile block md:hidden text-white w-full mt-10 flex-col justify-center items-center text-center gap-y-3">
          <div className="div">
            <span className="text-2xl font-semibold">Contact Us</span>
          </div>
          <div className="div flex flex-col justify-center items-center text-sm gap-y-2 text-slate-300">
            <span>+917796870291</span>
            <span>+917887549292</span>
            <span>+917767970291</span>
          </div>
        </div>
        <div className="contactUs-footer-mobile block md:hidden text-white w-full mt-10 flex-col justify-center items-center text-center gap-y-3">
          <div className="div">
            <span className="text-2xl font-semibold">Quick Links</span>
          </div>
          <div className="div flex flex-col justify-center items-center text-sm gap-y-2 text-slate-300 pb-10">
            <span>Home</span>
            <span>Training Programs</span>
            <span>Our Trainers</span>
            <span>About Us</span>
            <span>Class Schedule</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
