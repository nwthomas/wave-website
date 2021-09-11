async function main() {
  const [owner, randoPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();
  console.log("The contract deployed to:", waveContract.address);
  console.log("The contract deployed by:", owner.address);

  let waveCount = await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave("First wave!");
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();

  waveTxn = await waveContract.connect(randoPerson).wave("Hey you guyyyyys!");
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();

  waveTxn = await waveContract.connect(randoPerson).wave("Whatsup?");
  await waveTxn.wait();
  waveTxn = await waveContract.connect(randoPerson).wave("LOL");
  await waveTxn.wait();

  const randoWaveCount = await waveContract.getAddressWaves(
    randoPerson.address
  );

  waveCount = await waveContract.getTotalWaves();

  const allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
  console.log(waveCount.toNumber());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
