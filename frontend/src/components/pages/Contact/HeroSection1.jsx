import React, { useState, useRef } from 'react'
import { toast } from "sonner"
import Form from '../../shared/Form';
function HeroSection1() {
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
    let phone = '7796870291 / 7887549292';


    let copyItem = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(phone);
        toast.success("Copied Successfully");
    }


    return (
        <>
            <div className="relative pt-10 hidden md:block">
                <img
                    src="/images/contact/1.png"
                    alt="image"
                    className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center text-center p-40">
                    <div className="div-1 flex flex-col gap-y-10 w-auto h-auto pt-8">
                        <div className="div-a flex flex-col justify-start items-start w-[70%] gap-y-7">
                            <span className='text-5xl text-customYellow font-medium'>Get in Touch</span>
                            <span className='text-white text-start text-sm font-medium'>We're here to help you on your fitness journey, whether you're interested in joining one of our programs, have questions about our services, or need more information. Our dedicated team is ready to assist you with any inquiries you may have.</span>
                        </div>
                        <div className="div-b flex flex-col justify-start items-start w-[60%] gap-y-3">
                            <span className='text-customYellow text-3xl font-medium'>Visit Us</span>
                            <span className='text-white text-start text-xs font-medium'>Ground Floor, Vithala Rukmini Mandir,<br /> Baner Gaon, Pune, Maharashtra 411045</span>
                        </div>
                        <div className="div flex flex-col justify-start items-start gap-y-2">
                            <div className="div-1 flex justify-center items-center gap-x-4 hover:cursor-pointer" onClick={copyItem}>
                                <img src="/images/contact/phone.png" alt="" className='h-5' />
                                <span className='text-white text-sm'>{phone}</span>
                            </div>
                            <div className="div-1 flex justify-center items-center gap-x-4">
                                <img src="/images/contact/mail.png" alt="" className='h-5' />
                                <span className='text-white text-sm hover:cursor-pointer' onClick={() => window.location = 'mailto:PTOWNWESTMMA@GMAIL.COM'}>PTOWNWESTMMA@GMAIL.COM</span>
                            </div>
                        </div>
                    </div>
                    <div className="div-2-form">
                        <div className="flex flex-col md:flex-row gap-x-8 p-6 sm:p-8 md:pl-28 md:pt-16 justify-start items-start">

                            {/* Heading Section */}
                            <div className="flex justify-start items-start pt-2">
                                <span className="text-3xl sm:text-4xl md:text-5xl text-gray-400 font-semibold">////</span>
                            </div>

                            {/* Form Section */}
                            <div className="w-full max-w-lg md:max-w-md flex flex-col">
                                <span className="text-white text-4xl sm:text-5xl md:text-6xl font-medium tracking-wide text-start">
                                    BOOK A FREE TRIAL CLASS
                                </span>

                                {/* Form */}
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
                </div>
            </div>
            <div className="div-mobile flex flex-col w-screen md:hidden relative">
                <div className="main-container mt-12 relative">
                    <img
                        src="/images/contact/1.png"
                        alt="image"
                        className="w-screen h-[250px] object-cover"
                    />
                    <div className="div-text-section absolute bottom-4 left-4 flex flex-col">
                        <span className="text-customYellow text-2xl font-light pl-1">Feel Free to</span>
                        <span className="text-customYellow text-3xl font-medium">Connect With Us</span>
                    </div>
                </div>
                <div className="div-content-section w-screen flex flex-col justify-start items-start gap-y-4 bg-black text-white p-6">
                    <span className='text-customYellow text-3xl font-medium'>Get in Touch</span>
                    <span className='text-white text-sm font-light'>We're here to help you on your fitness journey, whether you're interested in joining one of our programs, have questions about our services, or need more information. Our dedicated team is ready to assist you with any inquiries you may have.</span>
                </div>
                <div className="contact-section w-screen flex flex-col justify-start items-start gap-y-4 bg-black text-white p-6">
                    <span className='text-customYellow text-3xl font-medium'>Visit Us</span>
                    <span className='text-white text-sm font-medium pr-3'>Ground Floor, Vithala Rukmini Mandir, Baner Gaon, Pune, Maharashtra 411045</span>
                </div>
                <div className="div-email-section w-screen flex flex-col justify-start items-start gap-y-4 bg-black text-white p-6">
                    <div className="div-1 flex justify-center items-center gap-x-4 hover:cursor-pointer" onClick={copyItem}>
                        <img src="/images/contact/phone.png" alt="" className='h-5' />
                        <span className='text-white text-sm'>{phone}</span>
                    </div>
                    <div className="div-1 flex justify-center items-center gap-x-4">
                        <img src="/images/contact/mail.png" alt="" className='h-5' />
                        <span className='text-white text-sm hover:cursor-pointer' onClick={() => window.location = 'mailto:PTOWNWESTMMA@GMAIL.COM'}>PTOWNWESTMMA@GMAIL.COM</span>
                    </div>
                </div>
                <div className="div-form-section">
                    <Form />
                </div>
            </div>

        </>
    )
}

export default HeroSection1
