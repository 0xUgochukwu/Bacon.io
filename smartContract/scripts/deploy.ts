import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;


  const MaticToken = await ethers.getContractFactory("MaticToken");
  const matic = await MaticToken.deploy("Matic","MT");

  const AnnualBudget = await ethers.getContractFactory("AnnualBudget");
  const annualbudget = await AnnualBudget.deploy(matic.address, unlockTime );

  await annualbudget.deployed();

  console.log(`Budget with unlock timestamp ${unlockTime} deployed to ${annualbudget.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
