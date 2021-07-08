import { IonItem, IonInput, IonLabel, IonButton } from "@ionic/react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const RegisterPage = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  let history = useHistory();
  const registerHandler = async (e: any) => {
    e.preventDefault();
    const res = await axios.post(
      `https://capstonebe.herokuapp.com/register`,
      {
        email: email,
        phone: phone,
        password: password,
        username: username,
      },
      { withCredentials: true }
    );

    res.status === 200 && history.push("/spotify/auth");
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
            registerHandler(e);
          }}
        >
          <IonItem
            style={{
              borderRadius: "10px",
              marginBottom: "5px",
              width: "350px",
            }}
          >
            <div>
              <IonLabel style={{ paddingTop: "10px" }}>Phone : </IonLabel>
              <IonInput
                type="text"
                value={phone}
                placeholder="your phone here(optional)"
                onIonChange={(e) => setPhone(e.detail.value!)}
              ></IonInput>
              <IonLabel style={{ paddingTop: "10px" }}>Username : </IonLabel>
              <IonInput
                type="text"
                value={username}
                placeholder="your username here"
                onIonChange={(e) => setUsername(e.detail.value!)}
              ></IonInput>
              <IonLabel style={{ paddingTop: "10px" }}>Username : </IonLabel>
              <IonInput
                type="text"
                value={email}
                placeholder="your email here"
                onIonChange={(e) => setEmail(e.detail.value!)}
              ></IonInput>
              <IonLabel style={{ paddingTop: "10px" }}>Password : </IonLabel>
              <IonInput
                type="password"
                value={password}
                placeholder="8 characters ore more"
                onIonChange={(e) => setPassword(e.detail.value!)}
              ></IonInput>
            </div>
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
          <IonButton type="submit">Sign up</IonButton>
        </form>
      </Container>
    </>
  );
};

const Container = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;
  padding-top: 30vh;

  width: 100vw;
  height: 100vh;
  top: 50 vh;
  align-self: center;
  justify-self: center;
`;

export default RegisterPage;
