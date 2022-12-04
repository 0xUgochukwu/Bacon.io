import React from 'react'
import { profile } from '../assets/index'

const Team = ({ name, role, description, profile }) => {
  return (
    <div className=' flex flex-col bg-black rounded-[30px] text-white text-center mr-[46px] mb-[166px] p-8  '>
      <img
        src={profile}
        alt='profile'
        className='w-[107px] h-[107px] self-center mt-[30px] rounded-full '
      />
      <h1 className='font-header font-bold text-[25px] leading-[38px]'>
        {name}
      </h1>
      <h4 className='text-[25px] leading-[33px] mb-5'>{role}</h4>
      {/* <p className='w-[270px] text-[25px] font-extralight leading-[33px] mb-[63px] mx-[30px]'>{description}</p> */}
    </div>
  )
}

export default Team
