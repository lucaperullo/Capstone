import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonHeader,
  IonLoading,
  IonText,
  IonToolbar,
} from "@ionic/react";

import { useState } from "react";

import styled from "styled-components";

import Login from "../components/Login";

import Typist from "react-typist";
import "../theme/style.css";
import LoginAnimation from "../components/loginAnimation";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showLoading, setShowLoading] = useState(false);

  // const spotiLoginHandler = async () => {
  //   setShowLoading(true);
  //   try {
  //     const data = await fetch(` https://capstonebe.herokuapp.com/login/spotify`);
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const code = new URLSearchParams(window.location.search).get("code");
  // const handleLogin = async () => {
  //   setShowLoading(true);
  //   const data = await fetch(" https://capstonebe.herokuapp.com/spotify/login");
  //   console.log(data);
  // };

  return (
    <>
      {/* {code !== null ? (
        <Login />
      ) : ( */}
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
              <h1 style={{ fontSize: 40 }}>WELCOME TO OURMUSIC.</h1>
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
          <a
            href=" https://capstonebe.herokuapp.com/spotify/login"
            style={{ textDecoration: "none" }}
          >
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
      {/* )} */}
    </>
  );
};
// background-image: url(${"https://www.transparenttextures.com/patterns/food.png"});
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

export default LoginPage;
