import React from "react";
import Input from "../ui/Input";
import img_1 from "../assets/113.png";
import img_2 from "../assets/305.png";

export default function Home() {
  return (
    <div>
      <h1 className="mt-12 text-center text-2xl md:text-4xl font-bold uppercase border-b-2 border-b-slate-500 pb-5">
        #1 Weather App
      </h1>

      <main className="w-[80%] md:w-[60%] mx-auto mb-5 mt-10">
        <Input />
        <div className="flex items-center justify-center gap-1 my-4">
          <img src={img_2} alt="#1 weather app" className="w-24 md:w-28" />
          <small className="text-3xl md:text-4xl  mb-5">
            9<sup>&deg;c </sup>
          </small>
        </div>
        <p className="text-3xl md:text-4xl mx-11 md:mx-60">Tallin</p>
        <p className="text-xl md:text-2xl text-right mr-11 md:mr-60 -mt-2">
          Lagos
        </p>
        <div
          className="w-[90%] md:w-[50%] mx-auto gap-3 mt-4 grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))",
          }}
        >
          <div className="flex flex-col items-center gap-1.5 font-semibold">
            <span className="text-xl">Wind</span>
            <span className="text-lg">30</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 font-semibold">
            <span className="text-xl">Humidity</span>
            <span className="text-lg">310</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 font-semibold">
            <span className="text-xl">Pressure</span>
            <span className="text-lg">130</span>
          </div>
        </div>
      </main>

      <footer
        className="px-8 py-4 mt-12 grid gap-4 items-center"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
        }}
      >
        <div className="flex items-center text-md md:text-xl font-semibold border-l-4 border-l-slate-500 rounded-lg">
          <img src={img_1} alt="" />
          <small>NEW YORK</small>
        </div>
        <div className="flex items-center text-md md:text-xl font-semibold border-l-4 border-l-slate-500 rounded-lg">
          <img src={img_1} alt="" />
          <small>LONDON</small>
        </div>
        <div className="flex items-center text-md md:text-xl font-semibold border-l-4 border-l-slate-500 rounded-lg">
          <img src={img_1} alt="" />
          <small>GERMANY</small>
        </div>
        <div className="flex items-center text-md md:text-xl font-semibold border-l-4 border-l-slate-500 rounded-lg">
          <img src={img_1} alt="" />
          <small>FRANCE</small>
        </div>
        <div className="flex items-center text-md md:text-xl font-semibold border-l-4 border-l-slate-500 rounded-lg">
          <img src={img_1} alt="" />
          <small>NIGERIA</small>
        </div>
        <div className="flex items-center text-md md:text-xl font-semibold border-l-4 border-l-slate-500 rounded-lg">
          <img src={img_1} alt="" />
          <small>CHINA</small>
        </div>
      </footer>
    </div>
  );
}
