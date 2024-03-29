import React from "react";

export default function Input({ input }) {
  return (
    <div className="text-center">
      <input
        {...input}
        type="text"
        className="
        bg-[#9e9edd] outline-none border-0 rounded-[8px] px-6 py-2 w-[80%] text-[#fff] font-semibold text-lg md:w-[50%] 
        placeholder:text-[#fff]
        "
        placeholder="Enter city, state or country"
      />
    </div>
  );
}
