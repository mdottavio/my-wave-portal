import React from "react";
import { useWavePortal, useWallet } from "./hooks";
import { config, contractAbi } from "./config";
import "./App.css";

export default function App() {
  const {
    lastWaveDate,
    totalWaves,
    error: wavePortalError,
    sendWave,
  } = useWavePortal(config.CONTRACT_ADDRESS, contractAbi);
  console.log(lastWaveDate);
  const { currentAccount, connectWallet, error: walletError } = useWallet();

  if (wavePortalError) {
    console.log(wavePortalError);
  }
  if (walletError) {
    console.log(walletError);
  }

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
            <div className="stats">
              <div className="stats-row">
                <div className="stats-column title">Last Wave</div>
                <div className="stats-column title"># of waves</div>
              </div>

              <div className="stats-row">
                <div className="stats-column ">
                  {lastWaveDate
                    ? lastWaveDate.toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "-"}
                </div>
                <div className="stats-column ">{totalWaves}</div>
              </div>
            </div>

            <button className="waveButton" onClick={sendWave}>
              Wave at Me
            </button>
          </>
        )}
      </div>
    </div>
  );
}
