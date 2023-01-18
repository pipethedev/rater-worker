import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import InputContainer from "../../components/InputContainer";
import microphone from "../../assets/microphone.svg";
import Axios from "axios";
import { RaterContext } from "../../App";
import { Toaster, toast } from "react-hot-toast";

const Settings = () => {
  const navigate = useNavigate();
  const image =
    "data:image/png;base64,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";

  const { baseUrl, user } = useContext(RaterContext);
  const [side, setside] = useState("edit");
  const [loader, setloader] = useState(false);

  useEffect(() => {
    if (mytoken == null) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, []);

  function getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }
  const [firstName, setfirstName] = useState();
  const [lastName, setlastName] = useState();
  const [email, setemail] = useState();
  const [oldPass, setoldPass] = useState();
  const [newPass, setnewPass] = useState();
  const [newPassConfirm, setnewPassConfirm] = useState();

  // console.log(user);
  useEffect(() => {
    setTimeout(() => {
      setemail(user.email);
      setfirstName(user.first_name);
      setlastName(user.last_name);
    }, 100);
  }, [user]);

  const mytoken = localStorage.getItem("token");
  const handleEdit = async () => {
    setloader(true);
    if (firstName && lastName && email) {
      await Axios.put(
        `${baseUrl}api/v1/user/profile`,
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone_number: "",
        },
        {
          headers: {
            Authorization: `Bearer ${mytoken}`,
          },
        }
      )
        .then((res) => {
          // console.log(res);
          setloader(false);
          toast.success("Successfully Updated Profile!");
        })

        .catch((err) => {
          console.log(err);
          setloader(false);
          toast.error("Unable to update profile!");
        });
    } else {
      setloader(false);
      toast.error("Please fill all fields!");
    }
  };
  const changePassword = async () => {
    if (mytoken == null) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
    if (oldPass && newPass && newPassConfirm) {
      setloader(true);
      await Axios.put(
        `${baseUrl}api/v1/user/profile/change-password`,
        {
          old_password: oldPass,
          password: newPass,
          password_confirmation: newPassConfirm,
        },
        {
          headers: {
            Authorization: `Bearer ${mytoken}`,
          },
        }
      )
        .then((res) => {
          setloader(false);
          // console.log(res);
          toast.success("Password Updated Successfully");
        })

        .catch((err) => {
          setloader(false);
          console.log(err);
          toast.error(err.response.data.message);
        });
    } else {
      setloader(false);
      toast.error("Please fill all fields");
    }
  };
  if (user) {
    return (
      <div>
        <DashboardLayout>
          <Toaster position="top-left" reverseOrder={false} />
          <div className="w-full">
            {" "}
            <div className="w-full flex justify-between items-center h-[58px] mb-6">
              <div className="flex flex-col justify-between h-full">
                <div className="text-[28px] font-semibold text-[black] px-3">
                  Settings
                </div>
                <div className="text-[#888888] font-medium text-sm px-3">
                  Edit your profile information
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center border-t-[1px] border-b-[1px] border-[#e0dcdc] py-4 w-full">
              <div
                onClick={() => navigate("/dashboard/home")}
                className="cursor-pointer text-sm font-medium text-[#888888]"
              >
                Dashboard
              </div>
              <svg
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.25 8.5L4.75 5L1.25 1.5"
                  stroke="#FFC94C"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div className="cursor-pointer text-sm font-semibold text-[#3B71F7]">
                Settings
              </div>
            </div>
            {side == "edit" ? (
              <div className="flex gap-6 mt-6">
                <div className="w-[110px] flex flex-col gap-3">
                  <div className="rounded-[48px] bg-[#f5f8ff] py-[10px] w-full text-[#3b71f7] font-semibold text-sm text-center">
                    Edit Profile
                  </div>
                  <div className="w-full h-1 bg-[#3B71F7]"></div>
                </div>
                <div
                  className="text-[#777777] text-sm font-medium mt-2 cursor-pointer"
                  onClick={() => setside("password")}
                >
                  Change Password
                </div>
              </div>
            ) : (
              <div className="flex gap-6 mt-6">
                <div
                  className="text-[#777777] text-sm font-medium mt-2 cursor-pointer"
                  onClick={() => setside("edit")}
                >
                  Edit Profile
                </div>
                <div className="w-[179px] flex flex-col gap-3">
                  <div className="rounded-[48px] bg-[#f5f8ff] py-[10px] w-full text-[#3b71f7] font-semibold text-sm text-center">
                    Change Password
                  </div>
                  <div className="w-full h-1 bg-[#3B71F7]"></div>
                </div>
              </div>
            )}
            {side == "edit" ? (
              <section className="w-full flex-wrap flex mt-8 h-[447px] max-md:h-[330px] max-md:gap-4">
                <div className="w-[30%] max-md:w-full flex justify-center">
                  <img
                    src={microphone}
                    alt=""
                    className="w-full h-full rounded-2xl object-cover max-md:w-[60%] bg-[#3B71F7]"
                  />
                </div>
                <div className="w-[70%] flex flex-wrap justify-center max-md:w-full max-md:gap-10 relative">
                  <div className="w-full max-md:w-[90%] flex flex-col gap-8 max-md:gap-4">
                    {" "}
                    {loader ? (
                      <div className="w-full h-full flex justify-center items-full">
                        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
                          {" "}
                          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
                        </div>
                        <br />
                      </div>
                    ) : null}
                    <div className="w-full flex gap-4 pl-4 max-md:flex-wrap ">
                      {" "}
                      <InputContainer
                        labelText="Firstname"
                        type="text"
                        onChange={(e) => setfirstName(e.target.value)}
                        value={firstName}
                      />
                      <InputContainer
                        labelText="Lastname"
                        type="text"
                        value={lastName}
                        onChange={(e) => setlastName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2 pl-4">
                      <div className="w-full mt-6">
                        <InputContainer
                          type="email"
                          labelText="Email Address"
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full pl-4 max-md:pl-8">
                    <button
                      className={`w-[190px] h-[54px] rounded-[64px] flex justify-center items-center text-[white] font-semibold text-base cursor-pointer ${
                        loader ? "bg-[#c9d0e2] h-[56px]" : "bg-[#3b71f7] "
                      }`}
                      onClick={handleEdit}
                      disabled={loader}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </section>
            ) : (
              <section className="w-full mt-8 flex flex-col gap-8 relative">
                {loader ? (
                  <div className="w-full h-full flex justify-center items-full">
                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
                      {" "}
                      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
                    </div>
                    <br />
                  </div>
                ) : null}
                <div className="w-full flex justify-between items-center h-[58px] mb-6">
                  <div className="flex flex-col justify-between h-full">
                    <div className="text-[28px] font-semibold text-[black] px-3">
                      Change Password
                    </div>
                    <div className="text-[#888888] font-medium text-sm px-3">
                      Enter a strong password you will remember
                    </div>
                  </div>
                </div>
                <div className="w-full mt-4 space-y-4">
                  <InputContainer
                    labelText="Current Password"
                    type="password"
                    onChange={(e) => setoldPass(e.target.value)}
                  />
                  <InputContainer
                    labelText="New Password"
                    type="password"
                    onChange={(e) => setnewPass(e.target.value)}
                  />
                  <InputContainer
                    labelText="Confirm Password"
                    type="password"
                    onChange={(e) => setnewPassConfirm(e.target.value)}
                  />
                </div>
                <div className="w-full mt-4">
                  <button
                    className="w-[190px] h-[54px] rounded-[64px] bg-[#3b71f7] flex justify-center items-center text-[white] font-semibold text-base cursor-pointer"
                    onClick={changePassword}
                    disabled={loader}
                  >
                    Save New Password
                  </button>
                </div>
              </section>
            )}
          </div>
        </DashboardLayout>
      </div>
    );
  } else {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
          {" "}
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
        </div>
        <br />
      </div>
    );
  }
};

export default Settings;
