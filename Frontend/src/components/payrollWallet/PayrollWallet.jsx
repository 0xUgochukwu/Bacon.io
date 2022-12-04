import React, { useContext } from "react";
import { deleteIc } from "../../assets";
import { AnnualBudgetContext } from "../../context/AnnualBudgetContext";
import { shortAddress } from "../../utills/shortAddress";

const PayrollWallet = () => {
  const { currentAccount, disconnectWallet, contractBalance } =
    useContext(AnnualBudgetContext);
  return (
    <>
      <div className="px-[1px] py-[1px]  w-fit  h-[55px] rounded-[20px] button flex items-center justify-center text-[25px] leading-[32.55px] font-bold font-main">
        <div className="bg-primary h-[100%] rounded-[20px] w-[99.9%]  flex flex-col items-end justify-center px-8">
          <div className="flex">
            <p className="font-main font-bold text-[25px] leading-[32.5px] text-white">
              {shortAddress(currentAccount)}
            </p>
            <img
              onClick={() => {
                disconnectWallet;
              }}
              src={deleteIc}
              className="w-[30px] h-[30px] ml-5 cursor-pointer"
              alt="disconnect"
            />
          </div>
          {/* <p className="font-main font-medium text-[30px] sm:text-[18px] xs:text-[16px] leading-[39.06px] self-end mt-2 text-white">
            {contractBalance} MATIC
          </p> */}
        </div>
      </div>
    </>
  );
};

export default PayrollWallet;
