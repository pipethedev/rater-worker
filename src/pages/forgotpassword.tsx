import React, { useState, useContext } from "react";
import InputContainer from "../components/InputContainer";
import PopUpLayout from "../components/PopUpLayout";
import Axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { RaterContext } from "../App";

const Forgotpassword = () => {
  const [email, setemail] = useState();
  const [loading, setloading] = useState(false);

  const { baseUrl } = useContext(RaterContext);
  const forgotPassword = async () => {
    setloading(true);
    if (email) {
      await Axios.post(`${baseUrl}api/v1/auth/forgot-password`, {
        email: email,
      })
        .then((res) => {
          // console.log(res.data.message);
          toast.success("Check email for the link!");
          setloading(false);
        })
        .catch((err) => {
          console.log(err.response);
          toast.error(err.response.data.message);
          setloading(false);
        });
    } else {
      toast.error("Fill Email Field");
      setloading(false);
    }
  };
  return (
    <>
      <Toaster position="top-left" reverseOrder={true} />
      <PopUpLayout>
        {loading && (
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
            {" "}
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
          </div>
        )}
        <div className="mb-4 text-base font-semibold text-[#888888] text-center">
          Enter your email and we will send a link to help you get back to your
          account!
        </div>
        <InputContainer
          labelText="Email Address"
          type="email"
          onChange={(e) => setemail(e.target.value)}
        />
        <div className="w-full flex justify-center mt-8">
          <button
            onClick={forgotPassword}
            disabled={loading}
            className={`w-[250px] h-[56px] rounded-[56px] text-[white] flex justify-center items-center font-semibold ${
              loading ? "bg-[#bdcdf3]" : "bg-[#3B71F7] cursor-pointer"
            }`}
          >
            Send Link
          </button>{" "}
        </div>
      </PopUpLayout>
    </>
  );
};

export default Forgotpassword;
