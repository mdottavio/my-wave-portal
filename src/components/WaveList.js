import React, { useState } from "react";
import { useAsync } from "react-async-hook";
import { Gif } from "@giphy/react-components";
import { getWaveHumanDate } from "../utils";
import "./WaveList.css";

const GifItem = ({ id, giphyFetch }) => {
  const [gif, setGif] = useState(null);
  const { status } = useAsync(async () => {
    const { data } = await giphyFetch.gif(id);
    setGif(data);
  }, []);
  return (
    gif && (
      <Gif
        gif={gif}
        width={200}
        className={status === "pending" ? "loading" : ""}
      />
    )
  );
};

const WaveList = ({ waves = [], giphyFetch }) => {
  return (
    <div className="WaveList">
      {waves.map((wave, index) => {
        return (
          <div key={index} className="WaveList-item">
            <GifItem id={wave.message} giphyFetch={giphyFetch} />
            <div className="WaveList-item-date">
              {`Sent the ${getWaveHumanDate(wave.timestamp, true)}`} by
            </div>
            <div className="WaveList-item-address">{wave.address}</div>
          </div>
        );
      })}
    </div>
  );
};

export { WaveList };
