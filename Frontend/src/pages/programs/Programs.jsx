import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Footer, Wallet } from '../../components'
import { New_PERSONAL_SAVINGS_ROUTE } from '../../constants/routes'
import { AnnualBudgetContext } from '../../context/AnnualBudgetContext'
import { Link } from 'react-router-dom'
import { New_PAYROLL_ROUTE } from '../../constants/routes'
import {PayrollWallet} from '../../components'

const Programs = () => {
  const { connectWallet, currentAccount, checkIfWalletIsConnected } =
    useContext(AnnualBudgetContext)
  const navigate = useNavigate()

  const handlePersonalSavings = () => {
    if(!currentAccount){
      alert("Connect wallet to continue")
      return
    }
    navigate(New_PERSONAL_SAVINGS_ROUTE)
  }
  const handleCustomProgram = () =>{
    if(!currentAccount){
      alert("Connect wallet to continue")
      return
    }
    navigate(New_PAYROLL_ROUTE)
  }
  return (
    <div className='flex flex-col'>
      <main className='p-[28px] lg:ml-[78px] lg:mr-[66px] pt-16 mb-32'>
        <div className='flex flex-col lg:flex-row justify-between'>
          <h1 className='font-main mb-[50px] lg:mb-0 font-bold text-[20px] leading-6 sm:text-[40px] sm:leading-[52px] text-white'>
            Programs
          </h1>
          {currentAccount && (
            <div className='flex flex-row justify-end'>
              <PayrollWallet />
            </div>
          )}
        </div>

        <div className='w-[98%] sm:w-[50%] mx-auto'>
          <div className='flex flex-col lg:flex-row mt-16 w-[100%] gap-4'>
            <button
              onClick={handlePersonalSavings}
              className='font-main py-[35.5px] w-full lg:w-[49%] justify-center border rounded-[20px] button font-bold text-[25px] flex items-center leading-[33px] text-center '
            >
              Personal Savings
            </button>

            <button
              onClick={handleCustomProgram}
              className='font-main py-[35.5px] w-full lg:w-[49%] justify-center rounded-[20px] button font-bold text-[25px] flex items-center leading-[33px] '
            >
              Custom Program
            </button>
          </div>

          {!currentAccount && (
            <button
              onClick={connectWallet}
              className=' w-[100%] h-[123px] rounded-[20px] button flex items-center justify-center text-[25px] leading-[32.55px] font-bold font-main mt-8'
            >
              <h1 className='bg-primary w-[99.5%] h-[121px] rounded-[20px] font-bold text-[25px] leading-[33px]  flex items-center justify-center'>
                Connect Wallet to continue
              </h1>
            </button>
          )}
        </div>
      </main>
    </div>
  )
}
export default Programs
