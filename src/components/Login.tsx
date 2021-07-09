import {
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonLoading,
  IonText,
} from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../contextApi/custom/useAuth";
import { useStateValue } from "../contextApi/stateProvider";
import SpotifyWebApi from "spotify-web-api-node";
import "../theme/style.css";
import Typist from "react-typist";
export default function Login({ code }: { code: any }) {
  const accessToken = useAuth(code);
  const [state, dispatch] = useStateValue();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showLoading, setShowLoading] = useState(false);
  let history = useHistory();
  const spotifyApi = new SpotifyWebApi({
    clientId: "caefca1208c4456685d3300573064639",
  });

  useEffect(() => {
    dispatch({
      type: "SET_SPOTIFY_CODE",
      payload: code,
    });
  }, []);

  const loginHandler = async (e: any) => {
    e.preventDefault();
    setShowLoading(true);
    const res = await axios.post(
      `http://localhost:3999/login`,
      {
        username,
        password,
      },
      { withCredentials: true }
    );
    !res && console.log("error");
    if (res) {
      setTimeout(() => {
        setShowLoading(false);
        history.push("/discover");
      }, 2000);
    }
  };
  return (
    <Container>
      <div className="logo-container">
        <img
          className="logo"
          height="80"
          src="https://media.discordapp.net/attachments/786174311718322227/859041060809474048/outMusic.png?width=495&height=492"
          alt=""
        />
      </div>
      <LoginForm>
        <form
          onSubmit={(e) => {
            loginHandler(e);
          }}
        >
          <div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <IonText>USERNAME</IonText>
              <IonInput
                type="text"
                value={username}
                placeholder="Enter Username"
                onIonChange={(e) => setUsername(e.detail.value!)}
              ></IonInput>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <IonText>PASSWORD</IonText>
              <IonInput
                type="password"
                value={password}
                placeholder="ENTER PASSWORD"
                onIonChange={(e) => setPassword(e.detail.value!)}
              ></IonInput>
            </div>
          </div>
          <div className="logo-container">
            <IonButton color="dark" type="submit">
              Sign in
            </IonButton>
          </div>
        </form>
      </LoginForm>
      <IonLoading
        translucent={true}
        mode="ios"
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={"Please wait..."}
        duration={5000}
      />
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
  box-shadow: inset 0 0 20px rgba(37, 37, 37, 0.561);
  border-radius: 30px;
  padding: 30px;
  position: absolute;
  top: 250px;
  height: 30vh;
  width: 50vw;
  background-color: #757575;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: space-between;
`;
