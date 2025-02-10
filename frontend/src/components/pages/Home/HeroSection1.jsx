import { Button } from "../../ui/button";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

function HeroSection1() {
  return (
    <div className="relative w-[100%] h-[230px] sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[900px] flex justify-center items-center overflow-x-hidden lg:mt-10 md:mt-0 mt-0">
      <img
        src="/images/Home/Hero.png"
        alt="Hero Section"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="z-10 hidden md:flex md:flex-col md:pt-[380px] lg:pt-[430px] justify-center items-center h-full gap-y-5">
        <div className="div-title">
          <span className="text-7xl text-white font-semibold">P-TOWN WEST MMA</span>
        </div>
        <div className="div-2">
          <Link to="/guest/dashboard">
            <Button className=" bg-customYellow text-black rounded-full hover:bg-customYellow hover:cursor-pointer font-semibold text-sm md:text-base lg:text-base flex items-center h-auto w-auto">
              Book a free trial
              <MoveRight className="ml-2" />
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default HeroSection1;
