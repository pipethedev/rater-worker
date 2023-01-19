import React, { useState, useContext } from "react";
import InputContainer from "../components/InputContainer";
import PopUpLayout from "../components/PopUpLayout";
import Axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { RaterContext } from "../App";

const Reset = () => {
  let { token } = useParams();
  const navigate = useNavigate();
  const { baseUrl } = useContext(RaterContext);
  const [loading, setloading] = useState(false);
  const [password, setpassword] = useState();
  const [confirmPassowrd, setconfirmPassowrd] = useState();
  const changePassword = async () => {
    setloading(true);
    if (password && confirmPassowrd) {
      await Axios.put(`${baseUrl}api/v1/auth/reset-password/${token}`, {
        password: password,
        password_confirmation: confirmPassowrd,
      })
        .then((res) => {
          // console.log(res.data.message);
          toast.success("Password Reset Successful!");
          setloading(false);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        })
        .catch((err) => {
          console.log(err.response);
          toast.error(err.response.data.message);
          setloading(false);
        });
    } else {
      toast.error("Fill All Field");
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
          labelText="Password"
          type="password"
          onChange={(e) => setpassword(e.target.value)}
        />{" "}
        <div className="w-full h-4"></div>
        <InputContainer
          labelText="Confirm Password"
          type="password"
          onChange={(e) => setconfirmPassowrd(e.target.value)}
        />
        <div className="w-full flex justify-center mt-8">
          <button
            onClick={changePassword}
            disabled={loading}
            className={`w-[280px] h-[56px] rounded-[56px] text-[white] flex justify-center items-center font-semibold ${
              loading ? "bg-[#bdcdf3]" : "bg-[#3B71F7] cursor-pointer"
            }`}
          >
            Reset Password
          </button>{" "}
        </div>
      </PopUpLayout>
    </>
  );
};

export default Reset;
