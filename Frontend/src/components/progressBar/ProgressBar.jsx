const ProgressBar = ({ completed }) => {
  return (
    <>
      <div className="button h-[20px] w-full rounded-[20px] p-[1px] relative">
        <div className=" h-[100%] rounded-[20px] bg-[#08081E] px-[50px] "></div>
        <div
          className={`button w-[${completed}%] h-[100%] rounded-[20px] absolute top-0`}
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;
