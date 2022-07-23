const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });

  await waveContract.deployed();

  let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);

  const waveTxn = await waveContract.connect(owner).wave("This is wave #1", "👋");
  await waveTxn.wait();
  const waveTxn2 = await waveContract.connect(randomPerson).wave("This is wave #2", "👋");
  await waveTxn2.wait();

  waveCount = await waveContract.getTotalWaves();

  let allWaves = await waveContract.getAllWaves();

  console.log("Contract address:", waveContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));
  console.log("Wave count:", waveCount);
  console.log(allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();