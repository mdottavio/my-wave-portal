import * as React from "react";
import "./App.css";

export default function App() {
  const wave = () => {};

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
          <span role="img" class="wave-animation" aria-label="wave img">
            👋
          </span>
          Hey there!
        </div>

        <div className="bio">Let's play with ETH and waves...</div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
      </div>
    </div>
  );
}
