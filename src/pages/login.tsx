import React, { useEffect, useState, useContext } from "react";
import InputContainer from "../components/InputContainer";
import { useNavigate } from "react-router-dom";
import { RaterContext } from "../App";
import Axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const mytoken = localStorage.getItem("token");
  useEffect(() => {
    if (mytoken) {
      navigate("/dashboard/home");
    }
  }, []);
  const [email, setemail] = useState<string>();
  const [password, setpassword] = useState<string>();
  const [loading, setloading] = useState(false);

  const { baseUrl, settoken, token } = useContext(RaterContext);

  const handleLogin = async () => {
    setloading(true);
    if (email && password) {
      await Axios.post(`${baseUrl}api/v1/auth/login`, {
        email: email,
        password: password,
      })
        .then((res) => {
          // console.log(res.data.message);
          // console.log(res.data.data.token);
          settoken(res.data.data.token);
          if (res.data.message) {
          }
          setTimeout(() => {
            navigate("/dashboard/home");
          }, 2000);
          localStorage.setItem("token", res.data.data.token);
          toast.success("Successfully logged in!");
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
          setloading(false);
        });
    } else {
      toast.error("Please fill all the fields.");
      setloading(false);
    }
  };

  return (
    <div
      className="w-screen h-screen flex flex-col items-center gap-8 justify-center absolute top-0 left-0 z-50 py-4"
      style={{
        background:
          "linear-gradient(to bottom, #F5F5F5 0%,#F5F5F5 50%,#3B71F7 50%,#3B71F7 100%)",
      }}
    >
      <Toaster />
      <svg
        width="77"
        height="16"
        viewBox="0 0 77 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.50443 15V8.026L3.32843 5.188H3.54843L4.42843 8.07L6.65043 13.988H10.6544L12.8764 8.07L13.7344 5.188H13.9764L13.8004 8.026V15H17.1004V0.26H12.4584L9.99443 7.146L8.82843 10.93H8.60843L7.42043 7.146L4.84643 0.26H0.204429V15H3.50443ZM22.3211 15V11.106H18.1851V15H22.3211ZM26.6981 15V9.764H28.0181C29.5801 9.764 30.0201 10.314 30.6801 11.59L32.4181 15H36.2681L34.3981 11.304C33.8261 10.182 33.2101 9.412 31.9341 9.016V8.796C34.4641 8.576 35.6521 7.146 35.6521 4.748C35.6521 1.888 33.6941 0.26 30.1741 0.26H23.3981V15H26.6981ZM26.6981 3.23H30.3281C31.8681 3.23 32.3741 3.714 32.3741 5.122C32.3741 6.574 31.8681 7.036 30.3281 7.036H26.6981V3.23ZM39.6315 15.22C41.6775 15.22 42.7995 14.318 43.3935 13.504H43.5255V15H46.5835V8.444C46.5835 5.496 44.8675 3.714 41.6115 3.714C38.4875 3.714 36.4415 5.452 36.4415 8.092V8.334H39.5875V8.092C39.5875 6.97 40.1155 6.596 41.4575 6.596C42.7555 6.596 43.4595 6.838 43.4595 8.136V8.488L39.6755 9.06C37.3875 9.412 36.1555 10.468 36.1555 12.184C36.1555 14.186 37.6735 15.22 39.6315 15.22ZM39.3015 11.92C39.3015 11.458 39.6095 11.238 40.2915 11.128L43.4595 10.644C43.4595 12.36 42.0735 12.712 40.7315 12.712C39.7635 12.712 39.3015 12.514 39.3015 11.92ZM52.8984 15.044C53.6684 15.044 54.5264 14.934 55.0544 14.824V12.074H53.6904C52.2604 12.074 51.9304 11.964 51.9304 10.996V6.662H55.0544V3.934H51.9304V1.36H49.3344L48.7184 3.934H46.8704V6.662H48.6304V11.37C48.6304 13.988 50.0164 15.044 52.8984 15.044ZM60.7687 15.22C63.9367 15.22 65.9607 13.834 65.9607 11.48V11.26H62.7047V11.392C62.7047 12.074 62.1327 12.36 60.8127 12.36C59.0087 12.36 58.3927 11.744 58.3267 10.204H65.9167C65.9827 9.83 66.0707 9.192 66.0707 8.576C66.0707 5.694 64.1127 3.714 60.7907 3.714C57.3367 3.714 55.2247 5.958 55.2247 9.5C55.2247 12.998 56.9627 15.22 60.7687 15.22ZM60.6807 6.42C62.2207 6.42 62.9687 7.058 62.9027 8.202H58.3487C58.4807 7.036 59.0967 6.42 60.6807 6.42ZM70.27 15V8.07C70.27 6.86 70.754 6.508 71.766 6.508C72.8 6.508 73.174 6.882 73.174 8.07V8.664H76.452V7.652C76.452 5.43 75.594 3.714 73.284 3.714C71.722 3.714 70.732 4.594 70.182 5.716H70.05V3.934H66.992V15H70.27Z"
          fill="#3B71F7"
        />
      </svg>
      {loading ? (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
          {" "}
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
        </div>
      ) : null}

      <div className="bg-white w-[455px] h-[600px] rounded-[20px] max-md:w-[350px] max-md:h-[500px] max-sm:w-[300px] max-sm:h-[450px] py-10 px-4 gap-4 flex flex-col relative">
        <div className="text-base text-[#666666] font-medium">
          Welcome to Music Rater
        </div>
        <div className="text-lg text-[#666666] font-medium">
          Enter your password from your email address to log in to your account
        </div>
        <div className="mt-4 space-y-4">
          <InputContainer
            type="email"
            labelText="Email Address"
            onChange={(e) => setemail(e.target.value)}
          />
          <InputContainer
            type="password"
            labelText="Password"
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <div className="absolute bottom-8 left-0 flex justify-center w-full">
          <button
            className={`cursor-pointer font-semibold text-base text-[white] h-[54px] flex items-center justify-center w-[80%] mt-4 max-sm:text-xs bg-[#3B71F7] rounded-[64px] ${
              loading ? "bg-[#bdcdf3]" : "bg-[#3B71F7] cursor-pointer"
            }`}
            onClick={handleLogin}
            disabled={loading}
          >
            Login to Music Rater
          </button>
        </div>
      </div>
      <div className="text-[white] gap-4 flex items-center text-base font-medium">
        <div>FAQs</div>
        <div>Terms & Condition</div>
        <div>Privacy Policy</div>
      </div>
    </div>
  );
};

export default Login;
