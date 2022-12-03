import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../utills/constant'
import { useDisconnect } from 'wagmi'

export const AnnualBudgetContext = React.createContext()

const { ethereum } = window
const provider = new ethers.providers.Web3Provider(ethereum)

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
    const [contractBalance, setContractBalance] = useState(0)
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
    balance()
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
      })
    } catch (error) {
      console.log(error)
    }
  }
  const balance = async () => {
    //await matic.balanceOf(contractAddress)
    const bal = await provider.getBalance(contractAddress)
    console.log(bal)
    isSetLoading(true)

    let value = ethers.utils.formatEther(bal._hex)
    console.log(value)
    setContractBalance(value)
    isSetLoading(false)
    console.log(contractBalance)
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

  const viewItem = async (id) => {
    try {
      isSetLoading(true)
      if (!ethereum) return alert('Please Install metamask')
      const annualBudgetContract = getEthereumContract()
      const listIterm = await annualBudgetContract.listItem(id)
      console.log(listIterm)
    } catch (error) {
    } finally {
      isSetLoading(false)
    }
  }
  const removeItem = async () => {
    try {
      isSetLoading(true)
      if (!ethereum) return alert('Please Install metamask')
      const annualBudgetContract = getEthereumContract()
      const txnhash = await annualBudgetContract.removeItems(id)
      txnhash.wait()
      console.log(txnhash)
    } catch (error) {
    } finally {
      isSetLoading(false)
    }
  }
  const getUnLockTime = async () => {
    try {
      if (!ethereum) return
      const annualBudgetContract = getEthereumContract()
      const res = await annualBudgetContract.unlockTime()
      return res.toString()
    } catch (error) {}
  }
  const mint = async (value) => {
    try {
      if (!ethereum) return alert('Please Install metamask')
      const annualBudgetContract = getEthereumContract()
      const matic = getTokenContract()
      const mint = await matic.mint(currentAccount, value)
      isSetLoading(true)
      mint.wait()
      console.log(mint.hash)
      isLoading(false)
    } catch (error) {}
  }
  const deposit = async (cost) => {
    try {
      if (!ethereum) return alert('Please Install metamask')
      const annualBudgetContract = getEthereumContract()
      const matic = getTokenContract()

      const approval = await matic.approve(contractAddress, cost)
      isSetLoading(true)
      approval.wait()
      console.log(approval.hash)
      const depositFund = await annualBudgetContract.depositBudgetFund(1, {
        value: ethers.utils.parseUnits(cost, 'ether'),
      })
      depositFund.wait()
      console.log(depositFund.hash)
      balance()
      isSetLoading(false)
    } catch (error) {
      throw new Error('insuffient funds')
    }
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
        unlockTime,
        balance,
        contractBalance,
        mint,
      }}
    >
      {children}
    </AnnualBudgetContext.Provider>
  )
}
