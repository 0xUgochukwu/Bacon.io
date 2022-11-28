import React from "react";
import { Link } from "react-router-dom";
import { arrowUp } from "../../assets";

const Footer = () => {
  return (
    <footer className="flex justify-between items-center px-[82px] pt-[25.5px] text-texts">
      <div className="text-white font-bold text-[30px] font-header leading-[46px] cursor-pointer">
        Bacon.
      </div>
      <div className=" flex justify-evenly items-center w-[536px] ">
        <Link to="/">
          <p className="font-header text-[23px] leading-[38px] font-semibold">Home</p>
        </Link>
        <Link to="/about">
          <button className="font-header text-[23px] leading-[38px] font-semibold">About</button>
        </Link>
        <Link to="/docs">
          <button className="font-main text-[23px] leading-[38px] font-semibold">Docs</button>
        </Link>
        <Link to="/community">
          <button className="font-header text-[23px] leading-[38px] font-semibold">Community</button>
        </Link>
        <Link to="/ecosystem">
          <button className="font-header text-[23px] leading-[38px] font-semibold">Ecosystem</button>
        </Link>
      </div>
      <img src={arrowUp} alt="" />
    </footer>
  );
};

export default Footer;
