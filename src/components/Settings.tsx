import { useState } from "react";
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
  IonImg,
  IonContent,
  IonChip,
  IonRadio,
  IonRadioGroup,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { chatbubblesSharp, moon, sunny, trashSharp } from "ionicons/icons";

import "../theme/style.css";

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

const Light = document.body.classList.value === "light";
document.body.classList.add("dark");

const SettingsModal = (props: SettingsProps) => {
  const [dark, setDark] = useState(false);
  const toggleDarkModeHandler = () => {
    setDark(!dark);
    const lightDarkModeHandler = () => {
      Light
        ? document.body.classList.toggle("dark")
        : document.body.classList.toggle("light");
    };
    lightDarkModeHandler();
  };
  return (
    <IonModal
      isOpen={props.modalShow}
      cssClass="settings-modal"
      backdropDismiss={false}
    >
      <IonContent style={{ backgroundColor: `${props.chatBackgroundColor}` }}>
        <IonHeader
          style={{ position: "fixed", top: 0, backgroundColor: "black" }}
        >
          <IonText color="primary">
            <h1>‏‏‎ ‎‏‏‎ Theme</h1>
          </IonText>
        </IonHeader>
        <div className="modalContainer">
          <IonItem>
            <IonText slot="start">
              <h1>‏‏‎ ‎‏‏‎ Light/Dark</h1>
            </IonText>
            <IonIcon slot="end" icon={dark ? sunny : moon} />

            <IonToggle
              checked={dark}
              slot="end"
              name="darkMode"
              onIonChange={toggleDarkModeHandler}
            />
          </IonItem>
          <IonItem>
            <IonText slot="start">
              <h1>‏‏‎ ‎‏‏‎ Bubbles</h1>
            </IonText>
            <IonSegment
              onIonChange={(e) => props.setMessageTheme(e.detail.value!)}
              value={props.messageTheme}
            >
              <IonSegmentButton value="primary">
                <IonIcon icon={chatbubblesSharp} color="primary" />
              </IonSegmentButton>
              <IonSegmentButton value="secondary">
                <IonIcon icon={chatbubblesSharp} color="secondary" />
              </IonSegmentButton>
              <IonSegmentButton value="tertiary">
                <IonIcon icon={chatbubblesSharp} color="tertiary" />
              </IonSegmentButton>
              <IonSegmentButton value="dark">
                <IonIcon icon={chatbubblesSharp} color="dark" />
              </IonSegmentButton>
              <IonSegmentButton value="light">
                <IonIcon icon={chatbubblesSharp} color="light" />
              </IonSegmentButton>
            </IonSegment>

            {/* <IonRadioGroup
              style={{ display: "flex" }}
              value={props.messageTheme}
              onIonChange={(e) => props.setMessageTheme(e.detail.value)}
            >
              <IonItem>
                <IonRadio mode="md" color="primary" value="primary" />
              </IonItem>
              <IonItem>
                <IonText slot="start"></IonText>
                <IonRadio mode="md" color="secondary" value="secondary" />
              </IonItem>
              <IonItem>
                <IonRadio mode="md" color="tertiary" value="tertiary" />
              </IonItem>
            </IonRadioGroup> */}
          </IonItem>
          <IonItem>
            <IonSegment
              onIonChange={(e) => props.setMessageTheme(e.detail.value!)}
              value={props.messageTheme}
            >
              <IonSegmentButton value="grey">
                <IonIcon icon={chatbubblesSharp} color="grey" />
              </IonSegmentButton>
              <IonSegmentButton value="warning">
                <IonIcon icon={chatbubblesSharp} color="warning" />
              </IonSegmentButton>
              <IonSegmentButton value="medium">
                <IonIcon icon={chatbubblesSharp} color="medium" />
              </IonSegmentButton>
              <IonSegmentButton value="danger">
                <IonIcon icon={chatbubblesSharp} color="danger" />
              </IonSegmentButton>
            </IonSegment>
          </IonItem>
          <IonItem style={{ height: "150px" }}>
            <IonText slot="start">
              <h1>‏‏‎ ‎‏‏‎ ‎‏‏‎ Wallpaper Color</h1>
            </IonText>
            <IonItem style={{ zIndex: 2, height: "150px" }}>
              <input
                type="color"
                value={props.chatBackgroundColor}
                onChange={(e) => props.setChatBackgroundColor(e.target.value)}
              />
            </IonItem>
          </IonItem>
          <IonItem style={{ height: "80vh" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <IonText slot="start">
                <h1>‏‏‎ ‎‏‏‎ ‎‏‏‎ Wallpaper</h1>
              </IonText>

              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonIcon
                      icon={trashSharp}
                      size="large"
                      onClick={(e) =>
                        props.setChatBackground(e.currentTarget.src!)
                      }
                      src=""
                    />
                  </IonCol>

                  <IonCol>
                    <IonImg
                      onClick={(e) =>
                        props.setChatBackground(e.currentTarget.src!)
                      }
                      src="https://www.transparenttextures.com/patterns/tree-bark.png"
                    />
                  </IonCol>
                  <IonCol>
                    <IonImg
                      onClick={(e) =>
                        props.setChatBackground(e.currentTarget.src!)
                      }
                      src="https://www.transparenttextures.com/patterns/type.png"
                    />
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonImg
                      onClick={(e) =>
                        props.setChatBackground(e.currentTarget.src!)
                      }
                      src="https://www.transparenttextures.com/patterns/skulls.png"
                    />
                  </IonCol>
                  <IonCol>
                    <IonImg
                      onClick={(e) =>
                        props.setChatBackground(e.currentTarget.src!)
                      }
                      src="https://www.transparenttextures.com/patterns/dark-wood.png"
                    />
                  </IonCol>{" "}
                  <IonCol>
                    <IonImg
                      onClick={(e) =>
                        props.setChatBackground(e.currentTarget.src!)
                      }
                      src="https://www.transparenttextures.com/patterns/xv.png"
                    />
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonImg
                      onClick={(e) =>
                        props.setChatBackground(e.currentTarget.src!)
                      }
                      src="https://www.transparenttextures.com/patterns/flowers.png"
                    />
                  </IonCol>

                  <IonCol>
                    <IonImg
                      onClick={(e) =>
                        props.setChatBackground(e.currentTarget.src!)
                      }
                      src="https://www.transparenttextures.com/patterns/food.png"
                    />
                  </IonCol>
                  <IonCol>
                    <IonImg
                      onClick={(e) =>
                        props.setChatBackground(e.currentTarget.src!)
                      }
                      src="https://www.transparenttextures.com/patterns/foggy-birds.png"
                    />
                  </IonCol>
                </IonRow>
              </IonGrid>
            </div>
          </IonItem>

          <div className="modalButtons">
            <IonButton
              color="danger"
              onClick={() => {
                localStorage.clear();
                window.location.assign("/");
              }}
            >
              Log out
            </IonButton>
            <IonButton onClick={() => props.setModalShow(false)}>
              Close
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default SettingsModal;
