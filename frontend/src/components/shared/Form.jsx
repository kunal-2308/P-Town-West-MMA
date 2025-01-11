import { useState } from "react";
import { toast } from "sonner";
import { API_URL } from "../../../configure";
import { FaSpinner } from "react-icons/fa";

function Form() {
  let [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  let [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
    };

    try {
      const response = await fetch(`${API_URL}/api/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Email sent successfully!");
        setForm({ name: "", phone: "", email: "" });
      } else {
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error sending emails:", error);
      toast.error("Failed to send email. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="main-container w-full h-auto bg-cover bg-center bg-no-repeat lg:h-[800px]"
        style={{ backgroundImage: `url('/images/Shared/FormBg.png')` }}
      >
        <div className="flex flex-col md:flex-row gap-x-8 p-6 sm:p-8 pl-10 md:pt-16 justify-start items-start">
          <div className="flex justify-start items-start pt-2">
            <span className="text-3xl hidden md:block md:text-5xl text-gray-400 font-semibold">
              {"////"}
            </span>
          </div>
          <div className="w-full max-w-lg md:max-w-md flex flex-col">
            <span className="hidden md:block text-white text-4xl sm:text-5xl md:text-7xl font-medium tracking-wide">
              BOOK A <br />
              FREE TRIAL CLASS
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
                  value={form.name}
                />

                <input
                  type="text"
                  name="phone"
                  className="w-full md:w-[400px] h-[40px] rounded-full mt-7 p-5 font-thin text-black pl-5 placeholder-black placeholder-opacity-60"
                  placeholder="MOBILE NUMBER:"
                  required
                  onChange={handleChange}
                  value={form.phone}
                />

                <input
                  type="email"
                  name="email"
                  className="w-full md:w-[400px] h-[40px] rounded-full mt-7 p-3 font-thin text-black pl-5 placeholder-black placeholder-opacity-60"
                  placeholder="E-MAIL ID:"
                  required
                  onChange={handleChange}
                  value={form.email}
                />

                <button
                  className="w-full md:w-[400px] h-[40px] bg-customYellow mt-7 text-black font-bold rounded-full hover:bg-customYellow hover:cursor-pointer hover:text-black transition-all"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <FaSpinner className="animate-spin mx-auto" />
                  ) : (
                    "SUBMIT"
                  )}
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
