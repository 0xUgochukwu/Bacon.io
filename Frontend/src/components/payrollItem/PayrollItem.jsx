import React from "react";
import { cart, person, plus, remove } from "../../assets";

const PayrollItem = ({
  payroll = {},
  onAddressChange,
  onAmountChange,
  onRemove,
  editable = true,
}) => {
  return (
    <tr>
      <td className="p-2" colSpan={2}>
        <div className="flex">
          <img src={person} className="self-start mr-4 w-[25px] h-[25px]" />{" "}
          <input
            value={payroll.address}
            onChange={(e) => onAddressChange(payroll.id, e.target.value)}
            className="bg-primary w-full outline-none p-1 font-normal text-white font-main text-[20px] leading-6"
            placeholder="Enter Address"
            required
          />
        </div>
      </td>


      <td className="text-[18px] pl-4">
      <button className="sm:hidden w-[23px] h-[23px] text-[#ffffff] text-[20px]" onClick={() => onRemove(payroll.id)}
          type="button">X</button>
        <button
          className="button hidden py-[3px] px-[20px] rounded-[20px] my-5 items-center font-normal font-main text-[20px] sm:flex"
          onClick={() => onRemove(payroll.id)}
          type="button"
        >
          <img src={remove} />
          <span className="ml-3">Remove</span>
        </button>
      </td>
    </tr>
  );
};

export default PayrollItem;
