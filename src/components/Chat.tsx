import React, { useEffect, useRef, useState } from "react";
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonRouterOutlet,
  IonSkeletonText,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import styled from "styled-components";
import Moment from "react-moment";

import "../theme/style.css";

import { mic, personAddOutline, settingsOutline, text } from "ionicons/icons";

import { sendSharp } from "ionicons/icons";
// import CreateGroup from "./CreateGroup";
import { url } from "inspector";
import "../theme/style.css";

import { useStateValue } from "../contextApi/stateProvider";
import { Group } from "../types";
import axios from "axios";
import Settings from "./Settings";

// export const socket = io(`ws://localhost:3000`, {
//   withCredentials: true,
//   transports: ["websocket"],
// });

interface MMessages {
  text: string;
  senderId: any;
  roomId: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
const Chat = () => {
  const [messageTheme, setMessageTheme] = useState<string>("primary");

  const [SettingsModalShow, setSettingsModalShow] = useState<boolean>(false);
  const [GroupModalShow, setGroupModalShow] = useState<boolean>(false);
  // const { status, data, error, isFetching } = useContacts(userNumber);

  const [message, setMessage] = useState<string>("");

  const [conversation, setConversation] = useState<[MMessages]>();

  const [user, setUser] = useState({});
  const [Background, setBackground] = useState<string>("");
  const [BackgroundColor, setBackgroundColor] = useState("");
  // const mess = useMessages("60d38f76df6d0412e18ecec6");
  // console.log(mess.data);

  const [state, dispatch] = useStateValue();
  const { socket } = state;
  const roomId = window.location.pathname.split("/")[2];

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    socket.emit("SEND_MESSAGE", {
      text: message,
      roomId,
      senderId: state?.user?._id,
    });
    fetchMessages();
    scrollToBottom();
  };
  const contentRef = useRef<HTMLIonContentElement | null>(null);
  const scrollToBottom = () => {
    contentRef.current && contentRef.current.scrollToBottom();
  };
  const fetchMessages = async () => {
    const messages = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/messages/${roomId}`,
      {
        withCredentials: true,
      }
    );
    console.log(messages);
    setConversation(messages.data.messages);
    scrollToBottom();
  };
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
  const actualTheme = state?.user?.appTheming?.theme;
  useEffect(() => {
    themeCheck();
  }, [actualTheme]);
  useEffect(() => {
    fetchMessages();
    scrollToBottom();
    socket?.on("RECIVE_MESSAGE", (message: MMessages) => {
      fetchMessages();
      scrollToBottom();
    });
  }, []);

  return (
    <IonContent style={{ zIndex: 10 }}>
      <ChatContainer>
        <IonHeader>
          {state?.actualChat && (
            <div className="contact-header">
              <IonItem>
                <IonAvatar slot="start">
                  <img src={state.actualChat.profilePic} alt="" />
                </IonAvatar>
                <IonLabel>
                  <h2>{state.actualChat.username}</h2>
                  <p>{state.actualChat.bio}</p>
                  <p>{state.actualChat.status.presence}</p>
                </IonLabel>
              </IonItem>
            </div>
          )}
        </IonHeader>
        <IonContent
          ref={contentRef}
          scrollEvents={true}
          style={{
            zIndex: 1,
            // height: "100%",
            // backgroundImage: `url(${state?.user?.appTheming?.backgroundImage})`,
            // backgroundColor: `transparent`,
          }}
        >
          <div
            style={{
              height: "auto",
              backgroundImage: `url(${
                state?.user?.appTheming?.backgroundImage?.length > 0
                  ? state?.user?.appTheming?.backgroundImage
                  : Background
              })`,
              backgroundColor: `${
                state?.user?.appTheming?.backgroundColor || BackgroundColor
              }`,
            }}
          >
            {conversation?.map(
              ({ text, senderId, createdAt, _id }, idx: number) => {
                const current =
                  state?.user?._id === senderId._id ? true : false;
                return (
                  <div key={idx} className={current ? "right" : "left"}>
                    <IonCard
                      color={current ? state?.user?.appTheming?.bubbleChat : ""}
                      style={{
                        height: 100,
                        borderRadius: current
                          ? "15px 0px 15px 15px"
                          : "15px 15px 15px 0px",
                        boxShadow: `0px 0px 20px 1px ${
                          state?.user?.appTheming.backgroundColor ||
                          BackgroundColor
                        }`,
                      }}
                    >
                      <IonCardContent>
                        {text}
                        <div className="ion-text-end">
                          <span>
                            <Moment date={createdAt} format="HH:mm" />
                          </span>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </div>
                );
              }
            )}
            <IonItem>
              <IonIcon
                className="chat-button"
                color="primary"
                slot="start"
                icon={mic}
              />

              <div className="chat-container">
                <IonTextarea
                  placeholder="Write some text..."
                  value={message}
                  // onKeyPress={handleSendMessage}
                  onIonChange={(e) => setMessage(e.detail.value!)}
                />
              </div>

              {message.length > 0 && (
                <IonItem>
                  <IonIcon
                    onClick={handleSubmitMessage}
                    className="chat-button"
                    color="primary"
                    slot="end"
                    icon={sendSharp}
                  />
                </IonItem>
              )}
            </IonItem>
          </div>
        </IonContent>
      </ChatContainer>

      <IonMenu
        swipeGesture={true}
        side="end"
        menuId="main2"
        contentId="content2"
      >
        <IonHeader>
          {/* <IonIcon
              color="grey"
              className="settings"
              slot="start"
              icon={personAddOutline}
              onClick={() => setGroupModalShow(true)}
            ></IonIcon>
            <IonIcon
              color="grey"
              className="settings"
              slot="end"
              icon={settingsOutline}
              onClick={() => setSettingsModalShow(true)}
            ></IonIcon> */}
          <Settings
            messageTheme={messageTheme}
            setMessageTheme={setMessageTheme}
            setChatBackgroundColor={setBackgroundColor}
            chatBackgroundColor={BackgroundColor}
            setChatBackground={setBackground}
            chatBackground={Background}
            modalShow={SettingsModalShow}
            setModalShow={setSettingsModalShow}
          />

          {/* <CreateGroup
            modalShow={GroupModalShow}
            setModalShow={setGroupModalShow}
          /> */}
        </IonHeader>
        <IonContent id="content2"></IonContent>
      </IonMenu>
      <IonRouterOutlet
        id="main2"
        // style={{
        //   backgroundColor: `${BackgroundColor}`,
        // }}
      ></IonRouterOutlet>
    </IonContent>
  );
};

const ChatContainer = styled.div`
  @media (max-width: 768px) {
    width: 100vw;
  }
  display: flex;
  flex-direction: column;
  height: 92%;
  width: 70vw;
`;

const BlockDiv = styled.div`
  width: 100%;
  margin-top: 7.5px;
  margin-bottom: 7.5px;
  position: relative;
  display: block;
`;
export default Chat;
