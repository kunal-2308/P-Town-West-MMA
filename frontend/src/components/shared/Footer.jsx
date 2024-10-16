import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <>
      <div className="main-footer-container w-full h-auto lg:pl-0 sm:pl-12 sm:p-4 bg-black flex flex-col items-start justify-start -mt-2 pt-10 gap-x-20 z-[999999]">
        <div className="div-img-main-container w-full flex flex-col justify-center items-center md:gap-y-0 gap-y-4">
          <div className="div-sec-a flex justify-center items-center flex-col gap-y-2 md:-mt-16">
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
        <div className=" hidden md:flex justify-between items-start div-section-b-container w-full h-auto  mt-12">
            <div className="div-1-container flex flex-row justify-start items-start">
              <div className="div-a">
                <span className="font-semibold text-white">P-Town West MMA</span>
              </div>
            </div>
            <div className="div-2-container">
            <div className="div-a">
                <span className="font-semibold text-white">P-Town West MMA</span>
              </div>
            </div>
        </div>
        <div className="flex md:hidden div-mobile-footer-address justify-center items-center p-5 md:pl-7 md:pr-7 mt-7">
          <span className="text-white text-center">
            P-Town West MMA, Ground Floor, Vithala Rukmini Mandir, Baner Gaon, Pune, Maharashtra 411045
          </span>
        </div>
        <div className="div-3-1 w-full mt-6 flex flex-row justify-center items-center md:justify-end md:items-end h-auto gap-x-4 md:pr-28">
          <AiFillInstagram className="invert hover:cursor-pointer size-8"></AiFillInstagram>
          <FaFacebook className="invert hover:cursor-pointer size-7"></FaFacebook>
          <FaTwitter className="invert hover:cursor-pointer size-7"></FaTwitter>
          <FaYoutube className="invert hover:cursor-pointer size-7"></FaYoutube>
        </div>
        <div className="contactUs-footer-mobile block md:hidden text-white w-full mt-10 flex-col  justify-center items-center text-center gap-y-3">
          <div className="div">
            <span className="text-2xl font-semibold">Contact Us</span>
          </div>
          <div className="div flex flex-col justify-center items-center text-sm gap-y-2 text-slate-300">
            <span>+917796870291</span>
            <span>+917887549292</span>
            <span>+917767970291</span>
          </div>
        </div>
        <div className="contactUs-footer-mobile block md:hidden text-white w-full mt-10 flex-col  justify-center items-center text-center gap-y-3">
          <div className="div">
            <span className="text-2xl font-semibold">Quick Links</span>
          </div>
          <div className="div flex flex-col justify-center items-center text-sm gap-y-2 text-slate-300 pb-10">
            <span>Home</span>
            <span>Training Programs</span>
            <span>Our Trainers</span>
            <span>About us</span>
            <span>Class Schedule</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
