import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import React from 'react';

function HeroSection1() {
  return (
    <>
      <div
        className="
          w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[900px]
          bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: `url('/images/Poster/MMAHero.png')` }}
      >
        <div className="mt-32 sm:mt-40 md:mt-48 lg:mt-56 xl:mt-64 flex justify-center items-center">
          <Button className='bg-customYellow text-black rounded-full hover:bg-customYellow hover:cursor-pointer font-semibold text-sm md:text-base lg:text-base'>
            Book a free trial
            <MoveRight className='ml-2' />
          </Button>
        </div>
      </div>
    </>
  );
}

export default HeroSection1;
