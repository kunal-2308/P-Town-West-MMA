import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

function Footer() {
  return (
    <>
      <div className="main-footer-container w-full h-auto lg:pl-28 sm:pl-12 sm:p-4 bg-black flex flex-col items-start justify-start sm:pt-5 gap-x-20">
        <div className="div-img-main-container w-full flex flex-row justify-start items-start">
          <div className="div-sec-a flex justify-start items-start flex-col gap-y-2">
            <img
              src="/images/logo/mainLogo.png"
              alt="footer image"
              className="invert h-[50px] sm:h-[60px] md:h-[80px] lg:h-[100px] object-contain"
            />
            <span className="text-white  text-sm sm:font-bold md:text-lg">
              P-Town West MMA
            </span>
          </div>
        </div>
        {/* <div className="div-1-container flex flex-row justify-start items-start gap-y-4 md:gap-y-9 md:mt-6">
                    <div className="div-sec-b w-[100%] text-white flex flex-col gap-y-2">
                        <span className='text-lg font-semibold'>Office Address</span>
                        <span className='text-sm  text-gray-400 font-medium'>Ground Floor, Vithala Rukmini Mandir, <br />
                            Baner Gaon, Pune, Maharashtra 411045
                        </span>
                    </div>
                    <div className="div-sec-c w-[100%] text-white flex flex-col gap-y-2">
                        <span className='text-lg font-semibold'>Registered Address</span>
                        <span className='text-sm text-gray-400 font-medium'>Ground Floor, Vithala Rukmini Mandir, <br />
                            Baner Gaon, Pune, Maharashtra 411045
                        </span>
                    </div>
                    <div className="div-sec-c flex flex-row gap-x-9 justify-center items-center">
                        <div className="div-a flex flex-col gap-y-1">
                            <span className='text-white font-bold text-lg'>GST NO.</span>
                            <span className='text-gray-400'>27AADCO8904F1ZE</span>
                        </div>
                        <div className="div-a flex flex-col gap-y-1">
                            <span className='text-white font-bold text-lg'>IEC Code</span>
                            <span className='text-gray-400'>AADCO8904F</span>
                        </div>
                    </div>

                    <div className="div-1 text-white flex flex-col justify-center items-center gap-y-3 w-[60%]">
                        <span className='text-white text-lg font-semibold'>Our Offices</span>
                        <div className="div-grid grid grid-cols-2 gap-x-10 justify-center items-center text-gray-400 font-medium text-sm">
                            <span>Pune</span>
                            <span>Mumbai</span>
                            <span>Delhi</span>
                            <span>Chennai</span>
                            <span>Hyderabad</span>
                            <span>Ghaziabad</span>
                        </div>
                    </div>
                </div> */}

        <div className="div-section-b-container w-full h-auto flex flex-row items-center justify-start gap-x-20 mt-12">
          <div className="div-sec-b w-auto text-white flex flex-col gap-y-2">
            <span className="text-lg font-semibold">Office Address</span>
            <span className="text-sm  text-gray-400 font-medium">
              Ground Floor, Vithala Rukmini Mandir, <br />
              Baner Gaon, Pune, Maharashtra 411045
            </span>
          </div>
          <div className="div-sec-c w-auto text-white flex flex-col gap-y-2">
            <span className="text-lg font-semibold">Registered Address</span>
            <span className="text-sm text-gray-400 font-medium">
              Ground Floor, Vithala Rukmini Mandir, <br />
              Baner Gaon, Pune, Maharashtra 411045
            </span>
          </div>
          <div className="div-sec-c flex flex-row gap-x-9 justify-center items-center">
            <div className="div-a flex flex-col gap-y-1">
              <span className="text-white font-bold text-lg">GST NO.</span>
              <span className="text-gray-400">27AADCO8904F1ZE</span>
            </div>
            <div className="div-a flex flex-col gap-y-1">
              <span className="text-white font-bold text-lg">IEC Code</span>
              <span className="text-gray-400">AADCO8904F</span>
            </div>
          </div>
          <div className="div-sec-c flex flex-col gap-y-1 justify-start items-start">
            <span className="text-white text-lg font-semibold">
              Our Offices
            </span>
            <div className="div-grid grid grid-cols-2 gap-x-10 justify-center items-center text-gray-400 font-medium text-sm">
              <span>Pune</span>
              <span>Mumbai</span>
            </div>
          </div>
        </div>
        <div className="div-3-1 w-full mt-6 flex flex-row justify-end items-end h-auto gap-x-4 pr-28">
          <Instagram className="invert hover:cursor-pointer"></Instagram>
          <Facebook className="invert hover:cursor-pointer"></Facebook>
          <Twitter className="invert hover:cursor-pointer"></Twitter>
          <Youtube className="invert hover:cursor-pointer"></Youtube>
        </div>
      </div>
    </>
  );
}

export default Footer;
