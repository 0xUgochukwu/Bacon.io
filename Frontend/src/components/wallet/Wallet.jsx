import React from "react";
import { deleteIc } from "../../assets";
const Wallet = () => {
  return (
    <>
      <div className="px-[1px] py-[5px]  w-fit  xs:w-[100%] h-[123px] rounded-[20px] button flex items-center justify-center text-[25px] leading-[32.55px] font-bold font-main">
        <div className="bg-primary h-[121px] rounded-[20px] w-[99.9%]  flex flex-col items-end justify-center px-8">
          <div className="flex flex-wrap">
            <p className="font-main font-bold text-[25px] leading-[32.5px] text-white">
              0xBlaBlaBluBalabla099a9bad0
            </p>
            <img
              src={deleteIc}
              className="w-[30px] h-[30px] ml-5 cursor-pointer"
              alt=""
            />
          </div>
          <p className="font-main font-medium text-[30px] sm:text-[18px] xs:text-[16px] leading-[39.06px] self-end mt-2 text-white">
            420 ETH
          </p>
        </div>
      </div>
    </>
  );
};

export default Wallet;
