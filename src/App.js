import React, { useCallback, useEffect, useState } from "react";
import { useWavePortal, useWallet } from "./hooks";
import { config, contractAbi } from "./config";
import { WaveForm, WaveList } from "./components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { getWaveHumanDate } from "./utils";
import "./App.css";

export default function App() {
  const giphyFetch = new GiphyFetch(config.GIPHY_KEY);
  const {
    waves,
    lastWaveDate,
    totalWaves,
    error: wavePortalError,
    sendWave,
    getAllWaves,
  } = useWavePortal(config.CONTRACT_ADDRESS, contractAbi);
  const { currentAccount, connectWallet, error: walletError } = useWallet();
  const [loaded, setLoaded] = useState(false);
  if (wavePortalError) {
    console.log(wavePortalError);
  }
  if (walletError) {
    console.log(walletError);
  }
  const completeWaves = useCallback(async () => {
    await getAllWaves();
  }, [getAllWaves]);

  useEffect(() => {
    if (currentAccount && !loaded) {
      completeWaves();
      setLoaded(true);
    }
  }, [currentAccount, completeWaves, loaded]);

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
          <span role="img" className="wave-animation" aria-label="wave img">
            👋
          </span>
          Hey there!
        </div>

        <div className="bio">Let's play with ETH and waves...</div>

        {!currentAccount ? (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        ) : (
          <>
            <WaveForm
              onSubmit={(gifId) => sendWave(gifId)}
              giphyFetch={giphyFetch}
            />
            <div className="stats">
              <div className="stats-row">
                <div className="stats-column title">Last God</div>
                <div className="stats-column title"># of gods</div>
              </div>

              <div className="stats-row">
                <div className="stats-column ">
                  {lastWaveDate ? getWaveHumanDate(lastWaveDate) : "-"}
                </div>
                <div className="stats-column ">{totalWaves}</div>
              </div>
            </div>
            <WaveList waves={waves} giphyFetch={giphyFetch} />
          </>
        )}
      </div>
    </div>
  );
}
