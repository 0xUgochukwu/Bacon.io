import React from 'react'
import { Link } from 'react-router-dom'

const Topbar = () => {
  return (
    <div className='flex justify-between items-center px-[82px] pt-[25.5px] text-texts'>
      <div className='text-white font-bold text-[30px] font-header leading-[46px] cursor-pointer'>
        Bacon.
      </div>
      <div className=' flex justify-evenly items-center w-[536px] '>
        <Link to='/'>
          <button>Home</button>
        </Link>
        <Link to='/about'>
          <button>About</button>
        </Link>
        <Link to='/docs'>
          <button>Docs</button>
        </Link>
        <Link to='/community'>
          <button>Community</button>
        </Link>
        <Link to='/ecosystem'>
          <button>Ecosystem</button>
        </Link>
      </div>

      <Link to='/new-program'>
        <div className='font-main py-[10px] px-[24px]  rounded-[20px] button font-bold text-[25px] flex items-center leading-[33px] cursor-pointer'>
          New Program
        </div>
      </Link>
    </div>
  )
}

export default Topbar
