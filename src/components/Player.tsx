import { stringify } from "querystring";
import React, { useEffect, useState } from "react";

import { useStateValue } from "../contextApi/stateProvider";
export default function Player() {
  const [state, dispatch] = useStateValue();
  const [access, setAccess] = useState("");
  const [tracks, setTracks] = useState("");
  const trackUri = state?.song;
  const accessToken = state?.user?.spotifyTokens?.access_token;
  const [play, setPlay] = useState(false);
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return <></>;
}
