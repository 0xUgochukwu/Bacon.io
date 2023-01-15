import React, { useState,useContext } from "react";
import { Navigate } from "react-router-dom";
import { edit, loading, plus, save, viewReport } from "../../assets";
import {
  Jumbotron,
  PayrollItem,
  PayrollWallet,
  SelectField,
  Wallet,
} from "../../components";
import { savePayrollName } from "../../utills/localStorage";
import { DEPOSIT_PAYROLL_ROUTE } from "../../constants/routes"; 
import { AnnualBudgetContext } from '../../context/AnnualBudgetContext'

const NewPayroll = () => {
  const [payrolls, setPayrolls] = useState([
    { id: 0, amount: "", address: "" },
  ]);
  const [months, setMonths] = useState(1);
  const [days, setDays] = useState(0);
  const [amount, setAmount] = useState("");
  const [programName, setProgramName] = useState("New Bacon Program");
  const [isEditProgramName, setIsEditProgramName] = useState(false);
  const isLoading = false;
  const {
    connectWallet,
    currentAccount,
    claimSalary,
    payrollDeposit,
    setPaymentDetails,
  } = useContext(AnnualBudgetContext)

  const handlePayment = () =>{
    //this takes a list of address, salary and time
//setPaymentDetails()
  }

  const handleAddressChange = (id, address) => {
    const updatedPayrolls = payrolls.map((payroll) =>
      payroll.id === id ? { ...payroll, address } : payroll
    );
    setPayrolls(updatedPayrolls);
  };

  const handleRemove = (id) => {
    const filteredPayrolls = payrolls.filter((payroll) => payroll.id != id);
    setPayrolls(filteredPayrolls);
  };
  const handleAddMember = () => {
    const id = `id${payrolls.length}`;
    const newItem = {
      id,
      address: "",
      amount: "",
    };

    setPayrolls([...payrolls, newItem]);
  };

  const handleDaysInc = () => {
    setDays((val) => val + 1);
  };
  const handleDaysDec = () => {
    if (days >= 1) setDays((val) => val - 1);
  };

  const handleMonthInc = () => {
    setMonths((val) => val + 1);
  };
  const handleMonthDec = () => {
    if (months >= 1) setMonths((val) => val - 1);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    Navigate(DEPOSIT_PAYROLL_ROUTE )
  };

  const toggleEditProgramName = () => {
    setIsEditProgramName(!isEditProgramName);
  };
  const handleSaveProgramName = () => {
    savePayrollName(programName);
    toggleEditProgramName();
  };

  return (
    <div className="flex flex-col">
      <main className="p-[28Px] lg:ml-[78px] lg:mr-[66px] pt-16 mb-16">
        <div className="flex justify-between flex-wrap">
          <div className="mb-4">
            <h1 className="font-main text-[20px] font-bold sm:text-[40px] leading-[52px]">
              Setup New Program
            </h1>
            <div className='flex'>
              {isEditProgramName ? (
                <div>
                  <input
                    value={programName}
                    onChange={(e) => setProgramName(e.target.value)}
                    className='border-b outline-none bg-primary border-[#3940DE]'
                    placeholder='Enter name'
                  />
                </div>
              ) : (
                <h3 className='font-main font-medium text-[30px] text-[#3940DE] leading-[39.06px]'>
                  {programName}
                </h3>
              )}
              {isEditProgramName ? (
                <button
                  className='outline-none ml-3'
                  onClick={handleSaveProgramName}
                >
                  Save
                </button>
              ) : (
                <button
                  className='outline-none ml-3'
                  onClick={toggleEditProgramName}
                >
                  <img src={edit} />
                </button>
              )}
            </div>
          </div>
          <PayrollWallet />
        </div>
        <div className="px-[1px] py-[1px] mt-[30px]   w-[100%] h-fit rounded-[20px] button flex flex-col items-center justify-center text-[25px] leading-[32.55px] font-bold font-main sm:mt-16">
          <div className="bg-[#08081E]  w-[100%] h-[100%] rounded-[20px] p-4 sm:px-10">
            <p className="font-bold mb-8 text-[19px] sm:text-[20px] leading-6 text-white font-main">
              Time Structure
            </p>
            <div className="flex flex-col sm:flex-row justify-between mb-8 overflow-auto">
              <p className="font-semibold mb-1 sm:mb-0 text-[18px] sm:text-[20px] leading-6 text-white font-main">
                Intervals
              </p>
             <div className="flex gap-[30px] sm:gap-0 sm:justify-between sm:w-[70%] lg:w-[50%]">
             <SelectField
                label="Month"
                value={months}
                onIncrease={handleMonthInc}
                onDecrease={handleMonthDec}
              />
              <SelectField
                label='Day'
                value={days}
                onDecrease={handleDaysDec}
                onIncrease={handleDaysInc}
              />
             </div>
             
            
             
            </div>
          </div>
        </div>
        <form onSubmit={handleSave}>
          <div className="button h-[120px] sm:h-[130px] mt-[20px] sm:mt-20 rounded-[20px] p-[1px]">
            <div className=" h-[100%] rounded-[20px] bg-[#08081E] p-4 sm:px-10 pb-2 ">
              <p className="text-[20px] font-semibold font-main leading-6 py-3">
                Pay Amount
              </p>

              <div className="button h-[40px] sm:h-[50px] rounded-[20px] p-[1px] mb-7">
                <input
                  value={amount}
                  onChange={handleAmountChange}
                  className=' h-[100%] rounded-[20px] bg-black w-full outline-none pl-6 '
                  type='number'
                  required
                />
              </div>
            </div>
          </div>
          <div className="px-[1px] py-[1px]  w-[100%] h-fit rounded-[20px] button flex flex-col items-center justify-center mt-[20px] text-[25px] leading-[32.55px] font-bold font-main sm:mt-16">
            <div className="bg-[#08081E] w-[100%] h-[100%] rounded-[20px] p-4 sm:px-8">
              <div className="overflow-auto">
                <table className="w-[100%]  m-w-[450px]">
                  <thead>
                    <tr>
                      <th
                        className='p-2 font-bold text-[20px] leading-6 font-main text-left'
                        colSpan={2}
                      >
                        Members
                      </th>
                      {/* <th className="p-4 font-bold text-[20px] leading-6 font-main text-left">
                      Pay Amount
                    </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {!payrolls.length ? (
                      <tr>
                        <td className='text-center' colSpan={3}>
                          <div className='text-center'>
                            <Jumbotron message='No Items' />
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <>
                        {payrolls.map((payroll) => (
                          <PayrollItem
                            key={payroll.id}
                            payroll={payroll}
                            editable={true}
                            onAddressChange={handleAddressChange}
                            // onAmountChange={handleAmountChange}
                            onRemove={handleRemove}
                          />
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
                <button
                  className='button py-[3px] px-[20px] rounded-[20px] my-5 items-center font-normal font-main text-[20px] flex'
                  onClick={handleAddMember}
                  type='button'
                >
                  <img src={plus} />
                  <span className='ml-3'>Add Member</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center mt-6 sm:mt-4">
            {!isLoading ? (
              <button className="button h-[42px] text-center rounded-[20px] p-3 sm:my-16  font-normal font-main text-[20px]  sm:p-10 flex justify-center items-center">
                <div className="flex self-center gap-[10px]">
                  <img
                    src={save}
                    alt="save"
                    className="w-[24.93px] h-[24.2px] sm:mr-4"
                  />
                  <span className='font-normal text-[20px] font-main leading-6'>
                    Save Program
                  </span>
                </div>
              </button>
            ) : (
              <button>
                <img src={loading} alt='Loading' />
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  )
};

export default NewPayroll;
