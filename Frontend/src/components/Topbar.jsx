import React from 'react'
import { Link } from 'react-router-dom'
import { PROGRAMS_ROUTE } from '../constants/routes'

const Topbar = () => {
  return (
    <div className='flex justify-between items-center px-[82px] pt-[25.5px] text-texts'>
      <div className='text-white font-normal text-[30px] font-header leading-[46px] cursor-pointer'>
        Bacon.
      </div>
      <div className=' flex justify-evenly items-center w-[536px] '>
        <Link to='/'>
          <button className=" text-[23px] leading-[38px] font-light">Home</button>
        </Link>
        <Link to='/about'>
          <button className=" text-[23px] leading-[38px] font-normal">About</button>
        </Link>
        <Link to='/docs'>
          <button className="text-[23px] leading-[38px] font-normal">Docs</button>
        </Link>
        <Link to='/community'>
          <button className="text-[23px] leading-[38px] font-normal">Community</button>
        </Link>
        <Link to='/ecosystem'>
          <button className=" text-[23px] leading-[38px] font-normal">Ecosystem</button>
        </Link>
      </div>

      <Link to={PROGRAMS_ROUTE}>
        <div className='font-main py-[10px] px-[24px]  rounded-[20px] button font-bold text-[25px] flex items-center leading-[33px] cursor-pointer'>
        Programs
        </div>
      </Link>
    </div>
  )
}

export default Topbar
