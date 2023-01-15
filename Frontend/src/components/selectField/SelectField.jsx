import React from "react";
import { chevronLeft, chevronRight } from "../../assets";

const SelectField = ({ label, onDecrease, onIncrease, value }) => {
  return (
    <div className="flex items-center">
      <button className="outline-none" onClick={onDecrease}>
        <img src={chevronLeft} alt="left" className="w-[12.2px] h-[18.8px] sm:w-[18.8px]" />
      </button>

      <p className="font-main font-semibold text-[16px] sm:text-[20px] leading-6 ml-2 mr-2 sm:ml-5 sm:mr-5">
        {value}{" "}
        {label}
        {value > 1 && "s"}
      </p>
      <button className="outline-none" onClick={onIncrease}>
        <img src={chevronRight} alt="right" className="w-[12.2px] h-[18.8px] sm:w-[18.8px]" />
      </button>
    </div>
  );
};

export default SelectField;
