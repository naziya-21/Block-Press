const hre = require("hardhat");

async function main() {
  console.log("Deploying Database contract...");
  
  const Database = await hre.ethers.getContractFactory("Database");
  const database = await Database.deploy();
  
  await database.waitForDeployment();
  
  const address = await database.getAddress();
  console.log("Database deployed to:", address);
  
  // Save the deployment address to a config file
  const fs = require("fs");
  const config = {
    contractAddress: address,
    network: hre.network.name,
    deployedAt: new Date().toISOString()
  };
  
  fs.writeFileSync(
    "./config.json",
    JSON.stringify(config, null, 2)
  );
  
  console.log("Contract address saved to config.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

