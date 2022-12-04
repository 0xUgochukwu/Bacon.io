import React from "react";
import {
  hero,
  bill,
  escrow,
  groupsaving,
  safelock,
  saving,
  wager,
  popular,
} from "../assets/index";
import { Link } from "react-router-dom";
import { CLAIM_PAYMENT_ROUTE, PROGRAMS_ROUTE } from "../constants/routes";

const Hero = () => {
  return (
    <div className="ml-[78px] mr-[66px] ">
      <div className="flex justify-between items-center  mb-[85px]">
        <div className="max-w-[700px]">
          <h1 className="font-header font-bold text-[55px] leading-[58px] mt-[121px] mb-[25px] ">
            Smart Financial
            <br /> Programs.
          </h1>
          <p className=" text-[20px] leading-[26px] mb-[30px]">
            Bacon is a trustless ecosystem which lets you create custom
            financial programs to suit your diverse needs.
          </p>
          <div className='flex'>
            <Link to={PROGRAMS_ROUTE}>
              <button className='font-main py-[13.5px] px-[33.5px] rounded-[20px] button font-semibold text-[20px] flex items-center leading-[26px] '>
                Programs
              </button>
            </Link>
            <Link to={CLAIM_PAYMENT_ROUTE}>
            <button className='font-main  rounded-[20px] w-[196px] h-[53px] ml-[25px] text-[20px] leading-[26px] font-semibold button flex justify-center items-center'>
              <p className='bg-primary w-[194px] h-[51px] rounded-[20px] flex justify-center items-center '>
                Claim Payment
              </p>
            </button>
            </Link>
          </div>
        </div>
        <div className="w-[450px] h-[342px] mt-[101px]  ">
          <img src={saving} alt="saving" className="w-full h-full" />
        </div>
      </div>
      <div className="flex flex-col">
        <div>
          <img src={popular} alt="popular programs" />
        </div>
        <div className="flex justify-between mb-[316px] mt-[28px]">
          <div className="flex justify-center items-center  py-[13.5px] bg-black rounded-[30px]">
            <img
              src={safelock}
              alt="safelock"
              className="ml-[10px] w-[28px] h-[28px]"
            />
            <p className="text-[20px] leading-[26px]  font-header ml-[10px]  mr-[39px] ">
              Safelock
            </p>
          </div>
          <div className="flex justify-center items-center  py-[13.5px] bg-black rounded-[30px]">
            <img
              src={escrow}
              alt="escrow"
              className="ml-[10px] w-[28px] h-[28px]"
            />
            <p className="text-[20px] leading-[26px] font-header ml-[10px]  mr-[67px] ">
              Escrow
            </p>
          </div>
          <div className="flex justify-center items-center  py-[13.5px] bg-black rounded-[30px]">
            <img
              src={groupsaving}
              alt="groupsaving"
              className="ml-[10px] w-[25px] h-[25px]"
            />
            <p className="text-[20px] leading-[26px]  font-header ml-[10px]  mr-[45px] ">
              Group Savings
            </p>
          </div>
          <div className="flex justify-center items-center  py-[13.5px] bg-black rounded-[30px]">
            <img
              src={bill}
              alt="bill"
              className="ml-[10px] w-[25px] h-[25px]"
            />
            <p className="text-[20px] leading-[26px]  font-header ml-[10px]  mr-[48px] ">
              Bill Payments
            </p>
          </div>
          <div className="flex justify-center items-center  py-[13.5px] bg-black rounded-[30px]">
            <img
              src={wager}
              alt="wager"
              className="ml-[10px] w-[25px] h-[25px]"
            />
            <p className="text-[20px] leading-[26px]  font-header ml-[10px]  mr-[65px] ">
              Wagers
            </p>
          </div>
        </div>
      </div>
      <section className="flex justify-between items-center ">
        <div className="w-[625px]">
          <img src={hero} alt="saving" className="w-[full] h-[full]" />
        </div>
        <div className="flex flex-col text-right  text-white w-[518px]">
          <h1 className="font-header font-bold text-[48px] leading-[50px] capitalize ">
            A straight path to your goals.
          </h1>
          <p className="text-[20px] leading-[26px] self font-normal mb-[20px] mt-[35px] w-[448px] self-end">
            Start building a program on pur platform which supports a variety of
            decentralized financial scenarios.
          </p>
          <p className="text-[20px] leading-[26px] font-normal  mb-[46px]w-[448px] self-end">
            Developers can take advantage of our open source code. Which can
            allow them to build on our bacon framework.
          </p>
          <button className=" w-[246px] button  py-[10px] mt-[46px] self-end rounded-[30px] ">
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
};

export default Hero;
