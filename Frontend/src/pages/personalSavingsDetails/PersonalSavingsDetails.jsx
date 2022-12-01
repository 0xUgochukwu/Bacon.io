import React, { useState, useContext } from 'react'
import { plus, programTitle, viewReport } from '../../assets'
import { Footer, ProgramItem, ProgressBar, Wallet } from '../../components'
import { AnnualBudgetContext } from '../../context/AnnualBudgetContext'

const PersonalSavingsDetails = () => {
  const { viewbudget } = useContext(AnnualBudgetContext)
  const [items] = useState([
    {
      key: 1,
      itemName: 'Television',
      cost: 1000,
      quantity: 5,
    },
    {
      key: 2,
      itemName: 'Table',
      cost: 4000,
      quantity: 2,
    },
    {
      key: 3,
      itemName: 'Monitor',
      cost: 70000,
      quantity: 10,
    },
    {
      key: 4,
      itemName: 'Other',
      cost: 1000,
      quantity: 2,
    },
  ])
  return (
    <div className='flex flex-col'>
      <main className='ml-[78px] mr-[66px] pt-16 mb-auto mb-16'>
        <div className='flex justify-between flex-wrap'>
          <div className='mb-4'>
            <h1 className='font-main font-bold text-[40px] leading-[52px]'>
              Savings Program Name
            </h1>
            <img src={viewReport} />
          </div>
          <Wallet />
        </div>
        <div className='px-[1px] py-[1px]  w-[100%] h-fit rounded-[20px] button flex flex-col items-center justify-center text-[25px] leading-[32.55px] font-bold font-main mt-16'>
          <div className='bg-[#08081E] w-[100%] h-[100%] rounded-[20px] p-4'>
            <div className='overflow-auto'>
              <table className='w-[100%]  m-w-[450px]'>
                <thead>
                  <tr>
                    <th
                      className='p-4 font-bold text-[20px] leading-6 font-main text-left'
                      colSpan={2}
                    >
                      Items
                    </th>
                    <th className='p-4 font-bold text-[20px] leading-6 font-main text-left'>
                      Quantity
                    </th>
                    <th className='p-4 font-bold text-[20px] leading-6 font-main text-left'>
                      Cost
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <ProgramItem key={item.key} item={item} editable={false} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='mt-[40px]'>
          <ProgressBar completed={50} bgcolor='red' />
        </div>

        <div className='flex mt-2'>
          <p className='font-normal text-[16px] font-main leading-6'>
            Savings Goal: 32% (134.4 ETH)
          </p>{' '}
          <p className='font-normal text-[16px] font-main leading-6 ml-20'>
            Time Left: 3 months, 12 Days
          </p>
        </div>
        <div className='flex justify-center'>
          <button className='button p-[8px] rounded-[20px] my-16 items-center font-normal font-main text-[20px]'>
            Widthraw
          </button>
        </div>
      </main>
    </div>
  )
}

export default PersonalSavingsDetails
