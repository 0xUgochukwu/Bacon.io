import React, { useEffect, useState } from 'react'

import { ethers } from 'ethers'
import {
  contractABI,
  contractAddress,
  TokenABI,
  TokenAddress,
} from '../utills/constant'
import detectEthereumProvider from '@metamask/detect-provider'

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

const getTokenContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const matic = new ethers.Contract(TokenAddress, TokenABI, signer)
  return matic
}

export const AnnualBudgetProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('')
  const [isLoading, isSetLoading] = useState(false)
  const [contractBalance, setContractBalance] = useState(0)

  const matic = getTokenContract()

  function h2d(s) {
    function add(x, y) {
      var c = 0,
        r = []
      var x = x.split('').map(Number)
      var y = y.split('').map(Number)
      while (x.length || y.length) {
        var s = (x.pop() || 0) + (y.pop() || 0) + c
        r.unshift(s < 10 ? s : s - 10)
        c = s < 10 ? 0 : 1
      }
      if (c) r.unshift(c)
      return r.join('')
    }

    var dec = '0'
    s.split('').forEach(function (chr) {
      var n = parseInt(chr, 16)
      for (var t = 8; t; t >>= 1) {
        dec = add(dec, dec)
        if (n & t) dec = add(dec, '1')
      }
    })
    return dec
  }

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
      console.log('hi')
      // ethereum.on('disconnect', handler: (error: ProviderRpcError) => void)
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
        budgetItem.wait()
        
        console.log(`hash is - ${budgetItem.hash}`)
        budgetItem.wait()
        

      })
      isSetLoading(false)
      
     
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
    } catch (error) {
      console.log(error)
    }
  }

  const viewItem = async (id) => {
    try {
      if (!ethereum) return alert('Please Install metamask')
      const annualBudgetContract = getEthereumContract()
      const listIterm = await annualBudgetContract.listItem(id)
      console.log(listIterm)
    } catch (error) {
      console.log(error)
    }
  }
  const removeItem = async (id) => {
    try {
      if (!ethereum) return alert('Please Install metamask')
      const annualBudgetContract = getEthereumContract()
      const txnhash = await annualBudgetContract.removeItems(id)
      txnhash.wait()
      console.log(txnhash)
    } catch (error) {
      console.log(error)
    }
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

  const balance = async () => {
    const bal = await matic.balanceOf(contractAddress)
    isSetLoading(true)
    let dbalance = h2d(bal._hex)
    let value = dbalance.slice(dbalance.length - 1)
    console.log(value)
    setContractBalance(value)
    isSetLoading(false)
    console.log(contractBalance)
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
        mint,
        balance,
        contractBalance
      }}
    >
      {children}
    </AnnualBudgetContext.Provider>
  )
}
