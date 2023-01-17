import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

const DashboardLayout = ({ children }: any) => {
  const [showHam, setshowHam] = useState(true);
  const navRef = useRef<HTMLDivElement>(null);

  const show = () => {
    console.log(navRef.current?.className);
    if (navRef.current) {
      if (navRef.current.classList.contains("max-md:hidden")) {
        console.log("Element contains class");
        navRef.current.classList.remove("max-md:hidden");
        setshowHam(false);
      }
    }
  };

  const hide = () => {
    console.log(navRef.current?.className);
    if (navRef.current) {
      navRef.current.classList.add("max-md:hidden");
      setshowHam(true);
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="absolute top-4 right-8 hidden max-md:block">
        {showHam ? (
          <RxHamburgerMenu
            className="text-[20px] font-bold cursor-pointer"
            onClick={show}
          />
        ) : (
          <IoClose
            className="hidden max-md:block text-[24px] font-bold cursor-pointer"
            onClick={hide}
          />
        )}
      </div>
      <Navbar navRef={navRef} />
      <div className="py-8 px-8 ml-[280px] max-md:ml-0 w-full overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
