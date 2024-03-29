import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PayrollWallet } from '../../components'
import {
  DEPOSIT_PAYROLL_ROUTE,
  New_PERSONAL_SAVINGS_ROUTE,
} from '../../constants/routes'
import { AnnualBudgetContext } from '../../context/AnnualBudgetContext'

const ClaimPayment = () => {
  const {
    connectWallet,
    currentAccount,
    claimSalary,
    payrollDeposit,
    setPaymentDetails,
  } = useContext(AnnualBudgetContext)
  const navigate = useNavigate()

  const handlePersonalSavings = () => {
    navigate(New_PERSONAL_SAVINGS_ROUTE)
  }
  const handleclaim = () => {
    claimSalary()
  }
  return (
    <div className="flex flex-col">
      <main className="p-[28px] lg:ml-[78px] lg:mr-[66px] pt-16 mb-32">
        <div className="flex flex-col sm:flex-row justify-between">
          <h1 className="font-main mb-[50px] sm:mb-0 font-bold text-[20px] sm:text-[40px] leading-[52px] text-white">
            Claim Payment
          </h1>
          {currentAccount && (
            <div className='flex flex-row justify-end'>
              <PayrollWallet />
            </div>
          )}
        </div>

        {!currentAccount ? (
          <button
            onClick={connectWallet}
            className=" w-[98%] sm:w-[40%] mx-auto :  h-[123px] rounded-[20px] button flex items-center justify-center self-center text-[25px] leading-[32.55px] font-bold font-main mt-8"
          >
            <h1 className='bg-primary w-[99.5%] h-[121px] rounded-[20px] font-bold text-[25px] leading-[33px]  flex items-center justify-center'>
              Connect Wallet to continue
            </h1>
          </button>
        ) : (
           
          <div className="flex flex-row mt-[100px] lg-16 justify-center">
               <Link to={DEPOSIT_PAYROLL_ROUTE} className="font-main py-[35.5px] w-[98%] sm:w-[40%] justify-center rounded-[20px] button font-bold text-[25px] flex items-center leading-[33px] ">
            <button >
              Claim Payment
            </button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
export default ClaimPayment
