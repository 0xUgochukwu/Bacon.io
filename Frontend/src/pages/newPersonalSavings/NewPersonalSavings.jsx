import React, { useState, useContext, useEffect } from 'react'
import { loading, viewReport } from '../../assets'
import { Jumbotron, ProgramItem, ProgressBar, Wallet } from '../../components'
import { AnnualBudgetContext } from '../../context/AnnualBudgetContext'

const PersonalSavingsDetails = () => {
  const {
    viewbudget,
    removeItem,
    isLoading,
    getUnLockTime,
    deposit,
    withdraw,
  } = useContext(AnnualBudgetContext)
  const [items, setItems] = useState([])
  const [unlockTime, setUnlockTime] = useState(0)
  const [isDeposting, setIsDepositing] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [amount, setAmount] = useState('')

  useEffect(() => {
    ;(async () => {
      const items = await viewbudget()
      if (items) {
        const formatedItems = items.map((item) => ({
          itemName: item.item,
          cost: item.maticAmount.toString(),
          key: item.ID,
        }))
        setItems(formatedItems)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const time = await getUnLockTime()
      setUnlockTime(time)
    })()
  }, [])

  // console.log(unlockTime, "time");

  const removeOneItem = (id) => {
    const updatedItems = items.filter((item) => item.key != id)
    setItems(updatedItems)
  }
  const handleRemove = async (id) => {
    await removeItem(id)
    removeOneItem(id)
  }

  const handleDeposit = () => {
    setIsDepositing(true)
    setShowForm(true)
  }

  const depositAmount = async(e) => {
    e.preventDefault()
    console.log(amount)
    await deposit(amount)
    location.reload()
  }
  
  const handleWithdraw = () =>{
    withdraw()
  }

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
              {isLoading ? (
                <div className='w-[100%] flex justify-center items-center'>
                  <img src={loading} alt='' />
                </div>
              ) : (
                <table className='w-[100%]  m-w-[450px]'>
                  <thead>
                    <tr>
                      <th
                        className='p-4 font-bold text-[20px] leading-6 font-main text-left'
                        colSpan={2}
                      >
                        Item
                      </th>
                      <th className='p-4 font-bold text-[20px] leading-6 font-main text-left'>
                        Cost
                      </th>
                      <th className='p-4 font-bold text-[20px] leading-6 font-main text-left'>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!items.length ? (
                      <tr>
                        <td></td>
                        <td className='text-center' colSpan={2}>
                          <div className='text-center'>
                            <Jumbotron message='No Items' />
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <>
                        {items.map((item) => (
                          <ProgramItem
                            key={item.key}
                            item={item}
                            editable={false}
                            onRemove={handleRemove}
                          />
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              )}
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
          {isLoading ? loading : 
          <div className='flex gap-4'>
            { showForm ? 
              <form onSubmit={depositAmount}>
                <div className='flex flex-col mt-1 mb-6'>
                  <input
                    className='outline-none text-[13px] rounded-sm p-2 text-[#212121] leading-[12px] w-full'
                    placeholder='amount'
                    onChange={(e) => setAmount(e.target.value)}
                    type='text'
                    required
                  />
                  <button className='button p-[8px] rounded-[20px] my-5 items-center font-normal font-main text-[20px] cursor-pointer'>
                    deposit
                  </button>
                </div>
              </form>:
              (
             <button
              onClick={handleDeposit}
              className='button p-[8px] rounded-[20px] my-16 items-center font-normal font-main text-[20px]'
            >
              Deposit
            </button>)}
            {!isDeposting &&
              <button onClick={handleWithdraw} className='button p-[8px] rounded-[20px] my-16 items-center font-normal font-main text-[20px]'>
                Widthraw
              </button>
            }
          </div>
}
        </div>
      </main>
    </div>
  )
}

export default PersonalSavingsDetails
