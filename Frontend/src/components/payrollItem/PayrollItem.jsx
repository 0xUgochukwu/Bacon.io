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
          <img src={person} className="self-start mr-4" />{" "}
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
        <button
          className="button py-[3px] px-[20px] rounded-[20px] my-5 items-center font-normal font-main text-[20px] flex"
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
