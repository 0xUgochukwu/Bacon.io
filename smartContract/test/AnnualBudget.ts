import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { assert, expect } from "chai";
import { ethers } from "hardhat";

describe("AnnualBudget", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployAnnualBudget() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const initalBudgetAmount = 0;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;
    const lockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const MaticToken = await ethers.getContractFactory("MaticToken");
    const matic = await MaticToken.deploy("Matic","MT");

    const AnnualBudget = await ethers.getContractFactory("AnnualBudget");
    const annualbudget = await AnnualBudget.deploy(matic.address, lockTime );

    return { annualbudget,matic, unlockTime, initalBudgetAmount, owner, otherAccount };
  }

  describe("Deployment", function () {
     it("checks Annual Budget contract is deployed successfully", async function () {
        const { annualbudget } = await loadFixture(deployAnnualBudget);
        assert.ok(annualbudget.address);
      });
    it("Should set the annual budget unlockTime", async function () {
      const { annualbudget, unlockTime } = await loadFixture(deployAnnualBudget);

      expect(await annualbudget.unlockTime()).to.equal(unlockTime);
    });

    it("Should set the right owner", async function () {
      const { annualbudget, owner } = await loadFixture(deployAnnualBudget);

      expect(await annualbudget.owner()).to.equal(owner.address);
    });

    it("Should set the Token contract address right", async function () {
      const { annualbudget, matic } = await loadFixture(
        deployAnnualBudget
      );

      expect(await annualbudget.maticContractAddress()).to.equal(
        matic.address
      );
    });

    it("Should equal inital contract balance ", async function () {
      const { annualbudget, initalBudgetAmount,matic } = await loadFixture(
        deployAnnualBudget
      );

      expect(await matic.balanceOf(annualbudget.address)).to.equal(
        initalBudgetAmount
      );
    });

    it("Should fail if the unlockTime is not in the future", async function () {
      // We don't use the fixture here because we want a different deployment
        const MaticToken = await ethers.getContractFactory("MaticToken");
        const matic = await MaticToken.deploy("Matic","MT");

      const latestTime = await time.latest();
      const AnnualBudget = await ethers.getContractFactory("AnnualBudget");
      await expect(AnnualBudget.deploy(matic.address,latestTime)).to.be.revertedWith(
        "Not Yet Christmas"
      );
    });
  });

  describe("Annual Budget", function () {
    
        it("Budget List", async function () {
        const { annualbudget } = await loadFixture(
          deployAnnualBudget
        );

        const budgetCount= await annualbudget.budgetCount()
        const budget = await annualbudget.Budgets(budgetCount)

        assert.equal(budget.ID.toNumber(), budgetCount.toNumber())
        assert.equal(budget.created, false)

      });
    
      it("Should create a budget and Emit event", async function () {
        const { annualbudget } = await loadFixture(
          deployAnnualBudget
        );

        const amount = ethers.utils.parseEther("10");
        const item = "Shoe";

        const Budget = await annualbudget.createBudget(item,amount);
        const budgetCount = await annualbudget.budgetCount();

        const receipt = await (await Budget.wait()).events;
    
        assert.equal(budgetCount.toNumber(), 1)

        await expect(annualbudget.createBudget("shoe",10))
  .to.emit(annualbudget, 'BudgetCreated')
  .withArgs(1, 10,"shoe", true);

      });
    });

  describe("Withdrawals", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called too soon", async function () {
        const { annualbudget } = await loadFixture(deployAnnualBudget);

        await expect(annualbudget.withdraw()).to.be.revertedWith(
          "Not Yet Time"
        );
      });

      it("Should revert with the right error if called from another account", async function () {
        const { annualbudget, unlockTime, otherAccount } = await loadFixture(
          deployAnnualBudget
        );


        // We can increase the time in Hardhat Network
        await time.increaseTo(unlockTime);

        // We use lock.connect() to send a transaction from another account
        await expect(annualbudget.connect(otherAccount).withdraw()).to.be.revertedWith(
          "Not Owner"
        );
      });

      it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
        const { annualbudget, unlockTime,matic,otherAccount } = await loadFixture(
          deployAnnualBudget
        );

        await matic.mint(otherAccount.address, ethers.utils.parseEther("200"));


        const bal = await matic.balanceOf(otherAccount.address);

        const funds = ethers.utils.parseEther("10");

        const spendingAmount = ethers.utils.parseEther("3");

         await matic
       .connect(otherAccount)
       .approve(annualbudget.address, funds);

        const depositFund = await annualbudget.connect(otherAccount).depositBudgetFund(funds)

        // Transactions are sent using the first signer by default
        await time.increaseTo(unlockTime);

        await expect(annualbudget.withdraw()).not.to.be.reverted;
      });
    });

    describe("Events", function () {
      it("Should emit an event on withdrawals", async function () {
        const { annualbudget, unlockTime, matic, otherAccount,owner } = await loadFixture(
          deployAnnualBudget
        );

        await matic.mint(otherAccount.address, ethers.utils.parseEther("200"));

        const bal = await matic.balanceOf(otherAccount.address);

        const funds = ethers.utils.parseEther("10");

        const spendingAmount = ethers.utils.parseEther("3");

         await matic
       .connect(otherAccount)
       .approve(annualbudget.address, funds);

        const depositFund = await annualbudget.connect(otherAccount).depositBudgetFund(funds)

       const christmasTime = await time.increaseTo(unlockTime);

        const contractBal = await matic.balanceOf(annualbudget.address)
        await annualbudget.connect(owner).withdraw()
       
        const ownerBal = await matic.balanceOf(owner.address)
        expect(ownerBal).to.equal(funds)
      });
       it("Should emit an event on withdrawals", async function () {
        const { annualbudget, unlockTime, matic, otherAccount,owner } = await loadFixture(
          deployAnnualBudget
        );

        await matic.mint(otherAccount.address, ethers.utils.parseEther("200"));

        const bal = await matic.balanceOf(otherAccount.address);

        const funds = ethers.utils.parseEther("10");

        const spendingAmount = ethers.utils.parseEther("3");

         await matic
       .connect(otherAccount)
       .approve(annualbudget.address, funds);

        const depositFund = await annualbudget.connect(otherAccount).depositBudgetFund(funds)

        await time.increaseTo(unlockTime);


        await expect(annualbudget.withdraw())
          .to.emit(annualbudget, "Withdrawal")
          .withArgs(funds,anyValue); // We accept any value as `when` arg
      });
    });

  
   });
});
