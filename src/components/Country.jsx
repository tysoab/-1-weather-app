import React from "react";

export default function Country({ img, countryName }) {
  return (
    <div className="flex items-center text-md md:text-xl font-semibold border-l-4 border-l-slate-500 rounded-lg">
      {img && <img src={img} alt="" />}
      <small>{countryName}</small>
    </div>
  );
}
