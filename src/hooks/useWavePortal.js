import { useCallback, useState, useEffect } from "react";
import { ethers } from "ethers";

export const useWavePortal = (contractAddress, contractABI) => {
  const [totalWaves, setTotalWaves] = useState(0);
  const [lastWaveDate, setLastWaveDate] = useState(null);
  const [error, setError] = useState(null);

  const checkStats = useCallback(async () => {
    try {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      console.log(wavePortalContract);
      const waves = await wavePortalContract.getTotalWaves();
      setTotalWaves(waves.toNumber());
      const lastWave = await wavePortalContract.getLastWaveDate();
      setLastWaveDate(new Date(lastWave.toNumber() * 1000));
      setError(null);
    } catch (err) {
      setLastWaveDate(null);
      setError(err);
    }
  }, [contractAddress, contractABI]);

  useEffect(() => {
    checkStats();
  }, [checkStats]);

  const sendWave = async () => {
    try {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const waveTxn = await wavePortalContract.wave();

      await waveTxn.wait();
      checkStats();
    } catch (err) {
      setError(err);
    }
  };

  return {
    lastWaveDate,
    totalWaves,
    error,
    sendWave,
  };
};
