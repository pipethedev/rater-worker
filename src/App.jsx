import React, { createContext, useState, useEffect } from "react";
import Login from "./pages/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Dashboard/Home";
import Library from "./pages/Dashboard/Library";
import Explore from "./pages/Dashboard/Explore";
import Settings from "./pages/Dashboard/Settings";
import Song from "./pages/Dashboard/Song";
import Axios from "axios";
import Reset from "./pages/reset";
import Forgotpassword from "./pages/forgotpassword";

export const RaterContext = createContext();

export const userContext = createContext();

const App = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [token, settoken] = useState();
  const [user, setuser] = useState();
  const mytoken = localStorage.getItem("token");

  useEffect(() => {
    Axios.get(`${baseUrl}api/v1/user/profile`, {
      headers: {
        Authorization: `Bearer ${mytoken}`,
      },
    })
      .then((res) => {
        setuser(res.data.data);
      })

      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="font-grotesk">
      <RaterContext.Provider value={{ baseUrl, settoken, token, user }}>
        {" "}
        <Router>
          {/* AUTH PAGES  */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/reset/:token" element={<Reset />} />
          </Routes>

          {/* DASHBOARD PAGES */}
          <Routes>
            <Route path="/dashboard/home" element={<Home />} />
            <Route path="/dashboard/library" element={<Library />} />
            <Route path="/dashboard/explore" element={<Explore />} />

            <Route path="/forgotpassword" element={<Forgotpassword />} />
            <Route path="/dashboard/:id" element={<Song />} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Routes>
        </Router>
      </RaterContext.Provider>
    </div>
  );
};

export default App;
