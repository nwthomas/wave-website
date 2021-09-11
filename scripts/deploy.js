async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const accountBalance = await deployer.getBalance().toString();
  console.log("Account balance:", accountBalance);

  const Token = await hre.ethers.getContractFactory("WavePortal");
  const token = await Token.deploy();

  console.log("WavePortal address:", token.address);
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
