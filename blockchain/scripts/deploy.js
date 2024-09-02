const hre = require("hardhat");

const main = async () => {
  const Identity = await hre.ethers.deployContract("Identity");
  await Identity.waitForDeployment();
  console.log("Deployed Contract Address is", Identity.target);
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

// 0xB4Fa12a0b53644C015364350b85073F8D3CCc2ef
