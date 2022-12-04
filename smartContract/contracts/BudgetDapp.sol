// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BudgetDapp {
  

    // ===========================
    // EVENTS
    // ===========================

    event ItemRemoved(uint256 indexed ID);
    event Withdrawal(uint256 amount, uint256 when);
     event BudgetCreated(
        uint256 indexed ID,
        uint256 indexed amount,
        string indexed content,
        bool created
    );

    // ===========================
    // CUSTOM ERROR
    // ===========================

    error transferFailed();
    error amountEqualZero();
    error notOwner();
    error notYetTime();
    error invalidAddress();

    // ===========================
    // STATE VARIABLE
    // ===========================

    uint256 public unlockTime;
    uint256 public budgetCount = 0;
    uint256 public initialBudgetFunds;
    address payable public owner;
    ERC20 public maticContractAddress;

    struct budgetItems {
        uint256 ID;
        uint256 maticAmount;
        string item;
        bool created;
    }

    budgetItems[] myBudgetList;

    mapping(uint256 => budgetItems) public Budgets;

    // @param _maticContractAddress to initialize the token used to transact with the contract
    // @param _unLockTime to fix the unlocktime for the budget period
    constructor(address _maticContractAddress, uint256 _unLockTime)  {
        require(block.timestamp < _unLockTime, "Not Yet Christmas");

        unlockTime = _unLockTime;
        maticContractAddress = ERC20(_maticContractAddress);
        owner = payable(msg.sender);
    
    }

    // @notice this function is used to create new budget and add to the list of budgets
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

    // @notice this function is used to read the list of budget created on the contract
    function myList() external view returns(budgetItems[] memory){
        return myBudgetList;
    } 

    // @notice this funtion is used to read the item of the list according to the item id
    function listItem(uint256 _ID) external view returns(budgetItems memory value){
        uint256 length = myBudgetList.length;

        for(uint256 i; i < length;i++){
        
            value =  myBudgetList[_ID];   
        }
    }

    function balance() public view returns(uint256 contractBalance){
        return ERC20(maticContractAddress).balanceOf(address(this));
    }

    // @notice this function is used to remove item from the list of budgets
    function removeItems(uint256 _ID) public {
     if (msg.sender == address(0x0)) {
            revert invalidAddress();
        }
        uint256 length = myBudgetList.length;

        for(uint256 i; i < length;i++){
    
            delete myBudgetList[_ID];   
        }

    }

    // @notice this function is used to withdraw the total token locked up on the contract and transfer to owner
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

    // @notice this function is used to deposit funds for future use at the end of unlocktime
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
