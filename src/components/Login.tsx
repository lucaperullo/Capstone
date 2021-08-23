import {
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonLoading,
  IonText,
  IonCardHeader,
} from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { useStateValue } from "../contextApi/stateProvider";
import SpotifyWebApi from "spotify-web-api-node";
import "../theme/style.css";
import Typist from "react-typist";
import LoginAnimation from "./loginAnimation";
export default function Login() {
  const [state, dispatch] = useStateValue();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showLoading, setShowLoading] = useState(false);
  const [code, setCode] = useState<string>();

  let history = useHistory();
  // const spotifyApi = new SpotifyWebApi({
  //   clientId: "caefca1208c4456685d3300573064639",
  // });

  // const loginHandler = async () => {
  //   setShowLoading(true);
  //   const { data } = await axios.post(
  //     ` {REACT_APP_NODE_ENV===production?"https://capstonebe.herokuapp.com/me":"http://localhost:3999"}login/spotify/callback`,
  //     code
  //   );
  //   !data && console.log("error");
  //   if (data) {
  //     setTimeout(() => {
  //       setShowLoading(false);
  //       // history.push("/discover");
  //     }, 2000);
  //   }
  // };
  // useEffect(() => {
  //   if (code !== undefined) {
  //     loginHandler();
  //   }
  // }, [code]);
  return (
    <Container>
      <div style={{ marginBottom: "50px", zIndex: 10 }}>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            padding: "60px",
          }}
        >
          <Typist cursor={{ show: false }}>
            <h1 style={{ fontSize: 40 }}>WELCOME OURMUSIC.</h1>
          </Typist>
        </div>
      </div>

      <LoginForm>
        <IonCardHeader>
          <img
            draggable="false"
            className="logo"
            height="70"
            src="https://media.discordapp.net/attachments/786174311718322227/859041060809474048/outMusic.png?width=495&height=492"
            alt=""
          />
        </IonCardHeader>
        <a style={{ textDecoration: "none" }}>
          <IonButton color="dark">
            C
            <img
              draggable="false"
              height="70"
              src="https://reports.exodus-privacy.eu.org/reports/30176/icon"
              alt=""
            />
            NNECT
          </IonButton>
        </a>
      </LoginForm>
      <IonLoading
        translucent={true}
        mode="ios"
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={"Please wait..."}
        duration={5000}
      />
      {/* <IonItem style={{ borderRadius: "10px", marginBottom: "5px" }}>
      <IonLabel>Password : </IonLabel>
      <IonInput
        type="password"
        value={password}
        placeholder="Password"
        onIonChange={(e) => setPassword(e.detail.value!)}
      ></IonInput>
    </IonItem> */}
      <LoginAnimation />
    </Container>
  );
}
const Container = styled.div`
  overflow: hidden;
  color: white;
  display: flex;
  animation: login 4s alternate-reverse infinite;
  align-items: center;
  flex-direction: column;
  position: absolute;
  z-index: 100;

  width: 100vw;
  height: 100vh;
  padding-bottom: 150px;
  background: linear-gradient(
    -30deg,
    #181818 0%,
    #1f1f1f 50%,
    #dbdbdb 50%,
    #7d7676 100%
  );
`;
const LoginForm = styled.div`
  border-radius: 30px;
  padding: 30px;
  position: absolute;
  top: 250px;
  height: 30vh;
  width: auto;
  background-color: transparent;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
