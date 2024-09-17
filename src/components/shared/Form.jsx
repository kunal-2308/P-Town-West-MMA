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
      <div className="main-container w-full h-auto bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('public/images/Home/Trainings/25.png')` }}>
        <div className="flex flex-col md:flex-row gap-x-4 p-6 sm:p-8 md:pl-28 md:pt-16 justify-start items-start">
          
          {/* Heading Section */}
          <div className="flex justify-start items-start pt-2">
            <span className="text-3xl sm:text-4xl md:text-5xl text-gray-400 font-semibold">////</span>
          </div>
          
          {/* Form Section */}
          <div className="w-full max-w-lg md:max-w-md flex flex-col">
            <span className="text-white text-4xl sm:text-5xl md:text-7xl font-medium tracking-wide">
              BOOK A <br />FREE TRIAL CLASS
            </span>

            {/* Form */}
            <div className="mt-10 sm:mt-12">
              <form onSubmit={handleSubmit}>
                
                <input 
                  type="text" 
                  name="name" 
                  className="w-full md:w-[400px] h-[40px] rounded-full mt-7 p-3 font-extralight text-black pl-5" 
                  placeholder="NAME:" 
                  required 
                  onChange={handleChange}
                />

                <input 
                  type="text" 
                  name="phone" 
                  className="w-full md:w-[400px] h-[40px] rounded-full mt-7 p-3 font-extralight text-black pl-5"  
                  placeholder="MOBILE NUMBER:" 
                  required 
                  onChange={handleChange}
                />

                <input 
                  type="email" 
                  name="email" 
                  className="w-full md:w-[400px] h-[40px] rounded-full mt-7 p-3 font-extralight text-black pl-5" 
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
