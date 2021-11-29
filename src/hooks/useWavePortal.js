import { useCallback, useState, useEffect } from "react";
import { ethers } from "ethers";

export const useWavePortal = (contractAddress, contractABI) => {
  const [totalWaves, setTotalWaves] = useState(0);
  const [lastWaveDate, setLastWaveDate] = useState(null);
  const [waves, setWaves] = useState([]);
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
      const waves = await wavePortalContract.getTotalWaves();
      setTotalWaves(waves.toNumber());
      const lastWave = await wavePortalContract.getLastWaveDate();
      setLastWaveDate(
        lastWave.toNumber() > 0 ? new Date(lastWave.toNumber() * 1000) : null
      );
      setError(null);
    } catch (err) {
      setLastWaveDate(null);
      setError(err);
    }
  }, [contractAddress, contractABI]);

  useEffect(() => {
    checkStats();
  }, [checkStats]);

  const sendWave = async (message) => {
    try {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const waveTxn = await wavePortalContract.wave(message);

      await waveTxn.wait();
      checkStats();
    } catch (err) {
      setError(err);
    }
  };

  const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const waveList = await wavePortalContract.getAllWaves();
      /*
       * We only need address, timestamp, and message in our UI so let's
       * pick those out
       */
      let wavesCleaned = [];
      waveList.forEach((item) => {
        wavesCleaned.push({
          address: item.waver,
          timestamp: new Date(item.timestamp * 1000),
          message: item.message,
        });
      });
      setWaves(wavesCleaned);
    } catch (err) {
      setError(err);
    }
  };

  return {
    lastWaveDate,
    totalWaves,
    error,
    sendWave,
    getAllWaves,
    waves,
  };
};
