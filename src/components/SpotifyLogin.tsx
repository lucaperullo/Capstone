import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonContent,
  IonItem,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { useStateValue } from "../contextApi/stateProvider";

export const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=caefca1208c4456685d3300573064639&response_type=code&redirect_uri=${process.env.REACT_APP_FRONT_URL}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

export default function SpotifyLogin() {
  const [state, dispatch] = useStateValue();
  const [Code, setCode] = useState<any>();
  const code = new URLSearchParams(window.location.search).get("code");

  return (
    <>
      {!code ? (
        <IonCard
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "black",
          }}
        >
          <IonCardHeader></IonCardHeader>
        </IonCard>
      ) : (
        <Redirect to={{ pathname: "/discover", state: Code }} />
      )}
    </>
  );
}
