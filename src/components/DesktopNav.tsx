import {
  AnimationBuilder,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonPopover,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonText,
  useIonPopover,
} from "@ionic/react";
import animationData from "../lotties/dark-light.json";
import {
  chatbubbleOutline,
  chatbubblesSharp,
  cog,
  cogOutline,
  earthSharp,
  ellipsisVerticalOutline,
  library,
  moon,
  paperPlane,
  settings,
  sunny,
  trashSharp,
} from "ionicons/icons";
import React, { useState } from "react";
import Lottie from "react-lottie";
import { useStateValue } from "../contextApi/stateProvider";
import Avatar from "./Avatar";
import { RiSendPlaneFill } from "react-icons/ri";
import { FcSettings } from "react-icons/fc";
import { useHistory } from "react-router";
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
export default function DesktopNav(props: SettingsProps) {
  let history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const PopoverList: React.FC<{ onHide: () => void }> = ({ onHide }) => (
    <IonList mode="ios">
      <IonListHeader>SETTINGS</IonListHeader>
      <IonItem
        onClick={() => {
          setShowModal(!showModal);
          onHide();
        }}
        button
      >
        Theming
      </IonItem>
      <IonItem button>comingsoon</IonItem>
      <IonItem button>comingsoon</IonItem>
      <IonItem button>comingsoon</IonItem>
      <IonItem lines="none" detail={false} button onClick={onHide}>
        Close
      </IonItem>
    </IonList>
  );
  const [present, dismiss] = useIonPopover(PopoverList, {
    onHide: () => dismiss(),
  });

  interface PopoverOptions {
    component: any;
    componentProps?: { [key: string]: any };
    showBackdrop?: boolean;
    backdropDismiss?: boolean;
    translucent?: boolean;
    cssClass?: string | string[];
    event?: Event;
    animated?: boolean;

    mode?: "ios" | "md";
    keyboardClose?: boolean;
    id?: string;

    enterAnimation?: AnimationBuilder;
    leaveAnimation?: AnimationBuilder;
  }
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
      const data = await fetch(
        " https://spotify-fetch.herokuapp.com/https://capstonebe.herokuapp.com" +
          "/me",
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(payload),
        }
      );
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

    lightDarkModeHandler();
  };
  const lightDarkModeHandler = () => {
    if (dark) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  };
  const defaultOptions = {
    play: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });
  return (
    <div className="desktop-nav">
      <Avatar />
      <div className="desktop-nav-button">
        <IonIcon
          className="desktop-navs"
          icon={library}
          onClick={() => history.push("/discover")}
        />
      </div>
      <div className="desktop-nav-button">
        <IonIcon
          icon={paperPlane}
          onClick={(e: any) => {
            e.persist();
            setShowPopover({ showPopover: true, event: e });
          }}
          className="desktop-navs"
        />
        <IonPopover
          cssClass="my-custom-class"
          event={popoverState.event}
          isOpen={popoverState.showPopover}
          onDidDismiss={() =>
            setShowPopover({ showPopover: false, event: undefined })
          }
        >
          <IonList>
            <IonListHeader>CONVERSATIONS</IonListHeader>
            <IonItem>
              <a href="/discover">
                Discover new people with similar music tastes!
              </a>
            </IonItem>
            {/* <IonItem button>Theming</IonItem>
            <IonItem button>comingsoon</IonItem>
            <IonItem button>comingsoon</IonItem>
            <IonItem button>comingsoon</IonItem> */}
          </IonList>
        </IonPopover>
      </div>
      <div className="desktop-nav-button settings-ico">
        <IonIcon
          icon={settings}
          onClick={(e) =>
            present({
              event: e.nativeEvent,
            })
          }
          className="desktop-navs"
        />
      </div>
      <IonModal isOpen={showModal} cssClass="my-custom-class">
        <IonContent
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <IonItem>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
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
                    <IonCardContent>
                      <div onClick={toggleDarkModeHandler}>
                        <Lottie
                          options={defaultOptions}
                          height={30}
                          width={50}
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
                          draggable="false"
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
                          draggable="false"
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
                          draggable="false"
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
                          draggable="false"
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
                          draggable="false"
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
                          draggable="false"
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
                          draggable="false"
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
                          draggable="false"
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

                <IonButton
                  onClick={() => {
                    updateUser();
                    setShowModal(!showModal);
                  }}
                >
                  save
                </IonButton>
              </div>
            </IonItem>
          </div>
        </IonContent>
      </IonModal>
    </div>
  );
}
