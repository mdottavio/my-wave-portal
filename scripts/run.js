const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  /*
   * Get Contract balance
   */
  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let waveCount;
  let lastWaveDate;
  waveCount = await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave("first msg");
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
  lastWaveDate = await waveContract.getLastWaveDate();
  console.log("Last wave on %s", new Date(lastWaveDate * 1000));

  waveTxn = await waveContract.connect(randomPerson).wave("another msg");
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
  lastWaveDate = await waveContract.getLastWaveDate();
  console.log("Last wave on %s", new Date(lastWaveDate * 1000));

  /*
   * Get Contract balance to see what happened!
   */
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  /**
   * Let's send a few waves!
   */
  waveTxn = await waveContract.wave("A message!");
  await waveTxn.wait(); // Wait for the transaction to be mined

  waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
  await waveTxn.wait(); // Wait for the transaction to be mined

  let allWaves = await waveContract.getAllWaves();
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
