import React, { useState } from "react";
import { download, loading, save } from "../../assets";
import { PayrollWallet } from "../../components";
import { getPayrollName } from "../../utills/localStorage";

const DepositPayroll = () => {
  const [amount, setAmount] = useState("");
  const isLoading = false;
  const payrollName = getPayrollName();

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handleDeposit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col">
      <main className="ml-[78px] mr-[66px] pt-16 mb-16">
        <div className="flex justify-between flex-wrap">
          <div className="mb-4">
            <h1 className="font-main font-bold text-[40px] leading-[52px]">
              Setup New Program
            </h1>
            <h3 className="font-main font-medium text-[30px] text-[#3940DE] leading-[39.06px]">
              {payrollName}
            </h3>
          </div>
          <PayrollWallet />
        </div>

        <div className="flex flex-col justify-center items-center">
          <form onSubmit={handleDeposit} className=" sm:w-[50%]">
            <div className="button h-[120px] mt-20 rounded-[20px] p-[1px]">
              <div className=" h-[100%] rounded-[20px] bg-[#08081E] px-10 ">
                <p className="text-[20px] font-semibold font-main leading-6 py-3">
                  Enter Amount
                </p>

                <div className="button h-[50px] rounded-[20px] p-[1px]">
                  <input
                    value={amount}
                    onChange={handleAmountChange}
                    className=" h-[100%] rounded-[20px] bg-black w-full outline-none pl-6 "
                    type="number"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex justify-center mt-4">
              {!isLoading ? (
                <button className="button rounded-[20px] my-16 font-normal font-main text-[20px]  p-8 w-full flex justify-center items-center">
                  <div className="flex self-center">
                    <img
                      src={download}
                      alt="save"
                      className="w-[26.93px] h-[26.2px] mr-4"
                    />
                    <span className="font-normal text-[20px] font-main leading-6 self-center">
                      Deposit
                    </span>
                  </div>
                </button>
              ) : (
                <button>
                  <img src={loading} alt="Loading" />
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default DepositPayroll;
