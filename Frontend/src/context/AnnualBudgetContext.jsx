import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../utills/constant'
import { useDisconnect } from 'wagmi'

export const AnnualBudgetContext = React.createContext()

const { ethereum } = window

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const annualBudgetContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  )
  return annualBudgetContract
}

export const AnnualBudgetProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('')
  const [isLoading, isSetLoading] = useState(false)
  const [budgetId, setBudgetId] = useState(localStorage.getItem('budgetId'))
  const [unlockTime, setUnclockTime] = useState('')

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please Install metamask')
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      setCurrentAccount[accounts[0]]
      location.reload()
    } catch (error) {
      console.log(error)
      throw new Error('no ethereum object')
    }
  }

  const disconnectWallet = async () => {
    try {
      const disconnect = useDisconnect({
        onError(error) {
          console.log('Error', error)
        },
      })
    } catch (error) {}
  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert('Please Install metamask')

      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if (accounts.length) {
        //setting connected address as the current working address
        setCurrentAccount(accounts[0])
      } else {
        console.log('no account connected ')
      }
      console.log(accounts)
    } catch (error) {
      console.log(error)
      throw new Error('no ethereum object')
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  // add items to the budget list
  const createBudget = async (items) => {
    try {
      if (!ethereum) return alert('Please Install metamask')
      const annualBudgetContract = getEthereumContract()
      items.forEach(async (item) => {
        const { itemName, cost } = item
        const budgetItem = await annualBudgetContract.createBudget(
          itemName,
          cost
        )
        isSetLoading(true)
        console.log(`hash is - ${budgetItem.hash}`)
        await budgetItem.wait()
        isSetLoading(false)
        console.log(`hash is - ${budgetItem.hash}`)

        // const budgetId = await annualBudgetContract.budgetCount()
        // console.log(budgetId)
        // setBudgetId(budgetId.toNumber())
      })
    } catch (error) {
      console.log(error)
    }
  }

  const viewbudget = async () => {
    try {
      if (!ethereum) return alert('Please Install metamask')
      const annualBudgetContract = getEthereumContract()
      const budgetList = await annualBudgetContract.myList()
      console.log(budgetList)
      return budgetList
    } catch (error) {
      console.log(error)
    }
  }

  const viewItem = async (id) =>{
    try {
      isSetLoading(true)
         if (!ethereum) return alert('Please Install metamask')
         const annualBudgetContract = getEthereumContract()
         const listIterm = await annualBudgetContract.listItem(id)
        console.log(listIterm)
    } catch (error) {
        
    }finally{
      isSetLoading(false)
    }
  }
  const removeItem = async() =>{
    try {
      isSetLoading(true)
         if (!ethereum) return alert('Please Install metamask')
         const annualBudgetContract = getEthereumContract()
         const txnhash = await annualBudgetContract.removeItems(id)
         txnhash.wait()
         console.log(txnhash)
    } catch (error) {
        
    } finally{
      isSetLoading(false)
    }
  }
  const getUnLockTime = async() =>{
    try {
         if (!ethereum) return 
         const annualBudgetContract = getEthereumContract()
         const res = await annualBudgetContract.unlockTime()
         return res.toString()
    } catch (error) {
        
    } 
  }
  const deposit = async (cost) => {
    try {
      if (!ethereum) return alert('Please Install metamask')
      const annualBudgetContract = getEthereumContract();
      console.log(cost)
      const mint = await annualBudgetContract
    //   ._mint(
    //     contractAddress,
    //     ethers.utils.parseEther('1')
    //   )
    //    const bal = await matic.balanceOf(otherAccount.address)
      console.log(mint)




    //   const parseCost = ethers.utils.parseEther(cost)
    //   console.log(cost)
    //   const depositBudgetxn = await annualBudgetContract
    //     .depositBudgetFund(parseCost)
    //     .send({
    //       from: currentAccount,
    //       value: parseCost._hex,
    //       gas: '2100000',
    //       gasPrice: '8000000000',
    //     })
    //   console.log(cost)
    //   await depositBudgetxn.wait()

      // console.log(depositBudgetxn)
    } catch (error) {}
  }

  return (
    <AnnualBudgetContext.Provider
      value={{
        connectWallet,
        currentAccount,
        checkIfWalletIsConnected,
        disconnectWallet,
        createBudget,
        viewbudget,
        deposit,
        removeItem,
        viewItem,
        isLoading,
        isSetLoading,
        getUnLockTime,
        unlockTime
      }}
    >
      {children}
    </AnnualBudgetContext.Provider>
  )
}
