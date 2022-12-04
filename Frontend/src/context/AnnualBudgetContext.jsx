import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import {
  contractABI,
  contractAddress,
  payrollAddress,
  TokenABI,
  TokenAddress,
  PayrollABI,
  payrollTokenABI,
  payrollTokenAdress,
} from '../utills/constant'
import { useDisconnect } from 'wagmi'
import { keccak256 } from 'ethers/lib/utils.js'
import { MerkleTree } from 'merkletreejs'


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
const getTokenContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const matic = new ethers.Contract(TokenAddress, TokenABI, signer)
  return matic
}

const getPayrollContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const payroll = new ethers.Contract(payrollAddress, PayrollABI, signer)
  console.log(payroll)

}

const getPayrollTokenContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const payrollToken = new ethers.Contract(
    payrollTokenAdress,
    payrollTokenABI,
    signer
  )
  return payrollToken
}

export const AnnualBudgetProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('')
  const [isLoading, isSetLoading] = useState(false)
  const [contractBalance, setContractBalance] = useState(0)
const [unlockTime, setUnclockTime] = useState('')
const [encodeLeaf, setEncodeLeaf] = useState(localStorage.getItem('encodeLeaf'))

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
    getPayrollContract()
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
        window.location.href = "/programs/personal-savings-details"
        console.log(`hash is - ${budgetItem.hash}`)
      }) 
    } catch (error) {
      alert("Something went wrong, please reload the page and try again")
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
  const removeItem = async (id) => {
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
  const deposit = async (cost) => {
    try {
      if (!ethereum) return alert('Please Install metamask')
      const annualBudgetContract = getEthereumContract()
      const matic = getTokenContract()
      console.log(cost)
      console.log(matic)
      // minting
      const mint = await matic.mint(currentAccount,cost)
      isSetLoading(true)
      mint.wait()
      console.log(mint.hash)

      //approval
      const approval = await matic.approve(
        contractAddress,
        ethers.utils.parseUnits(cost, 'ether')
      )
      approval.wait()
      console.log(approval.hash)

      //deposit
      const depositFund = await annualBudgetContract.depositBudgetFund(1, {
        value: ethers.utils.parseUnits(cost, 'ether'),
      })
      depositFund.wait()
      console.log(depositFund.hash)
      balance()
      isSetLoading(false)
    } catch (error) {
      throw new Error('insuffient funds')
    } finally {
      isSetLoading(false)
    }
  }

  const withdraw = async () => {
    try {
      if (!ethereum) return alert('Please Install metamask')
      const annualBudgetContract = getEthereumContract()

      const widthraw = await annualBudgetContract.withdraw()
      isSetLoading(true)
      widthraw.wait()
      console.log(widthraw.hash)
      isSetLoading(false)
    } catch (error) {
      alert("You can't withdraw now, wait for unlock time to reach before you withdraw")
    }
  }

  const setPaymentDetails = async (addrList, salary, time) => {
    // time in string format
    try {
      const payroll = getPayrollContract()
      console.log(addrList, salary, time)
      const encode = addrList.map((addr) => keccak256(addr))
      setEncodeLeaf(encode)
      const merkleTree = new MerkleTree(encodeLeaf, keccak256, {
        sortPairs: true,
      })

      const rootHash = merkleTree.getHexRoot()
      console.log(rootHash)
      setRoot[rootHash]
      const details = await payroll.setPaymentDeatils(
        rootHash,
        ethers.utils.parseUnits(salary, 'ether'),
        time
      )
      details.wait()
      console.log(details.hash)
    } catch (error) {
      console.log(error)
      throw new Error('No allowed to call this. Admin only')
    }
  }

 const payrollDeposit = async (amount) => {
   try {
     const payroll = getPayrollContract()
     const payrollToken = getPayrollTokenContract()
     console.log(payrollToken)
     console.log(payroll)
     //minting payroll token for deposit
     const mint = await payrollToken.mint(
       currentAccount,
       ethers.utils.parseUnits(amount, 'ether')
     )
     isSetLoading(true)
     mint.wait()
     console.log(mint.hash)

     //approving
     const approval = await payrollToken.approve(
       payrollAddress,
       ethers.utils.parseUnits(amount, 'ether')
     )
     approval.wait()
     console.log(approval.hash)

     // depositing to the contract
     const deposit = await payroll.depositSalaryFunds(1, {
       value: ethers.utils.parseUnits(amount, 'ether'),
     })
     deposit.wait()
     console.log(deposit.hash)
     isSetLoading(false)
   } catch (error) {
     console.log(error)
   }
 }

  const setOwner = async () => {

  }

    const claimSalary = async (addrList) => {
      console.log('hi')
      try {
        const payroll = getPayrollContract()
        const merkleTree = new MerkleTree(encodeLeaf, keccak256, {
          sortPairs: true,
        })
        const leaf = keccak256(currentAccount)
        const proof = merkleTree.getHexProof(leaf)
        console.log(proof)
        const claim = await payroll.claimSalary(proof)
        claim.wait()
        console.log(claim.hash)
      } catch (error) {
        throw new Error('Not a valid member')
        console.log(error)
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
        withdraw,
        claimSalary,
        payrollDeposit,
        setPaymentDetails,
      }}
    >
      {children}
    </AnnualBudgetContext.Provider>
  )
}
