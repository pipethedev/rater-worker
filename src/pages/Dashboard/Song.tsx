import React, { useState, useContext, useEffect } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { BiMusic } from "react-icons/bi";
import { HiPlay } from "react-icons/hi";
import microphone from "../../assets/microphone.svg";
import RatePopUp from "../../components/Dashboard/RatePopUp";
import { RaterContext } from "../../App";
const Song = () => {
  const navigate = useNavigate();
  const [showRaterPopUp, setshowRaterPopUp] = useState(false);

  const { baseUrl, token } = useContext(RaterContext);
  const [loading, setloading] = useState<boolean>();
  const [myMusic, setmyMusic] = useState<any>();
  let { id } = useParams();
  const playSvg = () => {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="24" fill="#EBF1FE" />
        <g clipPath="url(#clip0_565_3025)">
          <path
            d="M30.9658 27.2632C31.7117 26.0151 32.2065 24.4365 32.3025 22.8745C32.3634 21.872 32.14 20.8196 31.6563 19.83C30.8975 18.2754 29.594 17.4021 28.3348 16.5583C27.395 15.9287 26.5069 15.3342 25.8792 14.4849L25.7665 14.3335C25.3954 13.835 24.9763 13.27 24.9099 12.7955C24.8434 12.3154 24.4077 11.9739 23.9313 12.0016C23.4476 12.0348 23.0728 12.4355 23.0728 12.921V29.3717C22.2992 28.9028 21.3465 28.6147 20.3033 28.6147C17.7591 28.6147 15.6875 30.2709 15.6875 32.3074C15.6875 34.3439 17.7591 36 20.3033 36C22.8475 36 24.9191 34.3439 24.9191 32.3074V21.547C26.3057 22.0769 28.5748 23.4266 29.1989 26.5783C29.0825 26.75 28.9718 26.9346 28.8425 27.0823C28.5046 27.4645 28.5416 28.0479 28.9256 28.384C29.3059 28.7237 29.8894 28.6831 30.2273 28.3009C30.4747 28.0202 30.6944 27.6916 30.9049 27.3482C30.927 27.3223 30.9474 27.2946 30.9658 27.2632Z"
            fill="#3B71F7"
          />
        </g>
        <defs>
          <clipPath id="clip0_565_3025">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(12 12)"
            />
          </clipPath>
        </defs>
      </svg>
    );
  };

  const starSvg = () => {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="24" fill="#FFFAF0" />
        <path
          d="M22.4783 14.6833C22.9573 13.2092 25.0427 13.2092 25.5217 14.6833L26.784 18.5682C26.9982 19.2274 27.6125 19.6738 28.3057 19.6738H32.3905C33.9405 19.6738 34.5849 21.6571 33.331 22.5682L30.0263 24.9692C29.4655 25.3766 29.2308 26.0988 29.445 26.758L30.7073 30.643C31.1863 32.1171 29.4991 33.3429 28.2452 32.4318L24.9405 30.0308C24.3797 29.6234 23.6203 29.6234 23.0595 30.0308L19.7548 32.4318C18.5009 33.3429 16.8137 32.1171 17.2927 30.643L18.555 26.758C18.7692 26.0988 18.5345 25.3766 17.9737 24.9692L14.669 22.5682C13.4151 21.6571 14.0595 19.6738 15.6095 19.6738H19.6943C20.3875 19.6738 21.0018 19.2274 21.216 18.5682L22.4783 14.6833Z"
          fill="#FFC94C"
        />
      </svg>
    );
  };

  const mytoken = localStorage.getItem("token");
  useEffect(() => {
    if (mytoken == null) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
    Axios.get(`${baseUrl}api/v1/song/${id}`, {
      headers: {
        Authorization: `Bearer ${mytoken}`,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        setmyMusic(res.data.data);

        setloading(false);
      })

      .catch((err) => console.log(err));
  }, [mytoken]);

  const [side, setside] = useState("reviews");

  if (myMusic) {
    return (
      <div>
        <DashboardLayout>
          <div className="w-full">
            {" "}
            {showRaterPopUp ? <RatePopUp song_id={id} /> : null}
            <div className="w-full flex justify-between items-center h-[58px] mb-6">
              <div className="flex flex-col justify-between h-full">
                <div className="text-[28px] font-semibold text-[black] px-3">
                  {myMusic.title}
                </div>
                <div className="text-[#888888] font-medium text-sm px-3">
                  This song has{" "}
                  {myMusic.ratings.length ? myMusic.ratings.length : 0}{" "}
                  review(s)
                </div>
              </div>
              <div
                className="font-semibold cursor-pointer text-sm text-[white] py-4 px-8 max-sm:px-4 max-sm:py-2 max-sm:text-xs bg-[#3B71F7] rounded-[64px]"
                onClick={() => setshowRaterPopUp(true)}
              >
                Rate and Review
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
              <div
                onClick={() => navigate("/dashboard/library")}
                className="cursor-pointer text-sm font-medium text-[#888888]"
              >
                Library
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
                {myMusic.title}
              </div>
            </div>
            <section className="flex max-md:gap-4 my-6">
              <div className="w-[30%] flex">
                <svg
                  width="244"
                  height="330"
                  viewBox="0 0 244 330"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="max-sm:w-[200px] max-sm:h-[290px]"
                >
                  <rect width="244" height="330" rx="16" fill="#F5F8FF" />
                  <g clipPath="url(#clip0_565_3008)">
                    <path
                      d="M168.439 187.755C173.412 179.434 176.71 168.91 177.351 158.497C177.757 151.813 176.267 144.797 173.042 138.2C167.984 127.836 159.294 122.014 150.899 116.389C144.634 112.191 138.713 108.228 134.528 102.566L133.777 101.556C131.303 98.2331 128.509 94.4666 128.066 91.3032C127.623 88.103 124.718 85.8258 121.542 86.0105C118.318 86.232 115.819 88.903 115.819 92.1402V201.812C110.662 198.685 104.31 196.765 97.3557 196.765C80.3942 196.765 66.5837 207.806 66.5837 221.383C66.5837 234.959 80.3942 246 97.3557 246C114.317 246 128.128 234.959 128.128 221.383V149.647C137.372 153.18 152.499 162.177 156.659 183.188C155.884 184.333 155.145 185.564 154.284 186.549C152.031 189.097 152.278 192.986 154.838 195.226C157.373 197.491 161.263 197.22 163.515 194.672C165.165 192.802 166.63 190.611 168.033 188.321C168.18 188.149 168.316 187.964 168.439 187.755Z"
                      fill="#CEDBFD"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_565_3008">
                      <rect
                        width="160"
                        height="160"
                        fill="white"
                        transform="translate(42 86)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="w-[70%] flex flex-col justify-center">
                <div className="text-[black] font-semibold text-[40px] max-sm:text-lg max-md:text-2xl">
                  {myMusic?.title}
                </div>
                <div className="font-medium text-[40px] text-[#3b71f7] underline cursor-pointer">
                  <a href={myMusic.file_url} target="_blank">
                    <HiPlay />
                  </a>
                </div>
                <div className="h-[1px] w-full bg-[#dbd9d9] mt-3 mb-6 max-md:opacity-0 max-md:mt-0"></div>
                {myMusic.ratings.length == 0 ? (
                  <div className="text-[#999999] text-base font-medium">
                    No rating yet
                  </div>
                ) : myMusic.ratings[0].rating == "Good" ? (
                  <div className="text-[#00C288] font-semibold text-base max-md:text-sm bg-[#EBFFF9] rounded-[64px] p-1 w-[120px] flex items-center justify-center">
                    Overall {myMusic.ratings[0].rating}
                  </div>
                ) : myMusic.ratings[0]?.rating == "Fair" ? (
                  <div className="text-[#3a00c2] font-semibold text-base max-md:text-sm bg-[#d1c2f5] rounded-[64px] p-1 w-[120px] flex items-center justify-center">
                    Overall {myMusic?.ratings[0]?.rating}
                  </div>
                ) : myMusic.ratings[0]?.rating == "Bad" ? (
                  <div className="text-[#e94444] font-semibold text-base max-md:text-sm bg-[#ffc107] rounded-[64px] p-1 w-[120px] flex items-center justify-center">
                    Overall {myMusic?.ratings[0]?.rating}
                  </div>
                ) : null}
                <div className="h-12 flex items-center mt-8 gap-8">
                  <div className="flex items-center h-full gap-4">
                    {starSvg()}
                    <div className="h-full flex flex-col justify-between">
                      <div className="text-[black] text-xl font-semibold">
                        {myMusic.ratings.length ? myMusic.ratings.length : 0}
                      </div>
                      <div className="text-[#888888] text-sm font-medium">
                        Total Reviews
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="w-full mt-20">
              <div className="w-full">
                {side == "reviews" ? (
                  <div className="flex gap-6 ">
                    <div className="w-[149px] flex flex-col gap-3">
                      <div className="rounded-[48px] bg-[#f5f8ff] py-[10px] w-full text-[#3b71f7] font-semibold text-sm text-center">
                        Workers Review
                      </div>
                      <div className="w-full h-1 bg-[#3B71F7]"></div>
                    </div>
                    <div
                      className="text-[#777777] text-sm font-medium mt-2 cursor-pointer"
                      onClick={() => setside("feedbackss")}
                    >
                      Your Feedback
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-6 ">
                    <div
                      className="text-[#777777] text-sm font-medium mt-2 cursor-pointer"
                      onClick={() => setside("reviews")}
                    >
                      Workers Review
                    </div>
                    <div className="w-[179px] flex flex-col gap-3">
                      <div className="rounded-[48px] bg-[#f5f8ff] py-[10px] w-full text-[#3b71f7] font-semibold text-sm text-center">
                        Your Feedback
                      </div>
                      <div className="w-full h-1 bg-[#3B71F7]"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-5">
              {side == "reviews" && myMusic.ratings.length == 0 ? (
                <section className="w-full rounded-[20px] h-[500px] bg-[#fafbff] flex items-center flex-col gap-4">
                  <div className="mt-[120px] text-[#02123B] font-semibold text-[26px]">
                    No Reviews Yet
                  </div>
                  <div className="font-medium text-base text-[#666666] text-center">
                    It looks like you haven't added any review to this music yet
                  </div>
                </section>
              ) : side == "reviews" && myMusic.ratings.length > 0 ? (
                <section className="w-full flex justify-between flex-wrap gap-8">
                  {myMusic.ratings.map((review, key) => {
                    console.log(review);
                    return (
                      <div
                        key={key}
                        className="w-[48%] max-md:w-full p-4 rounded-[16px] bg-[white] shadow-sm space-y-4"
                      >
                        <div className="flex gap-4 items-center">
                          <img
                            src="https://res.cloudinary.com/dfpby8w8f/image/upload/v1673616167/cermuel-api/tmp-3-1673616167191_dbufnm.png"
                            alt={review.worker.first_name}
                            className="rounded-[50%] w-[56px] h-[56px] object-contain"
                          />
                          <div className="h-[106px] flex flex-col justify-center">
                            <div className="text-[#02123b] text-base font-semibold">
                              {review.worker.first_name}
                            </div>
                            <div className="w-full">{review.comment}</div>
                          </div>
                        </div>
                        <div className="bg-[#ebfff9] w-[100px] text-sm font-semibold text-[#00c288] py-1 text-center rounded-[64px]">
                          {review.rating}
                        </div>
                      </div>
                    );
                  })}
                </section>
              ) : side != "reviews" && !myMusic.admin_feedback ? (
                <section className="w-full rounded-[20px] h-[500px] bg-[#fafbff] flex items-center flex-col gap-4">
                  <div className="mt-[120px] text-[#02123B] font-semibold text-[26px]">
                    No Feedbacks Yet
                  </div>
                  <div className="font-medium text-base text-[#666666] text-center">
                    The administrator has not added any feedbacks to this music
                    yet
                  </div>
                </section>
              ) : (
                <div className="w-full flex h-[565px] text-[#02123B] font-semibold text-xl justify-between max-md:justify-center gap-4">
                  <div className="h-full w-[30%] max-md:w-full max-md:hidden rounded-2xl bg-[#3B71F7] relative">
                    <img
                      src={microphone}
                      alt=""
                      className="absolute bottom-0 left-0"
                    />
                  </div>
                  <div className="w-[73%] max-md:w-full h-full pt-10 flex flex-col gap-4 relative px-4 rounded-2xl border-[1px] border[#E2EAFE]">
                    <div className="text-[#02123B] text-3xl font-bold">
                      Administrator
                    </div>
                    <div className="text-[#666666] text-xl font-medium">
                      {myMusic?.admin_feedback.comment}
                    </div>
                  </div>
                </div>
              )}
            </div>
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

export default Song;
