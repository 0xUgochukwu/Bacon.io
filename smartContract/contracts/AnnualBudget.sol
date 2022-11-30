// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AnnualBudget {
    uint256 public unlockTime;
    uint256 public budgetCount = 0;
    uint256 public initialBudgetFunds;
    address payable public owner;
    ERC20 public maticContractAddress;

    event ItemRemoved(uint256 indexed ID);

    event Withdrawal(uint256 amount, uint256 when);

    error transferFailed();
    error amountEqualZero();
    error notOwner();
    error notYetTime();
    error doesNotExist();

    event BudgetCreated(
        uint256 indexed ID,
        uint256 indexed amount,
        string indexed content,
        bool created
    );

    struct budgetItems {
        uint256 ID;
        uint256 maticAmount;
        string item;
        bool created;
    }

    budgetItems[] myBudgetList;

    mapping(uint256 => budgetItems) public Budgets;
    mapping(uint256 => bool) public removeItem;

    constructor(address _maticContractAddress, uint256 _unLockTime)  {
        require(block.timestamp < _unLockTime, "Not Yet Christmas");

        unlockTime = _unLockTime;
        maticContractAddress = ERC20(_maticContractAddress);
        owner = payable(msg.sender);
    
    }

    function createBudget(string memory _item, uint256 _maticAmount) public {
       
        if (Budgets[budgetCount].created == true) {
            revert("Item already created");
        }

        budgetItems memory itemOnlist = Budgets[budgetCount];
        itemOnlist = budgetItems(budgetCount, _maticAmount, _item, true);
        myBudgetList.push(itemOnlist);
        

        emit BudgetCreated(budgetCount, _maticAmount, _item, true);
        budgetCount++;
    }

    function myList() external view returns(budgetItems[] memory){
        return myBudgetList;
    } 

    function listItem(uint256 _ID) external view returns(budgetItems memory){
        return Budgets[_ID];
    }

    function balance() public view returns(uint256 contractBalance){
        return ERC20(maticContractAddress).balanceOf(address(this));
    }

    function removeItems(uint256 _ID) public {
        if (msg.sender == owner) {
            revert notOwner();
        }

        if (removeItem[_ID] == true) {
            revert doesNotExist();
        }

        emit ItemRemoved(_ID);
        delete Budgets[_ID];
    }

    function withdraw() public {
        if (block.timestamp <= unlockTime) 
        revert ("Not Yet Time");
        
        if (msg.sender != owner){
            revert ("Not Owner");
        
        } 
            

        uint256 amount = ERC20(maticContractAddress).balanceOf(address(this));

        if(amount == 0) revert amountEqualZero();

        emit Withdrawal(amount, block.timestamp);

        bool success = ERC20(maticContractAddress).transfer(owner, amount);
        if(!success) revert transferFailed();

    }

    function depositBudgetFund(uint256 amount) public payable {
        require(msg.sender != address(0), "Invalid Address");
        require(
            ERC20(maticContractAddress).balanceOf(msg.sender) > 0,
            "Insufficient matic balance"
        );

        if(amount == 0) revert amountEqualZero();

       bool success = ERC20(maticContractAddress).transferFrom(
            msg.sender,
            address(this),
            amount
        );

        if(!success) revert transferFailed();

        initialBudgetFunds += amount;
    }
}
