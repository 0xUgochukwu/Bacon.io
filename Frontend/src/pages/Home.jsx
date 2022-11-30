import React from 'react'
import { Hero, Team, Footer } from '../components/index'
import team from '../assets/data'

const Home = () => {
  return (
    <>
      <section >
        <Hero />
      </section>
      <section className='flex flex-col team mt-[200px]'>
        <h1 className='text-[48px] leading-[20px] font-header font-bold text-center '>
          Meet the team
        </h1>
        <div className=' flex justify-center mt-[46px] mx-[99px] flex-wrap  '>
          {team.map((team, index) => {
            return <Team key={index} {...team} />
          })}
        </div>
      </section>
    </>
  )
}

export default Home
