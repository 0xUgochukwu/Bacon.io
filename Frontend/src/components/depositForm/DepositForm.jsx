import React, { useState } from "react";

const DepositForm = ({ onSubmit, errorMessage, isLoading }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(amount);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-3 px-5 flex flex-col h-fit"
    >
      <label className="font-normal text-[16px] font-main leading-6 text-primary mb-2">
        How much do you want to deposit?
      </label>
      <input
        className=" h-[100%] rounded-[20px] w-full bg-[#08081E] text-[13px]  outline-none p-2  border-primary"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      {errorMessage && (
        <p className="text-center text-[red] font-semibold leading-4 mt-2">
          {" "}
          {errorMessage}{" "}
        </p>
      )}
      <button
        className="rounded-[10px] mt-8 w-fit items-center font-semibold py-2 px-6 font-main text-[12px] bg-primary"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Submit"}
      </button>
    </form>
  );
};

export default DepositForm;
