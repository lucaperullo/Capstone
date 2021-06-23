import { IonItem, IonInput, IonLabel, IonButton } from "@ionic/react";
import { useState } from "react";
import styled from "styled-components";
import { backend } from "../config";
import { useLocalStorage } from "../hooks/useLocalStorage";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginHandler = async (e: any) => {
    e.preventDefault();
    const res = await backend.post(
      "/auth/login",
      {
        username,
        password,
      },
      { withCredentials: true }
    );
    // res.status === 200 && window.location.assign("/chat");
  };
  return (
    <>
      <Container>
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

const Container = styled.div`
  background-image: url(${"https://www.transparenttextures.com/patterns/food.png"});
  display: flex;
  flex-direction: column;
  padding-top: 30vh;

  width: 100vw;
  height: 100vh;
  top: 50 vh;
  align-self: center;
  justify-self: center;
`;

export default LoginPage;
