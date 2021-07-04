import { IonItem, IonInput, IonLabel, IonButton } from "@ionic/react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { socketConnection } from "../socketCalls/connection";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  let history = useHistory();
  const loginHandler = async (e: any) => {
    e.preventDefault();
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/login`,
      {
        username,
        password,
      },
      { withCredentials: true }
    );
    res.status === 200 && history.push("/spotify/authorization");
  };
  return (
    <>
      <Container style={{ position: "absolute", height: "100vh", zIndex: 10 }}>
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          onSubmit={(e) => {
            loginHandler(e);
          }}
        >
          <IonItem style={{ borderRadius: "10px", marginBottom: "5px" }}>
            <IonLabel>Username : </IonLabel>
            <IonInput
              type="text"
              value={username}
              placeholder="Enter Number"
              onIonChange={(e) => setUsername(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem style={{ borderRadius: "10px", marginBottom: "5px" }}>
            <IonLabel>Password : </IonLabel>
            <IonInput
              type="password"
              value={password}
              placeholder="Enter Number"
              onIonChange={(e) => setPassword(e.detail.value!)}
            ></IonInput>
          </IonItem>
          {/* <IonItem style={{ borderRadius: "10px", marginBottom: "5px" }}>
            <IonLabel>Password : </IonLabel>
            <IonInput
              type="password"
              value={password}
              placeholder="Password"
              onIonChange={(e) => setPassword(e.detail.value!)}
            ></IonInput>
          </IonItem> */}
          <IonButton type="submit">Sign in</IonButton>
        </form>
      </Container>
    </>
  );
};
// background-image: url(${"https://www.transparenttextures.com/patterns/food.png"});
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30vh;
  background-color: black;
  width: 100vw;
  height: 100vh;
  top: 50 vh;
  align-self: center;
  justify-self: center;
`;

export default LoginPage;
