import React from 'react'
import { Link } from 'react-router-dom'
import { backtoTop } from '../assets/index'

const Footer = () => {
  return (
    <>
      <div className='flex justify-between items-center px-[82px]  text-texts'>
        <div className='text-white font-bold text-[30px] font-header leading-[46px] cursor-pointer'>
          Bacon.
          <p className='inline font-header text-white font-normal text-[25px] leading-[37.8px]'>
            &#169; 2022
          </p>
        </div>
        <div className=' flex justify-evenly items-center w-[536px] '>
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
        <div>
          <img src={backtoTop} alt=' back to top' />
        </div>
      </div>
    </>
  )
}

export default Footer
