import React from "react";
import { OVerlay } from "..";

const Modal = ({ title, onClose, children }) => {
  return (
    <OVerlay>
      <div className="bg-white p-4 rounded-2xl flex flex-col h-fit">
        <div className="flex justify-between mb-6 ">
          <h1 className=" font-bold text-primary text-[18px]">{title}</h1>
          <button
            className="rounded-full w-[20px] h-[20px] bg-primary flex justify-center items-center"
            onClick={onClose}
          >
            <span className="font-normal text-[12px] font-main text-white">
              X
            </span>
          </button>
        </div>
        <div>{children}</div>
      </div>
    </OVerlay>
  );
};

export default Modal;
