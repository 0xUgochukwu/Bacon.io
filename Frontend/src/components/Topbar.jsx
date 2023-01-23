import React from 'react'
import { Link } from 'react-router-dom'
import { PROGRAMS_ROUTE } from '../constants/routes'
import { menu, close } from '../assets/index'
import { useState } from 'react'

const Topbar = () => {
  const [openMobile, setOpenMobile] = useState(false);
  const handleOpenMobile = () => {
    setOpenMobile(!openMobile)
  }
  return (
    <>
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

        <Link to={PROGRAMS_ROUTE}>
          <div className='hidden md:flex font-main py-[10px] px-[24px]  rounded-[20px] button font-bold text-[25px] items-center leading-[33px] cursor-pointer'>
            Programs
          </div>
        </Link>
        <div
          onClick={handleOpenMobile}
          className={`md:hidden w-[30.92px] h-[30.92px] cursor-pointer`}
        >
          {openMobile ? (
            <img src={close} alt='menu' className='w-full h-full ' />
          ) : (
            <img src={menu} alt='close' className='w-full h-full menu' />
          )}
        </div>
      </div>

      {/* mobile menu */}
      {openMobile && (
        <div className=' absolute w-full h-full backdrop-blur-xl '>
          <div className='border  px-[17px] flex flex-col w-screen '>
            <Link to='/'>
              <button className=' pb-[20px] text-[25px] leading-[38px] font-light'>
                Home
              </button>
            </Link>
            <Link to='/about'>
              <button className='pb-[20px] text-[25px] leading-[38px] font-light'>
                About
              </button>
            </Link>
            <Link to='/docs'>
              <button className='pb-[20px] text-[25px] leading-[38px] font-light'>
                Docs
              </button>
            </Link>
            <Link to='/community'>
              <button className='pb-[20px] text-[25px] leading-[38px] font-light'>
                Community
              </button>
            </Link>
            <Link to='/ecosystem'>
              <button className=' pb-[80px] text-[25px] leading-[38px] font-light'>
                Ecosystem
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default Topbar
