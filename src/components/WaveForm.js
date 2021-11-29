import React, { useState } from "react";
import { Carousel } from "@giphy/react-components";
import "./WaveForm.css";

const WaveForm = ({ onSubmit, giphyFetch, query = "dog" }) => {
  const [gifId, setGifId] = useState(null);
  console.log(giphyFetch);
  const fetchGifs = (offset) => giphyFetch.search(query, { offset, limit: 10 });

  const setGif = (gif, e) => {
    e.preventDefault();
    setGifId(gif.id);
  };

  return (
    <>
      <Carousel
        fetchGifs={fetchGifs}
        gifHeight={200}
        gutter={6}
        onGifClick={setGif}
      />
      <button
        className="waveButton"
        disabled={!gifId}
        onClick={() => onSubmit(gifId)}
      >
        Send me a God!
      </button>
    </>
  );
};

export { WaveForm };
