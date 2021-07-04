import { useEffect, useState } from "react";
import {
  IonModal,
  IonButton,
  IonHeader,
  IonLabel,
  IonItem,
  IonInput,
  IonText,
  IonToggle,
  IonIcon,
  IonCol,
  IonGrid,
  IonRow,
  IonContent,
  IonChip,
  IonRadio,
  IonRadioGroup,
  IonSegment,
  IonSegmentButton,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardContent,
} from "@ionic/react";
import { chatbubblesSharp, moon, sunny, trashSharp } from "ionicons/icons";

import "../theme/style.css";
import { useStateValue } from "../contextApi/stateProvider";

interface SettingsProps {
  messageTheme: string;
  setMessageTheme: (theme: string) => void;
  chatBackgroundColor: string;
  setChatBackgroundColor: (arg0: string) => void;
  chatBackground: string;
  setChatBackground: (arg0: string) => void;
  modalShow: boolean;
  setModalShow: (arg0: boolean) => void;
}

const Settings = (props: SettingsProps) => {
  const [dark, setDark] = useState(false);
  const [state, dispatch] = useStateValue();
  const themeCheck = () => {
    if (state?.user?.appTheming?.theme) {
      console.log(state?.user?.appTheming?.theme);
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  };
  const updateUser = async () => {
    try {
      const payload = {
        appTheming: {
          theme: dark,
          backgroundColor: props.chatBackgroundColor,
          backgroundImage: props.chatBackground,
          bubbleChat: props.messageTheme,
        },
      };
      const data = await fetch(process.env.REACT_APP_BASE_URL + "/me", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(payload),
      });
      const user = await data.json();
      dispatch({
        type: "SET_USER",
        payload: await user,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDarkModeHandler = () => {
    themeCheck();
    setDark(!dark);

    const lightDarkModeHandler = () => {
      if (dark) {
        document.body.classList.add("dark");
        document.body.classList.remove("light");
      } else {
        document.body.classList.add("light");
        document.body.classList.remove("dark");
      }
    };
    lightDarkModeHandler();
  };

  return (
    <IonContent style={{ height: "100vh" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <IonItem>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <IonText slot="start" color="primary">
              <h1>‏‏‎ ‎‏‏‎ Chat customization</h1>
            </IonText>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IonCard style={{ width: "270px" }} color="primary">
                <IonCardHeader>
                  <IonText>
                    <IonLabel>‏‏‎ ‎‏‏‎ Light/Dark</IonLabel>
                  </IonText>
                </IonCardHeader>
                <IonCardContent>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <IonIcon
                      size="large"
                      color={dark ? "warning" : "grey"}
                      icon={dark ? sunny : moon}
                    />
                    <IonToggle
                      checked={state?.user?.appTheming?.theme}
                      slot="end"
                      name="darkMode"
                      onIonChange={toggleDarkModeHandler}
                    />
                  </div>
                </IonCardContent>
              </IonCard>
            </div>
          </div>
        </IonItem>

        <IonItem>
          <IonSegment
            onIonChange={(e) => props.setMessageTheme(e.detail.value!)}
            value={props.messageTheme || state?.user?.appTheming?.bubble}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <IonCard>
                <IonItem style={{ display: "flex" }}>
                  <IonSegmentButton value="primary">
                    <IonIcon icon={chatbubblesSharp} color="primary" />
                  </IonSegmentButton>
                  <IonSegmentButton value="secondary">
                    <IonIcon icon={chatbubblesSharp} color="secondary" />
                  </IonSegmentButton>

                  <IonSegmentButton value="dark">
                    <IonIcon icon={chatbubblesSharp} color="dark" />
                  </IonSegmentButton>
                </IonItem>
                <IonItem
                  color={dark ? "dark" : "light"}
                  style={{ display: "flex" }}
                >
                  <IonSegmentButton value="tertiary">
                    <IonIcon icon={chatbubblesSharp} color="tertiary" />
                  </IonSegmentButton>
                  <IonSegmentButton value="medium">
                    <IonIcon icon={chatbubblesSharp} color="medium" />
                  </IonSegmentButton>

                  <IonSegmentButton value="grey">
                    <IonIcon icon={chatbubblesSharp} color="grey" />
                  </IonSegmentButton>
                </IonItem>
                <IonItem>
                  <IonSegmentButton value="warning">
                    <IonIcon icon={chatbubblesSharp} color="warning" />
                  </IonSegmentButton>
                  <IonSegmentButton value="light">
                    <IonIcon icon={chatbubblesSharp} color="light" />
                  </IonSegmentButton>
                  <IonSegmentButton value="danger">
                    <IonIcon icon={chatbubblesSharp} color="danger" />
                  </IonSegmentButton>
                </IonItem>
              </IonCard>
            </div>
          </IonSegment>
        </IonItem>

        <IonItem>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          ></div>
          <IonText slot="start">
            <IonLabel>‏‏‎ ‎‏‏‎ ‎‏‏‎ Wallpaper Color :</IonLabel>
          </IonText>
          <input
            type="color"
            value={props.chatBackgroundColor}
            onChange={(e) => props.setChatBackgroundColor(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <IonText slot="start">
              <IonLabel>‏‏‎ ‎‏‏‎ ‎‏‏‎ Wallpapers :</IonLabel>
            </IonText>

            <IonGrid>
              <IonRow>
                <IonCol sizeSm="">
                  <IonCard
                    onClick={() => props.setChatBackground("")}
                    style={{
                      height: "60px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IonIcon icon={trashSharp} size="large" />
                  </IonCard>
                </IonCol>

                <IonCol sizeSm="">
                  <IonCard style={{ height: "60px" }}>
                    <img
                      style={{ height: "60px" }}
                      onClick={(e) =>
                        props.setChatBackground(e.currentTarget.src!)
                      }
                      src="https://www.transparenttextures.com/patterns/tree-bark.png"
                    />
                  </IonCard>
                </IonCol>
                <IonCol sizeSm="">
                  <IonCard style={{ height: "60px" }}>
                    <img
                      style={{ height: "60px" }}
                      onClick={(e) =>
                        props.setChatBackground(e.currentTarget.src!)
                      }
                      src="https://www.transparenttextures.com/patterns/type.png"
                    />
                  </IonCard>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol sizeSm="">
                  <IonCard style={{ height: "60px" }}>
                    <img
                      style={{ height: "60px" }}
                      onClick={(e) =>
                        props.setChatBackground(e.currentTarget.src!)
                      }
                      src="https://www.transparenttextures.com/patterns/skulls.png"
                    />
                  </IonCard>
                </IonCol>
                <IonCol sizeSm="">
                  <IonCard style={{ height: "60px" }}>
                    <img
                      style={{ height: "60px" }}
                      onClick={(e) =>
                        props.setChatBackground(e.currentTarget.src!)
                      }
                      src="https://www.transparenttextures.com/patterns/dark-wood.png"
                    />
                  </IonCard>
                </IonCol>
                <IonCol sizeSm="">
                  <IonCard style={{ height: "60px" }}>
                    <img
                      style={{ height: "60px" }}
                      onClick={(e) =>
                        props.setChatBackground(e.currentTarget.src!)
                      }
                      src="https://www.transparenttextures.com/patterns/xv.png"
                    />
                  </IonCard>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol sizeSm="">
                  <IonCard style={{ height: "60px" }}>
                    <img
                      style={{ height: "60px" }}
                      onClick={(e) =>
                        props.setChatBackground(e.currentTarget.src!)
                      }
                      src="https://www.transparenttextures.com/patterns/flowers.png"
                    />
                  </IonCard>
                </IonCol>

                <IonCol sizeSm="">
                  <IonCard style={{ height: "60px" }}>
                    <img
                      style={{ height: "60px" }}
                      onClick={(e) =>
                        props.setChatBackground(e.currentTarget.src!)
                      }
                      src="https://www.transparenttextures.com/patterns/food.png"
                    />
                  </IonCard>
                </IonCol>
                <IonCol sizeSm="">
                  <IonCard style={{ height: "60px" }}>
                    <img
                      style={{ height: "60px" }}
                      onClick={(e) =>
                        props.setChatBackground(e.currentTarget.src!)
                      }
                      src="https://www.transparenttextures.com/patterns/foggy-birds.png"
                    />
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>

            <IonButton onClick={() => updateUser()}>save</IonButton>
          </div>
        </IonItem>
      </div>
    </IonContent>
  );
};

export default Settings;
