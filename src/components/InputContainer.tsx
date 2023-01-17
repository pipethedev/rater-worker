import React, { useState, useRef } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export type Input = {
  labelText: string;
  type: string;
  onChange?: any;
  value?: any;
};

const InputContainer = (Input: Input) => {
  const inputRef = useRef<HTMLInputElement>();
  const [see, setsee] = useState(true);
  return (
    <div className={`w-full flex flex-col items-start gap-1 font-grotesk`}>
      <label
        htmlFor="id"
        className="text-sm text-[#02123B] font-semibold tracking-[-0.01em]"
      >
        {Input.labelText}
      </label>

      <div className="focus:border-[#3B71F7] rounded-[64px] h-[54px] max-md:h-[48px] w-full outline-none font-medium text-[#261C40] text-base flex items-center relative">
        <input
          id="id"
          type={Input.type}
          className="w-full h-full outline-none rounded-[64px] focus:border-[#3B71F7] border-[1px] p-4 pr-10"
          onChange={Input.onChange}
          value={Input.value}
          ref={Input.type == "password" ? inputRef : null}
        />
        {Input.type == "password" ? (
          see ? (
            <AiFillEye
              className="absolute right-10 z-50 cursor-pointer text-[#3B71F7] text-xl"
              onClick={() => {
                setsee(!see);
                inputRef.current ? (inputRef.current.type = "text") : null;
              }}
            />
          ) : (
            <AiFillEyeInvisible
              className="absolute right-10 z-50 cursor-pointer text-[#3B71F7] text-xl"
              onClick={() => {
                setsee(!see);
                inputRef.current ? (inputRef.current.type = "password") : null;
              }}
            />
          )
        ) : null}
      </div>
    </div>
  );
};

export default InputContainer;
