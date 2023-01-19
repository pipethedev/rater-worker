import React, { useEffect } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { IoMdMusicalNote } from "react-icons/io";
import { AiOutlineDollar } from "react-icons/ai";
import { MdOutlineMessage } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi";
import { BiCog } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { ImSoundcloud } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { TfiWorld } from "react-icons/tfi";

const Navbar = (props) => {
  const navigate = useNavigate();
  const navLinks = [
    {
      name: "home",
      svg: () => {
        return <IoHomeOutline />;
      },
    },
    {
      name: "explore",
      svg: () => {
        return <TfiWorld />;
      },
    },
    {
      name: "library",
      svg: () => {
        return <IoMdMusicalNote />;
      },
    },

    {
      name: "settings",
      svg: () => {
        return <BiCog />;
      },
    },
  ];

  const logout = async () => {
    await axios
      .post("https://rater-be.herokuapp.com/api/v1/auth/logout")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    localStorage.clear();
    navigate("/");
  };
  return (
    <div
      className="w-[280px] h-screen max-md:hidden fixed border-r border-[#E2EAFE] py-12 bg-[white] transition duration-150 ease-in-out"
      ref={props.navRef}
    >
      <div className="flex justify-between items-center px-6 mb-8">
        <svg
          width="70"
          height="15"
          viewBox="0 0 70 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.14039 14V7.66L2.98039 5.08H3.18039L3.98039 7.7L6.00039 13.08H9.64039L11.6604 7.7L12.4404 5.08H12.6604L12.5004 7.66V14H15.5004V0.6H11.2804L9.04039 6.86L7.98039 10.3H7.78039L6.70039 6.86L4.36039 0.6H0.14039V14H3.14039ZM20.2465 14V10.46H16.4865V14H20.2465ZM24.2255 14V9.24H25.4255C26.8455 9.24 27.2455 9.74 27.8455 10.9L29.4255 14H32.9255L31.2255 10.64C30.7055 9.62 30.1455 8.92 28.9855 8.56V8.36C31.2855 8.16 32.3655 6.86 32.3655 4.68C32.3655 2.08 30.5855 0.6 27.3855 0.6H21.2255V14H24.2255ZM24.2255 3.3H27.5255C28.9255 3.3 29.3855 3.74 29.3855 5.02C29.3855 6.34 28.9255 6.76 27.5255 6.76H24.2255V3.3ZM35.9832 14.2C37.8432 14.2 38.8632 13.38 39.4032 12.64H39.5232V14H42.3032V8.04C42.3032 5.36 40.7432 3.74 37.7832 3.74C34.9432 3.74 33.0832 5.32 33.0832 7.72V7.94H35.9432V7.72C35.9432 6.7 36.4232 6.36 37.6432 6.36C38.8232 6.36 39.4632 6.58 39.4632 7.76V8.08L36.0232 8.6C33.9432 8.92 32.8232 9.88 32.8232 11.44C32.8232 13.26 34.2032 14.2 35.9832 14.2ZM35.6832 11.2C35.6832 10.78 35.9632 10.58 36.5832 10.48L39.4632 10.04C39.4632 11.6 38.2032 11.92 36.9832 11.92C36.1032 11.92 35.6832 11.74 35.6832 11.2ZM48.044 14.04C48.744 14.04 49.524 13.94 50.004 13.84V11.34H48.764C47.464 11.34 47.164 11.24 47.164 10.36V6.42H50.004V3.94H47.164V1.6H44.804L44.244 3.94H42.564V6.42H44.164V10.7C44.164 13.08 45.424 14.04 48.044 14.04ZM55.1988 14.2C58.0788 14.2 59.9188 12.94 59.9188 10.8V10.6H56.9588V10.72C56.9588 11.34 56.4388 11.6 55.2388 11.6C53.5988 11.6 53.0388 11.04 52.9788 9.64H59.8788C59.9388 9.3 60.0188 8.72 60.0188 8.16C60.0188 5.54 58.2388 3.74 55.2188 3.74C52.0788 3.74 50.1588 5.78 50.1588 9C50.1588 12.18 51.7388 14.2 55.1988 14.2ZM55.1188 6.2C56.5188 6.2 57.1988 6.78 57.1388 7.82H52.9988C53.1188 6.76 53.6788 6.2 55.1188 6.2ZM63.8363 14V7.7C63.8363 6.6 64.2763 6.28 65.1963 6.28C66.1363 6.28 66.4763 6.62 66.4763 7.7V8.24H69.4563V7.32C69.4563 5.3 68.6763 3.74 66.5763 3.74C65.1563 3.74 64.2563 4.54 63.7563 5.56H63.6363V3.94H60.8563V14H63.8363Z"
            fill="#3B71F7"
          />
        </svg>{" "}
        <FiLogOut
          className="cursor-pointer text-2xl text-[#3B71F7]"
          onClick={logout}
        />
      </div>
      <section className="flex flex-col gap-2">
        {navLinks.map((link, key) => {
          const activeRoute =
            window.location.pathname === `/dashboard/${link.name}`;

          return (
            <Link to={`/dashboard/${link.name}`} key={key}>
              <div
                className={`px-6 flex items-center gap-4 capitalize w-full h-[68px] text-lg font-semibold cursor-pointer ${
                  activeRoute
                    ? "text-[#3B71F7] bg-[#FAFBFF] border-r-[6px] border-[#3B71F7]"
                    : "text-[#999999]"
                }`}
              >
                <div className="text-[24px]">{link.svg()}</div>
                <div className="">{link.name}</div>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
};
export default Navbar;
