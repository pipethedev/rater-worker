import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { RaterContext } from "../../App";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { BsDownload } from "react-icons/bs";

import { FcSearch } from "react-icons/fc";
import { TfiSlice } from "react-icons/tfi";

const Home = () => {
  const { baseUrl, token, user } = useContext(RaterContext);

  const mytoken = localStorage.getItem("token");
  const navigate = useNavigate();
  const [stats, setstats] = useState<any>();
  const [mymusic, setmymusic] = useState<any>();
  useEffect(() => {
    if (mytoken == null) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
    Axios.get(`${baseUrl}api/v1/dashboard/stats`, {
      headers: {
        Authorization: `Bearer ${mytoken}`,
      },
    })
      .then((res) => {
        setstats(res.data.data);
      })

      .catch((err) => console.log(err));

    Axios.get(`${baseUrl}api/v1/song/all`, {
      headers: {
        Authorization: `Bearer ${mytoken}`,
      },
    })
      .then((res) => {
        setmymusic(res.data.data);
      })

      .catch((err) => console.log(err));
  }, []);

  const svgStar = () => {
    return (
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="32" cy="32" r="32" fill="#FFF6E0" />
        <path
          d="M29.8126 18.7322C30.5011 16.6132 33.4989 16.6132 34.1874 18.7322L35.9739 24.2304C36.2818 25.1781 37.1649 25.8197 38.1613 25.8197H43.9425C46.1705 25.8197 47.0969 28.6708 45.2944 29.9804L40.6173 33.3785C39.8112 33.9641 39.4739 35.0023 39.7818 35.9499L41.5683 41.4481C42.2568 43.5671 39.8315 45.3292 38.0289 44.0196L33.3519 40.6215C32.5458 40.0359 31.4542 40.0359 30.6481 40.6215L25.9711 44.0196C24.1685 45.3292 21.7432 43.5671 22.4317 41.4481L24.2182 35.9499C24.5261 35.0023 24.1888 33.9641 23.3827 33.3785L18.7056 29.9804C16.9031 28.6708 17.8295 25.8197 20.0575 25.8197H25.8387C26.8351 25.8197 27.7182 25.1781 28.0261 24.2304L29.8126 18.7322Z"
          fill="#FFC94C"
        />
      </svg>
    );
  };

  const svgmusic = () => {
    return (
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="32" cy="32" r="32" fill="#EBF1FE" />
        <g clip-path="url(#clip0_130_4408)">
          <path
            d="M41.2878 36.351C42.2823 34.6868 42.9421 32.582 43.0701 30.4994C43.1513 29.1627 42.8535 27.7594 42.2085 26.4399C41.1967 24.3671 39.4587 23.2027 37.7798 22.0777C36.5268 21.2383 35.3426 20.4456 34.5056 19.3132L34.3555 19.1113C33.8607 18.4466 33.3018 17.6933 33.2132 17.0606C33.1246 16.4206 32.5436 15.9652 31.9085 16.0021C31.2635 16.0464 30.7638 16.5806 30.7638 17.228V39.1623C29.7323 38.537 28.462 38.153 27.0711 38.153C23.6788 38.153 20.9167 40.3612 20.9167 43.0765C20.9167 45.7918 23.6788 48 27.0711 48C30.4634 48 33.2255 45.7918 33.2255 43.0765V28.7294C35.0743 29.4359 38.0998 31.2355 38.9319 35.4377C38.7768 35.6666 38.6291 35.9128 38.4568 36.1097C38.0063 36.6193 38.0555 37.3972 38.5675 37.8453C39.0747 38.2982 39.8526 38.2441 40.3031 37.7345C40.633 37.3603 40.9259 36.9221 41.2066 36.4642C41.2361 36.4298 41.2633 36.3928 41.2878 36.351Z"
            fill="#3B71F7"
          />
        </g>
        <defs>
          <clipPath id="clip0_130_4408">
            <rect
              width="32"
              height="32"
              fill="white"
              transform="translate(16 16)"
            />
          </clipPath>
        </defs>
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
        <g clip-path="url(#clip0_130_5032)">
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

  const svgStarGood = () => {
    return (
      <svg
        width="30"
        height="28"
        viewBox="0 0 30 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.8126 1.73222C13.5011 -0.386799 16.4989 -0.386798 17.1874 1.73222L18.9739 7.2304C19.2818 8.17805 20.1649 8.81966 21.1613 8.81966H26.9425C29.1705 8.81966 30.0969 11.6708 28.2944 12.9804L23.6173 16.3785C22.8112 16.9641 22.4739 18.0023 22.7818 18.9499L24.5683 24.4481C25.2568 26.5671 22.8315 28.3292 21.0289 27.0196L16.3519 23.6215C15.5458 23.0359 14.4542 23.0359 13.6481 23.6215L8.97106 27.0196C7.16852 28.3292 4.74321 26.5671 5.43172 24.4481L7.21819 18.9499C7.5261 18.0023 7.18879 16.9641 6.38267 16.3785L1.70564 12.9804C-0.0969063 11.6708 0.829477 8.81966 3.05754 8.81966H8.83867C9.83509 8.81966 10.7182 8.17805 11.0261 7.2304L12.8126 1.73222Z"
          fill="#00C288"
        />
      </svg>
    );
  };
  if (mymusic && stats) {
    return (
      <div>
        <DashboardLayout>
          <div>
            <div className="text-[28px] font-semibold text-[black] px-3">
              Good Evening {user?.last_name},
            </div>
            <div className="text-[#888888] mt-1 mb-8 font-medium text-sm px-3">
              Always remember you are a star, and you would always be!
            </div>
            <div className="w-full flex flex-wrap gap-3 lg:justify-around">
              <div className="w-[32%] max-lg:w-full h-[140px] rounded-xl bg-[#F5F8FF] flex items-center gap-4 px-4">
                {svgmusic()}
                <div className="flex flex-col">
                  <div className="font-bold text-[32px] text-[black]">
                    {stats?.songs}
                  </div>
                  <div className="text-[#888888] font-medium text-base">
                    Songs You Rated
                  </div>
                </div>
              </div>
              <div className="w-[32%] max-lg:w-full h-[140px] rounded-xl bg-[#FFFAF0] flex items-center gap-4 px-4">
                {svgStar()}
                <div className="flex flex-col">
                  <div className="font-bold text-[32px] text-[black]">
                    {stats?.fair}
                  </div>
                  <div className="text-[#888888] font-medium text-base">
                    Rated Fair
                  </div>
                </div>
              </div>
              <div className="w-[32%] max-lg:w-full h-[140px] rounded-xl bg-[#F0FFFA] flex items-center gap-4 px-4">
                {svgStarGood()}
                <div className="flex flex-col">
                  <div className="font-bold text-[32px] text-[black]">
                    {stats?.good}
                  </div>
                  <div className="text-[#888888] font-medium text-base">
                    Rated Good
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between pt-8  w-full items-center">
              <div className="text-lg font-semibold max-sm:text-sm">
                New songs to listen and rate
              </div>
              <div
                className="text-[#3B71F7] text-base font-semibold flex items-center cursor-pointer"
                onClick={() => navigate("/dashboard/library")}
              >
                View more
                <svg
                  width="56"
                  height="12"
                  viewBox="0 0 56 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-3"
                >
                  <path
                    d="M56.495 6.49497C56.7683 6.22161 56.7683 5.77839 56.495 5.50503L52.0402 1.05025C51.7668 0.776886 51.3236 0.776886 51.0503 1.05025C50.7769 1.32362 50.7769 1.76684 51.0503 2.0402L55.0101 6L51.0503 9.9598C50.7769 10.2332 50.7769 10.6764 51.0503 10.9497C51.3236 11.2231 51.7668 11.2231 52.0402 10.9497L56.495 6.49497ZM0 6.7H28V5.3H0V6.7ZM28 6.7H56V5.3H28V6.7Z"
                    fill="#3B71F7"
                  />
                </svg>
              </div>
            </div>
            {/* RECENT music?S  */}
            {mymusic?.length > 0 ? (
              <section className="gap-2 mt-2 flex justify-around">
                {mymusic?.slice(0, 4)?.map((music) => {
                  return (
                    <div
                      className="cursor-pointer max-md:w-full gap-4 max-md:gap-6 max-md:items-start my-4 flex flex-col max-md:flex-row max-md:border-b-[1px] max-md:border-[#ebe7e7] pb-2"
                      onClick={() => {
                        navigate(`/dashboard/${music.id}`);
                      }}
                    >
                      {musicSvg()}
                      <div className="flex flex-col gap-2">
                        <div className="font-semibold text-[20px] text-[black] max-md:text-base">
                          {music?.title}
                        </div>
                        {music?.ratings == 0 ? (
                          <div className="font-bold text-sm text-[#3a00c2]">
                            No ratings yet
                          </div>
                        ) : music?.ratings.length > 0 ? (
                          music.ratings[0].rating == "Good" ? (
                            <div className="text-[#00C288] font-semibold text-base max-md:text-sm bg-[#EBFFF9] rounded-[64px] p-1 w-[75px] flex items-center justify-center">
                              {music?.ratings[0].rating}
                            </div>
                          ) : music?.ratings[0]?.rating == "AlmostGood" ? (
                            <div className="text-[#389e7f] font-semibold text-base max-md:text-sm bg-[#f4fcf9] rounded-[64px] p-1 w-[200px] flex items-center justify-center">
                              Overall: {music.ratings[0].rating}
                            </div>
                          ) : music?.ratings[0]?.rating == "Fair" ? (
                            <div className="text-[#3a00c2] font-semibold text-base max-md:text-sm bg-[#d1c2f5] rounded-[64px] p-1 w-[75px] flex items-center justify-center">
                              {music?.ratings[0]?.rating}
                            </div>
                          ) : music?.ratings[0]?.rating == "Bad" ? (
                            <div className="text-[#e94444] font-semibold text-base max-md:text-sm bg-[#ffc107] rounded-[64px] p-1 w-[75px] flex items-center justify-center">
                              {music?.ratings[0]?.rating}
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

export default Home;
