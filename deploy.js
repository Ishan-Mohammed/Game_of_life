const { ethers } = require("hardhat");

async function main() {
  const WakeUpPoints = await ethers.getContractFactory("WakeUpPoints");
  const contract = await WakeUpPoints.deploy();
  await contract.waitForDeployment(); // use this in ethers v6
  console.log("✅ WakeUpPoints contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
