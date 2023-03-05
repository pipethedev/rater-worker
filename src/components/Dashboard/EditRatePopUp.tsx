import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { RaterContext } from "../../App";
import { Toaster, toast } from "react-hot-toast";
import { GrClose } from "react-icons/gr";

const EditRatePopUp = ({
  song_id,
  showRaterPopUp,
  likeComent,
  dislikeComment,
  improveComment,
}) => {
  const { baseUrl } = useContext(RaterContext);
  const [loader, setloader] = useState(false);
  const [error, seterror] = useState(false);
  const [error2, seterror2] = useState(false);
  const [error3, seterror3] = useState(false);

  const mytoken = localStorage.getItem("token");
  const [clicked, setclicked] = useState<string>();
  const ratings = ["Good", "Fair", "Bad"];
  const [likeComment, setlikeComment] = useState<
    string | any | undefined | null
  >(likeComent);
  const [disLikeComment, setdisLikeComment] = useState<
    string | any | undefined | null
  >(dislikeComment);
  const [improvementComment, setimprovementComment] = useState<
    string | any | undefined | null
  >(improveComment);

  const RateSong = () => {
    setloader(true);
    if (
      clicked != "" &&
      likeComment &&
      song_id &&
      disLikeComment &&
      improvementComment
    ) {
      axios
        .put(
          `${baseUrl}api/v1/rating/rate-song/${song_id}`,
          {
            rating: clicked,
            likeComment,
            disLikeComment,
            improvementComment,
          },
          {
            headers: {
              Authorization: `Bearer ${mytoken}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data.data);
          toast.success("Review Successfully Updated");
          setTimeout(() => {
            location.reload();
          }, 2000);
          setloader(false);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setTimeout(() => {
            location.reload();
          }, 3000);
          setloader(false);
        });
    } else {
      toast.error("FILL ALL THE FIELDS");
      setloader(false);
    }
  };

  useEffect(() => {
    if (error || error2 || error3) {
      toast.error("Maximum Input Limit Reached");
      console.log("error occured");
    }
  }, [error, error2, error3]);

  //
  return (
    <div className="h-[80%] max-md:h-[70%] shadow-2xl w-[420px] max-md:w-[80%] px-4 max-md:px-3 pt-8 pb-4 rounded-2xl bg-[white] flex-col gap-2 flex absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 transition duration-700">
      {loader ? (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
          {" "}
          <div className="w-8 h-8 border-[6px] border-dashed rounded-full animate-spin dark:border-violet-600"></div>
        </div>
      ) : null}
      <Toaster />
      <div className="w-full items-center flex justify-between">
        <div className="w-full text-xl text-[#02123B] font-bold">
          Upload Rating
        </div>
        <div>
          <GrClose
            onClick={() => showRaterPopUp(false)}
            className="font-bold cursor-pointer"
          />
        </div>
      </div>
      <div className="flex gap-4 my-2 max-md:gap-2 justify-around">
        {ratings.map((rating) => {
          const active = clicked == rating;
          return (
            <div
              className={`w-[32%] h-[46px] rounded-xl flex items-center justify-center border-[1px] font-semibold cursor-pointer ${
                rating == "Good"
                  ? "border-[#00AD7A]"
                  : rating == "Fair"
                  ? "border-[#FF9900]"
                  : "border-[#E50000]"
              }
              ${
                active && rating == "Good"
                  ? "bg-[#00AD7A] text-[white]"
                  : active && rating == "Fair"
                  ? "bg-[#FF9900] text-[white]"
                  : active && rating == "Bad"
                  ? "bg-[#E50000] text-[white]"
                  : null
              }
              `}
              onClick={() => {
                setclicked(rating);
              }}
            >
              {rating}
            </div>
          );
        })}
      </div>
      <div className="w-full font-medium text-sm mt-2">
        What do you like about this song?
      </div>
      <textarea
        placeholder="Write your song review here..."
        maxLength={60}
        className={`border-[1px] outline-none ${
          error ? "border-[#e60000]" : "border-[#beb5b5]"
        } rounded-xl px-4 py-3 scrollbar-hide`}
        cols={10}
        rows={10}
        value={likeComment}
        onChange={(e) => {
          setlikeComment(e?.target?.value);
          likeComment?.length == 59 ? seterror(true) : seterror(false);
        }}
      ></textarea>
      <div className="w-full font-medium text-sm mt-2">
        What don't you like about this song?
      </div>
      <textarea
        placeholder="Write your song review here..."
        className={`border-[1px] outline-none ${
          error2 ? "border-[#e60000]" : "border-[#beb5b5]"
        } rounded-xl px-4 py-3 scrollbar-hide`}
        cols={10}
        maxLength={60}
        rows={10}
        value={disLikeComment}
        onChange={(e) => {
          setdisLikeComment(e?.target?.value);
          disLikeComment?.length == 59 ? seterror2(true) : seterror2(false);
        }}
      ></textarea>
      <div className="w-full font-medium text-sm mt-2">
        Do you think this song is perfect? If not, what can be done to improve
        this song
      </div>
      <textarea
        placeholder="Write your song review here..."
        className={`border-[1px] outline-none ${
          error3 ? "border-[#e60000]" : "border-[#beb5b5]"
        } rounded-xl px-4 py-3 scrollbar-hide`}
        cols={10}
        rows={10}
        maxLength={60}
        value={improvementComment}
        onChange={(e) => {
          setimprovementComment(e?.target?.value);
          improvementComment?.length == 59 ? seterror3(true) : seterror3(false);
        }}
      ></textarea>
      <div className="w-full flex justify-center">
        {" "}
        <button
          onClick={RateSong}
          className="w-[96%] font-semibold text-base text-[white] h-[54px] flex items-center justify-center px-8 mt-4 max-sm:text-xs bg-[#3B71F7] rounded-[64px]"
        >
          Upload Rating
        </button>
      </div>
    </div>
  );
};

export default EditRatePopUp;
