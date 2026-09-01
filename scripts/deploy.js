const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await ethers.provider.getBalance(deployer.address)).toString());

  const GameCardMarketplace = await ethers.getContractFactory('GameCardMarketplace');
  const marketplace = await GameCardMarketplace.deploy();

  await marketplace.waitForDeployment();

  const address = await marketplace.getAddress();
  console.log('GameCardMarketplace deployed to:', address);
  console.log('Network:', (await ethers.provider.getNetwork()).name);
  console.log('Deployment complete.');

  const fs = require('fs');
  const path = require('path');

  const abiPath = path.join(__dirname, '..', 'artifacts', 'contracts', 'GameCardMarketplace.sol', 'GameCardMarketplace.json');

  if (fs.existsSync(abiPath)) {
    const artifact = require(abiPath);
    const abiOutputPath = path.join(__dirname, '..', 'contract-abi.json');
    fs.writeFileSync(abiOutputPath, JSON.stringify(artifact.abi, null, 2));
    console.log('ABI exported to:', abiOutputPath);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
