// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BudgetDapp {
  

    // ===========================
    // EVENTS
    // ===========================

    event ItemRemoved(uint256 indexed ID);
    // event ChangeOwner(address oldOwner, address newOwner);
    // event ChangeUnlockTime(address onwer, uint256 unlockTime);
    event Withdrawal(uint256 amount, uint256 when);
    event BudgetCreated(uint256 indexed ID, uint256 indexed amount, string content, bool created);

    // ===========================
    // CUSTOM ERROR
    // ===========================

    error transferFailed();
    error amountEqualZero();
    error notOwner();
    error notYetTime();

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
    
    modifier isOnwer(){
        require(msg.sender == owner);
        _;
    }

    // @param _maticContractAddress to initialize the token used to transact with the contract
    // @param _unLockTime to fix the unlocktime for the budget period
    constructor(address _maticContractAddress, uint256 _unLockTime)  {
        require(block.timestamp < _unLockTime, "Not Yet Christmas");

        unlockTime = _unLockTime;
        maticContractAddress = ERC20(_maticContractAddress);
        owner = payable(msg.sender);
    
    }
    
    function changeOwner(address _newOwner) public isOwner returns (bool success) {
        require(_newOwner != 0, "No new onwer entered");

        onwer = _newOwner;
        emit ChangeOwner(msg.sender, _newOwner);

        return true;
    }

    function changeUnlockTime(_unlockTime) public isOnwer returns (bool success){
        require(block.timestamp < _unlockTime, "Increase time please");

        unlockTime = _unlockTime;
        emit ChangeUnlockTime(msg.sender, _unlockTime);

        return true;
    }

    // @notice this function is used to create new budget and add to the list of budgets
    function createBudget(string memory _content, uint256 _maticAmount) public isOwner {
        require(Budgets[budgetCount].created == false, "Item already created");

        budgetItem memory item = Budgets[budgetCount];
        item.ID = budgetCount;
        item.maticAmount = _maticAmount;
        item.content = _content;
        item.created = true;

        myBudgetList.push(item);

        emit BudgetCreated(budgetCount, _maticAmount, _content, true);
        budgetCount++;
    }

    // @notice this function is used to read the list of budget created on the contract
    function getBudget() external view returns (budgetItem[] memory) {
        return myBudgetList;
    }

    function getBudgetBalance() public view returns (uint256) {
        return ERC20(maticContractAddress).balanceOf(address(this));
    }

    // @notice this function is used to remove item from the list of budgets
    function removeBudget (uint256 _ID) public isOnwer{
        uint256 length = myBudgetList.length;

        for (uint256 i = 0; i < length; i++) {
            if (myBudgetList[i].ID == _ID) {
                delete myBudgetList[i];
                break;
            }
        }

        emit ItemRemoved(_ID);
    }

    // @notice this function is used to withdraw the total token locked up on the contract and transfer to owner
    function withdraw() public isOnwer {
        require(block.timestamp >= unlockTime, "Not yet time");

        uint256 amount = ERC20(maticContractAddress).balanceOf(address(this));
        require(amount > 0, "Balance is too low");

        bool success = ERC20(maticContractAddress).transfer(owner, amount);
        require(success, "Transaction failed.");

        emit Withdrawal(amount, block.timestamp);
    }

    // @notice this function is used to deposit funds for future use at the end of unlocktime
   function depositIntoBudget(uint256 amount) public isOnwer payable {
        require(msg.sender != address(0), "Invalid Address");

        require(
            ERC20(maticContractAddress).balanceOf(msg.sender) > 0,
            "Insufficient matic balance"
        );
        require(amount >= 0, "Amount is equal to zero");

        bool success = ERC20(maticContractAddress).transferFrom(
            msg.sender,
            address(this),
            amount
        );
        require(success, "Transaction failed.");

        initialBudgetFunds += amount;
    }
}
