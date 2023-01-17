import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { RaterContext } from "../../App";
import { Toaster, toast } from "react-hot-toast";

const RatePopUp = ({ song_id }) => {
  const { baseUrl } = useContext(RaterContext);
  const songs = true;

  const mytoken = localStorage.getItem("token");
  console.log(song_id);
  const [clicked, setclicked] = useState<string>();
  const ratings = ["Good", "Fair", "Bad"];
  const [comment, setcomment] = useState<string>();

  const RateSong = () => {
    if (clicked != "" && comment && song_id) {
      axios
        .post(
          `${baseUrl}api/v1/rating/rate-song`,
          {
            song_id: song_id,
            rating: clicked,
            comment: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${mytoken}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data.data);
          toast.success("Review Successfully Made");
          setTimeout(() => {
            location.reload();
          }, 2000);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setTimeout(() => {
            location.reload();
          }, 3000);
        });
    } else {
      toast.error("FILL ALL THE FIELDS");
    }
  };

  //
  return (
    <div className="h-[80%] max-md:h-[70%] shadow-xl w-[420px] max-md:w-[80%] px-4 max-md:px-3 pt-8 pb-4 rounded-2xl bg-[white] flex-col gap-4 flex absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
      <Toaster />
      <div className="w-full text-2xl text-[#02123B] font-semibold">
        Rate and Review Song
      </div>
      <div className="flex gap-4 max-md:gap-2 justify-around">
        {ratings.map((rating) => {
          const active = clicked == rating;
          return (
            <div
              className={`w-[32%] h-[56px] rounded-xl flex items-center justify-center border-[1px] font-semibold cursor-pointer ${
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
      <div className="w-full font-medium text-sm mt-3">
        What are your thoughts on the song?
      </div>
      <textarea
        placeholder="Write your song review here..."
        className="border-[1px] outline-none border-[#beb5b5] rounded-xl p-4"
        cols={30}
        rows={10}
        value={comment}
        onChange={(e) => setcomment(e?.target?.value)}
      ></textarea>
      <button
        onClick={RateSong}
        className="font-semibold text-base text-[white] h-[54px] flex items-center justify-center px-8 mt-4 max-sm:text-xs bg-[#3B71F7] rounded-[64px]"
      >
        Give Rate and Review
      </button>
    </div>
  );
};

export default RatePopUp;
