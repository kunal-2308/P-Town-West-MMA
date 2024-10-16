import React, { useState } from 'react';

function Form() {
  let [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${form.name}, Phone: ${form.phone}, Email: ${form.email}`);
  };

  return (
    <>
      <div className="main-container w-full h:auto bg-cover bg-center bg-no-repeat lg:h-[800px]" style={{ backgroundImage: `url('/images/Home/Trainings/25.png')` }}>
        <div className="flex flex-col md:flex-row gap-x-8 p-6 sm:p-8 pl-10 md:pt-16 justify-start items-start">
          <div className="flex justify-start items-start pt-2">
            <span className="text-3xl hidden md:block md:text-5xl text-gray-400 font-semibold">////</span>
          </div>
          <div className="w-full max-w-lg md:max-w-md flex flex-col">
            <span className="hidden md:block text-white text-4xl sm:text-5xl md:text-7xl font-medium tracking-wide">
              BOOK A <br />FREE TRIAL CLASS
            </span>
            <span className="block md:hidden text-white text-3xl md:text-7xl font-medium tracking-wide">
              BOOK A FREE <br /> TRIAL CLASS
            </span>


            <div className="mt-2 sm:mt-6">
              <form onSubmit={handleSubmit}>
                
                <input 
                  type="text" 
                  name="name" 
                  className="w-full md:w-[400px] h-[40px] rounded-full mt-7 p-3 font-thin text-black pl-5 placeholder-black placeholder-opacity-60" 
                  placeholder="NAME:" 
                  required 
                  onChange={handleChange}
                />

                <input 
                  type="text" 
                  name="phone" 
                  className="w-full md:w-[400px] h-[40px] rounded-full mt-7 p-5 font-thin text-black pl-5 placeholder-black placeholder-opacity-60"  
                  placeholder="MOBILE NUMBER:" 
                  required 
                  onChange={handleChange}
                />

                <input 
                  type="email" 
                  name="email" 
                  className="w-full md:w-[400px] h-[40px] rounded-full mt-7 p-3 font-thin text-black pl-5 placeholder-black placeholder-opacity-60" 
                  placeholder="E-MAIL ID:" 
                  required 
                  onChange={handleChange}
                />

                <button 
                  className="w-full md:w-[400px] h-[40px] bg-customYellow mt-7 text-black font-bold rounded-full hover:bg-customYellow hover:cursor-pointer hover:text-black transition-all" 
                  type="submit"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
