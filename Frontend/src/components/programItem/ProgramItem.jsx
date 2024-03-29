import React from "react";
import { cart, remove } from "../../assets";

const ProgramItem = ({
  editable = true,
  item = {},
  onCostInc,
  onCostDec,
  onCostChange,
  onRemove,
  onItemChange
}) => {
  return (
    <tr>
      <td className="p-2" colSpan={2}>
        <div className="flex  ">
          <img src={cart} className="hidden sm:block self-start" />{" "}
          <input
            value={item.itemName}
            onChange={(e) => onItemChange(item.key, e.target.value)}
            className="bg-primary ml-[1px] sm:ml-8 w-full outline-none p-1 font-normal text-white font-main text-[20px] leading-6"
            placeholder="Enter Name"
            required
          />
        </div>
      </td>
      <td className="p-2">
        <div className="flex">
          <div className="w-[57px] h-[50px] rounded-[14px] sm:w-[60px] sm:h-[60px] p-[2px] bg-[white] ml-3 flex justify-center button items-center rounded-xl self-center">
            <input
            required
              value={item.cost}
              onChange={(e) => onCostChange(item.key, Number(e.target.value))}
              className="w-[100%] p-1 h-[100%] bg-[#000000] rounded-xl font-semibold outline-none text-white font-main text-[15px] text-center"
            />
          </div>
          {editable && (
            <div className="bg-white w-[56px] h-[32px] rounded-sm self-center ml-3 flex justify-center items-center">
              <button
                className="w-[24px] h-[24px] bg-[white] flex justify-center items-center rounded-lg self-center"
                onClick={() => onCostDec(item.key)}
                type="button"
              >
                <span className="font-main font-bold text-[16px] text-[#999999] leading-[12px]">
                  -
                </span>
              </button>
              <button
                className="w-[24px] h-[24px] bg-[white] flex justify-center items-center rounded-lg self-center"
                onClick={() => onCostInc(item.key)}
                type="button"
              >
                <span className="font-main font-bold text-[16px] text-[#999999] leading-[12px]">
                  +
                </span>
              </button>
            </div>
          )}
        </div>
      </td>
      <td className="text-[18px] pl-4">
        <button className="sm:hidden w-[23px] h-[23px] text-[#ffffff] text-[20px]" onClick={() => onRemove(item.key)}
          type="button">X</button>
        <button
          className="button hidden  py-[3px] pl-[10px] px-[20px] rounded-[20px] my-5 items-center font-normal font-main text-[20px] sm:flex"
          onClick={() => onRemove(item.key)}
          type="button"
        >
          <img src={remove} className="w-[15px] h-[15px]" />
          <span className="text-[12px] sm:text-[20px] ml-3">Remove</span>
        </button>
      </td>
    </tr>
  );
};

export default ProgramItem;
