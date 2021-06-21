import { IonItem, IonInput, IonLabel, IonButton } from "@ionic/react";
import { useState } from "react";
import styled from "styled-components";
import { backend } from "../config";
import { useLocalStorage } from "../hooks/useLocalStorage";

const LoginPage = () => {
  const [userNumber, setUserNumber] = useLocalStorage<string>("userNumber", "");
  const [password, setPassword] = useState<string>("");

  const loginHandler = async (e: any) => {
    e.preventDefault();
    const res = await backend.post("/api/user/login", {
      userNumber,
    });
    res.status === 200 && window.location.assign("/chat");
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
            <IonLabel>Phone : </IonLabel>
            <IonInput
              type="text"
              value={userNumber}
              placeholder="Enter Number"
              onIonChange={(e) => setUserNumber(e.detail.value!)}
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
