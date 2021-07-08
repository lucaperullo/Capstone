import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
export default function Player() {
  const trackUri = localStorage.getItem("playing");

  const [play, setPlay] = useState(false);
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    setPlay(false);
    setTimeout(() => {
      setPlay(!false);
    }, 500);
  }, [trackUri]);
  return (
    <SpotifyPlayer
      styles={{
        activeColor: "white",
        altColor: "blue",
        bgColor: "#181818",
        color: "white",
        errorColor: "red",
        sliderColor: getRandomColor(),
      }}
      magnifySliderOnHover={true}
      token={localStorage.getItem("access_token")!}
      showSaveIcon
      play={play}
      uris={[trackUri!]}
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
    />
  );
}
