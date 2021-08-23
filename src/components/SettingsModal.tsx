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
import Lottie from "react-lottie";
import animationData from "../lotties/dark-light.json";
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

const SettingsModal = (props: SettingsProps) => {
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

    const lightDarkModeHandler = () => {
      setTimeout(() => {
        if (dark) {
          document.body.classList.add("dark");
          document.body.classList.remove("light");
        } else {
          document.body.classList.add("light");
          document.body.classList.remove("dark");
        }
      }, 3000);
    };
    lightDarkModeHandler();
  };
  const defaultOptions = {
    play: dark,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [showModal, setShowModal] = useState(false);
};

export default SettingsModal;
