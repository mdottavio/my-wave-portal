import { useCallback, useState, useEffect } from "react";
import { ethers } from "ethers";

export const useWavePortal = (contractAddress, contractABI) => {
  const [totalWaves, setTotalWaves] = useState(0);
  const [lastWaveDate, setLastWaveDate] = useState(null);
  const [waves, setWaves] = useState([]);
  const [error, setError] = useState(null);
  const [contract, setContract] = useState(null);

  const init = useCallback(async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        throw Error("Make sure you have metamask!");
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      wavePortalContract.on("NewWave", onNewWave);
      setContract(wavePortalContract);
      updateStats(wavePortalContract);
    } catch (err) {
      setLastWaveDate(null);
      setError(err);
    }
  }, [contractAddress, contractABI]);

  useEffect(() => {
    if (!contract) init();
  }, [contract, init]);

  const unsubscribe = () => {
    if (contract) {
      contract.off("NewWave", onNewWave);
    }
  };

  const onNewWave = (from, timestamp, message) => {
    setWaves((prevState) => [
      ...prevState,
      {
        address: from,
        timestamp: new Date(timestamp * 1000),
        message: message,
      },
    ]);
  };

  const updateStats = async (contract) => {
    try {
      if (!contract) {
        throw Error("Contract not initialized");
      }
      const totalWaves = await contract.getTotalWaves();
      setTotalWaves(totalWaves.toNumber());
      const lastWave = await contract.getLastWaveDate();
      setLastWaveDate(
        lastWave.toNumber() > 0 ? new Date(lastWave.toNumber() * 1000) : null
      );
      setError(null);
    } catch (err) {
      setError(err);
    }
  };

  const sendWave = async (message) => {
    try {
      if (!contract) {
        throw Error("Contract not initialized");
      }
      const waveTxn = await contract.wave(message, {
        gasLimit: 300000,
      });
      await waveTxn.wait();
      await updateStats(contract);
    } catch (err) {
      setError(err);
    }
  };

  const getAllWaves = async () => {
    try {
      if (!contract) {
        throw Error("Contract not initialized");
      }

      const waveList = await contract.getAllWaves();
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
    unsubscribe,
  };
};
