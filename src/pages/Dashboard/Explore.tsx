import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { FcSearch } from "react-icons/fc";
import { RaterContext } from "../../App";

const Explore = () => {
  const { baseUrl } = useContext(RaterContext);
  const navigate = useNavigate();
  const songs = true;

  const mytoken = localStorage.getItem("token");

  const order = () => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 4V20M17 20L13 16M17 20L21 16M7 20V4M7 4L3 8M7 4L11 8"
          stroke="#3B71F7"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  };

  const musicSvg = () => {
    return (
      <svg
        width="244"
        height="211"
        viewBox="0 0 244 211"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="max-md:w-[75px] max-md:h-[75px]"
      >
        <rect width="244" height="211" rx="12" fill="#F5F8FF" />
        <g clipPath="url(#clip0_130_5032)">
          <path
            d="M156.829 112.316C160.559 106.076 163.033 98.1826 163.513 90.3727C163.818 85.3599 162.7 80.0979 160.282 75.1498C156.488 67.3768 149.97 63.0103 143.674 58.7914C138.975 55.6434 134.535 52.6709 131.396 48.4243L130.833 47.6673C128.977 45.1748 126.882 42.35 126.55 39.9774C126.217 37.5772 124.039 35.8694 121.657 36.0079C119.238 36.174 117.364 38.1773 117.364 40.6052V122.859C113.496 120.514 108.733 119.074 103.517 119.074C90.7956 119.074 80.4378 127.354 80.4378 137.537C80.4378 147.719 90.7956 156 103.517 156C116.238 156 126.596 147.719 126.596 137.537V83.7352C133.529 86.3846 144.874 93.1329 147.995 108.891C147.413 109.75 146.859 110.673 146.213 111.411C144.523 113.322 144.708 116.24 146.628 117.92C148.53 119.618 151.447 119.415 153.137 117.504C154.374 116.101 155.472 114.458 156.525 112.741C156.635 112.612 156.737 112.473 156.829 112.316V112.316Z"
            fill="#CEDBFD"
          />
        </g>
        <defs>
          <clipPath id="clip0_130_5032">
            <rect
              width="120"
              height="120"
              fill="white"
              transform="translate(62 36)"
            />
          </clipPath>
        </defs>
      </svg>
    );
  };

  const [myMusic, setmyMusic] = useState<any>();
  const [defaultMusic, setdefaultMusic] = useState<any>();

  useEffect(() => {
    if (mytoken == null) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }

    Axios.get(`${baseUrl}api/v1/song/all`, {
      headers: {
        Authorization: `Bearer ${mytoken}`,
      },
    })
      .then((res) => {
        setdefaultMusic(res.data.data);
        setmyMusic(res.data.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Search implemented

  const [filterByText, setfilterByText] = useState("");
  const filterBy = myMusic?.filter((music) =>
    music?.song?.ratings[0]?.rating.includes(filterByText)
  );
  useEffect(() => {
    filterByText != "" ? setmyMusic(filterBy) : setmyMusic(defaultMusic);
  }, [filterByText]);
  const [searchText, setsearchText] = useState<string>("");
  const filteredMusic = myMusic?.filter((music) =>
    music.song.title.toLowerCase().includes(searchText?.toLowerCase())
  );

  if (myMusic) {
    // console.log(myMusic);
    return (
      <div>
        <DashboardLayout>
          <div className="w-full">
            {" "}
            <div className="flex w-full justify-between">
              <div>
                <div className="text-[28px] font-semibold text-[black] px-3">
                  Explore
                </div>
                <div className="text-[#888888] mt-1 mb-8 font-medium text-sm px-3">
                  All Songs you’ve uploaded on the platform
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
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="text-[#3B71F7] font-semibold text-sm">
                Explore
              </div>
            </div>
            {songs ? (
              <div>
                <div className="text-[20px] text-[black] font-semibold my-4">
                  All Songs - {myMusic?.length}
                </div>
                <div className="flex items-center w-full">
                  <input
                    type="text"
                    placeholder=" Search for songs on your Explore page to rate"
                    onChange={(e) => setsearchText(e.target.value)}
                    value={searchText}
                    className="outline-none border-[0.5px] bg-[#ffffff] border-[#cccccc] p-4 rounded-[64px] w-[400px] max-md:w-[300px] max-sm:w-[150px] h-[50px] text-[#b3b3b3] font-semibold text-sm"
                  />
                </div>
                <div className="w-full flex gap-3 mt-8 items-center">
                  <div
                    className={`px-4 py-2 font-medium border-[#E2EAFE] border-[1px] rounded-[64px] text-sm cursor-pointer ${
                      filterByText == ""
                        ? "font-semibold text-[white] bg-[#3B71F7] border-[#3B71F7]"
                        : "text-[#999999]"
                    }`}
                    onClick={() => setfilterByText("")}
                  >
                    All Songs
                  </div>
                  <div
                    className={`px-4 py-2 text-center font-medium border-[#E2EAFE] border-[1px] rounded-[64px] text-sm cursor-pointer ${
                      filterByText == "Good"
                        ? "font-semibold text-[white] bg-[#3B71F7] border-[#3B71F7]"
                        : "text-[#999999]"
                    }`}
                    onClick={() => setfilterByText("Good")}
                  >
                    Overall Good
                  </div>{" "}
                  <div
                    className={`px-4 py-2 text-center font-medium border-[#E2EAFE] border-[1px] rounded-[64px] text-sm cursor-pointer ${
                      filterByText == "Fair"
                        ? "font-semibold text-[white] bg-[#3B71F7] border-[#3B71F7]"
                        : "text-[#999999]"
                    }`}
                    onClick={() => setfilterByText("Fair")}
                  >
                    Overall Fair
                  </div>{" "}
                  <div
                    className={`px-4 py-2 text-center font-medium border-[#E2EAFE] border-[1px] rounded-[64px] text-sm cursor-pointer ${
                      filterByText == "Bad"
                        ? "font-semibold text-[white] bg-[#3B71F7] border-[#3B71F7]"
                        : "text-[#999999]"
                    }`}
                    onClick={() => setfilterByText("Bad")}
                  >
                    Overall Bad
                  </div>{" "}
                </div>
                {myMusic?.length > 0 ? (
                  <section className="gap-2 max-md:gap-4 mt-8 flex flex-wrap">
                    {filteredMusic?.map((music) => {
                      return (
                        <div
                          className="cursor-pointer w-[244px] max-md:w-full gap-4 max-md:gap-6 max-md:items-start my-4 flex flex-col max-md:flex-row max-md:border-b-[1px] max-md:border-[#ebe7e7] pb-2"
                          onClick={() => {
                            navigate(`/dashboard/${music.song.id}`);
                          }}
                        >
                          {musicSvg()}
                          <div className="flex flex-col gap-2">
                            <div className="font-semibold text-[20px] text-[black] max-md:text-base">
                              {music.song.title}
                            </div>
                            {music.song.ratings == 0 ? (
                              <div className="font-bold text-sm text-[#3a00c2]">
                                No ratings yet
                              </div>
                            ) : music.song.ratings.length > 0 ? (
                              music.song.ratings[0].rating == "Good" ? (
                                <div className="text-[#00C288] font-semibold text-base max-md:text-sm bg-[#EBFFF9] rounded-[64px] p-1 w-[75px] flex items-center justify-center">
                                  {music.song.ratings[0].rating}
                                </div>
                              ) : music.song.ratings[0]?.rating == "Fair" ? (
                                <div className="text-[#3a00c2] font-semibold text-base max-md:text-sm bg-[#d1c2f5] rounded-[64px] p-1 w-[75px] flex items-center justify-center">
                                  {music?.song?.ratings[0]?.rating}
                                </div>
                              ) : music.song.ratings[0]?.rating ==
                                "AlmostGood" ? (
                                <div className="text-[#389e7f] font-semibold text-base max-md:text-sm bg-[#f4fcf9] rounded-[64px] p-1 w-[200px] flex items-center justify-center">
                                  Overall: {music.song.ratings[0].rating}
                                </div>
                              ) : music.song.ratings[0]?.rating == "Bad" ? (
                                <div className="text-[#e94444] font-semibold text-base max-md:text-sm bg-[#ffc107] rounded-[64px] p-1 w-[75px] flex items-center justify-center">
                                  {music?.song?.ratings[0]?.rating}
                                </div>
                              ) : null
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </section>
                ) : (
                  <div className="w-full flex items-center mt-20 text-2xl font-bold flex-col">
                    No music found
                    <FcSearch className="text-[100px]" />
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-[700px] bg-[#FAFBFF] rounded-[20px] mt-10 text-center justify-center pt-40 space-y-6 flex-col items-center">
                <div className="text-[#02123B] text-[32px] font-semibold tracking-tighter">
                  No Songs here at the moment
                </div>
                <div className="w-full text-center text-[#666666] font-medium text-base">
                  It looks like you haven't added any music to your sound page
                  yet. <br />
                  To add a song to the sound page, click the button below
                </div>
                <div className="w-full justify-center flex">
                  <div
                    className="bg-[#3B71F7] cursor-pointer text-[white] rounded-[64px] w-[190px] h-[56px] flex justify-center items-center font-semibold text-base"
                    onClick={() => navigate("/dashboard/sound")}
                  >
                    Upload your Sound
                  </div>
                </div>
              </div>
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
          <div className="w-8 h-8 border-[6px] border-dashed rounded-full animate-spin dark:border-violet-600"></div>
        </div>
        <br />
      </div>
    );
  }
};
export default Explore;
