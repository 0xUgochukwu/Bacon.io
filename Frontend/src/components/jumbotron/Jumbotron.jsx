import React from "react";
import { cart } from "../../assets";

const Jumbotron = ({ message }) => {
  return (
    <div className=" h-[150px] rounded-[20px] p-[1px]">
      <div className=" h-[100%] rounded-[20px] bg-[#08081E] w-full outline-none pl-2 flex flex-col justify-center items-center">
        <img src={cart} />
        <p className="text-[15px]">{message}</p>
      </div>
    </div>
  );
};

export default Jumbotron;
