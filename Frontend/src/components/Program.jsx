import React from 'react'
import { Link } from 'react-router-dom'

const Program = () => {
  return (
    <section className=' ml-[82px] mr-[80px] text-white pt-[65px] '>
      <div className='flex  justify-between'>
        <h1 className='font-main font-bold text-[40px] leading-[52px]  '>
          Setup New Program
        </h1>
        <button className=' w-[336px] h-[123px] rounded-[20px] button flex items-center justify-center text-[25px] leading-[32.55px] font-bold font-main'>
          <h1 className='bg-primary w-[334px] h-[121px] rounded-[20px]   flex items-center justify-center'>
            Connect Wallet
          </h1>
        </button>
      </div>
      <div className=' mt-[100px] flex justify-center items-center'>
        <div className='w-[502px] h-[190px] bg-black flex justify-center items-center'>
          Connect wallet to continue
        </div>
      </div>
    </section>
  )
}

export default Program
