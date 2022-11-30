import React, { useState } from "react";

const ProgramForm = ({ onSubmit }) => {
  const [state, setState] = useState({ itemName: "", quantity: "", cost: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(state);
  };
  return (
    <form className="w-[20%] p-3" onSubmit={handleSubmit}>
      <input
        className="mb-4 outline-none text-[13px] rounded-sm p-2 text-[#212121] leading-[12px] w-full"
        name="itemName"
        value={state.itemName}
        onChange={handleChange}
        placeholder="Item name"
        required
      />
      <div className="flex flex-row justify-between">
        <input
          className="mb-4 outline-none text-[13px] rounded-sm p-2 text-[#212121] leading-[12px] w-[48%]"
          name="quantity"
          value={state.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          type="number"
          required
        />
        <input
          className="mb-4 outline-none text-[13px] rounded-sm p-2 text-[#212121] leading-[12px] w-[48%]"
          name="cost"
          value={state.cost}
          onChange={handleChange}
          placeholder="Cost"
          type="number"
          required
        />
      </div>
      <button className="button py-[3px] px-[20px] rounded-[20px] my-5 items-center font-normal font-main text-[20px] flex">
        Add
      </button>
    </form>
  );
};

export default ProgramForm;
