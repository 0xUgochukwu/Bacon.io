import React from 'react'
import { Link } from 'react-router-dom'
import { PROGRAMS_ROUTE } from '../constants/routes'
import { menu } from '../assets/index'

const Topbar = () => {
  return (
    <div className=' flex justify-between items-center px-[82px] pt-[25.5px] text-texts'>
      <div className='text-white font-normal text-[30px] font-header leading-[46px] cursor-pointer'>
        <Link to='/'>
          Bacon.
          <p className='md:hidden inline-block text-[#3940DE] leading-[54.43px] font-bold text-[36px]'>
            IO
          </p>
        </Link>
      </div>
      <div className='mdx:hidden flex justify-evenly items-center w-[536px] '>
        <Link to='/'>
          <button className=' text-[23px] leading-[38px] font-light'>
            Home
          </button>
        </Link>
        <Link to='/about'>
          <button className=' text-[23px] leading-[38px] font-normal'>
            About
          </button>
        </Link>
        <Link to='/docs'>
          <button className='text-[23px] leading-[38px] font-normal'>
            Docs
          </button>
        </Link>
        <Link to='/community'>
          <button className='text-[23px] leading-[38px] font-normal'>
            Community
          </button>
        </Link>
        <Link to='/ecosystem'>
          <button className=' text-[23px] leading-[38px] font-normal'>
            Ecosystem
          </button>
        </Link>
      </div>

      {/* mobile menu */}
      <div className='absolute top-[100px] right-0 capitalize mobile-menu '>
        <div className='relative flex flex-col w-screen '>
          <Link to='/'>
            <button className=' text-[23px] leading-[38px] font-light'>
              Home
            </button>
          </Link>
          <Link to='/about'>
            <button className=' text-[23px] leading-[38px] font-light'>
              about
            </button>
          </Link>
          <Link to='/docs'>
            <button className=' text-[23px] leading-[38px] font-light'>
              docs
            </button>
          </Link>
          <Link to='/community'>
            <button className=' text-[23px] leading-[38px] font-light'>
              community
            </button>
          </Link>
          <Link to='/ecosystem'>
            <button className=' text-[23px] leading-[38px] font-light'>
              ecosystem
            </button>
          </Link>
        </div>
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
