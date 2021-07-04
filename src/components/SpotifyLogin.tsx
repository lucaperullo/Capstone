import React from "react";
import { Redirect } from "react-router-dom";

export const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=caefca1208c4456685d3300573064639&response_type=code&redirect_uri=${process.env.REACT_APP_FRONT_URL}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

export default function SpotifyLogin() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Redirect to={AUTH_URL} />
    </div>
  );
}
