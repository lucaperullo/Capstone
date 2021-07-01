import React, { useEffect, useRef, useState } from "react";
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
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
} from "@ionic/react";
import styled from "styled-components";
import Moment from "react-moment";

import "../theme/style.css";
import SettingsModal from "./Settings";
import {
  happySharp,
  personAddOutline,
  settingsOutline,
  text,
} from "ionicons/icons";

import { sendSharp } from "ionicons/icons";
import CreateGroup from "./CreateGroup";
import { url } from "inspector";
import "../theme/style.css";

import { useStateValue } from "../contextApi/stateProvider";
import { Group } from "../types";
import axios from "axios";

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
  };
  const contentRef = useRef<HTMLIonContentElement | null>(null);
  const scrollToBottom = () => {
    contentRef.current && contentRef.current.scrollToBottom();
  };
  const fetchMessages = async () => {
    const messages = await axios.get(
      `https://capstonebe.herokuapp.com/messages/${roomId}`,
      {
        withCredentials: true,
      }
    );
    setConversation(messages.data.messages);
    scrollToBottom();
  };
  console.log(state.actualChat);

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
            height: "100%",
            backgroundImage: `url(${Background})`,
            backgroundColor: `transparent`,
          }}
        >
          {conversation?.map(({ text, senderId, createdAt, _id }) => {
            const current = state?.user?._id === senderId._id ? true : false;
            return (
              <div className={current ? "right" : "left"}>
                <IonCard
                  color={current ? messageTheme : ""}
                  style={{
                    borderRadius: current
                      ? "15px 0px 15px 15px"
                      : "15px 15px 15px 0px",
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
          })}

          <IonItem className="chat-box" style={{ height: "50px" }}>
            <IonIcon
              className="chat-button"
              color="primary"
              slot="start"
              icon={happySharp}
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
              <IonIcon
                onClick={handleSubmitMessage}
                className="chat-button"
                color="primary"
                slot="end"
                icon={sendSharp}
              />
            )}
          </IonItem>
        </IonContent>
      </ChatContainer>

      <IonMenu
        swipeGesture={true}
        side="end"
        menuId="main2"
        contentId="content2"
      >
        <IonHeader>
          <IonItem>
            <IonText color="primary">Start a new chat..</IonText>
            <IonIcon
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
            ></IonIcon>
          </IonItem>

          <SettingsModal
            messageTheme={messageTheme}
            setMessageTheme={setMessageTheme}
            setChatBackgroundColor={setBackgroundColor}
            chatBackgroundColor={BackgroundColor}
            setChatBackground={setBackground}
            chatBackground={Background}
            modalShow={SettingsModalShow}
            setModalShow={setSettingsModalShow}
          />
          <CreateGroup
            modalShow={GroupModalShow}
            setModalShow={setGroupModalShow}
          />
          {state.user?.rooms ? (
            state.user?.rooms?.map((data: Group, i: number) => {
              const { userId } = data.participants.filter(
                (p) => p.userId._id !== state.user._id
              )[0];
              const { profilePic, bio, username, status } = userId;
              return (
                <IonContent
                  onClick={() => {}}
                  key={i}
                  style={{ position: "absolute", top: "8vh", height: "90vh" }}
                >
                  <IonList>
                    <IonItem>
                      <IonAvatar slot="start">
                        <img src={profilePic} alt="pro-pic" />
                      </IonAvatar>
                      <IonLabel>
                        <h3>{username}</h3>
                        <p>{bio}</p>
                      </IonLabel>
                    </IonItem>
                  </IonList>
                </IonContent>
              );
            })
          ) : (
            <IonContent
              style={{ position: "absolute", top: "8vh", height: "90vh" }}
            >
              <IonList>
                <IonItem>
                  <IonAvatar slot="start">
                    <IonSkeletonText animated />
                  </IonAvatar>
                  <IonLabel>
                    <h3>
                      <IonSkeletonText animated style={{ width: "50%" }} />
                    </h3>
                    <p>
                      <IonSkeletonText animated style={{ width: "80%" }} />
                    </p>
                    <p>
                      <IonSkeletonText animated style={{ width: "60%" }} />
                    </p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonAvatar slot="start">
                    <IonSkeletonText animated />
                  </IonAvatar>
                  <IonLabel>
                    <h3>
                      <IonSkeletonText animated style={{ width: "50%" }} />
                    </h3>
                    <p>
                      <IonSkeletonText animated style={{ width: "80%" }} />
                    </p>
                    <p>
                      <IonSkeletonText animated style={{ width: "60%" }} />
                    </p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonAvatar slot="start">
                    <IonSkeletonText animated />
                  </IonAvatar>
                  <IonLabel>
                    <h3>
                      <IonSkeletonText animated style={{ width: "50%" }} />
                    </h3>
                    <p>
                      <IonSkeletonText animated style={{ width: "80%" }} />
                    </p>
                    <p>
                      <IonSkeletonText animated style={{ width: "60%" }} />
                    </p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonAvatar slot="start">
                    <IonSkeletonText animated />
                  </IonAvatar>
                  <IonLabel>
                    <h3>
                      <IonSkeletonText animated style={{ width: "50%" }} />
                    </h3>
                    <p>
                      <IonSkeletonText animated style={{ width: "80%" }} />
                    </p>
                    <p>
                      <IonSkeletonText animated style={{ width: "60%" }} />
                    </p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonAvatar slot="start">
                    <IonSkeletonText animated />
                  </IonAvatar>
                  <IonLabel>
                    <h3>
                      <IonSkeletonText animated style={{ width: "50%" }} />
                    </h3>
                    <p>
                      <IonSkeletonText animated style={{ width: "80%" }} />
                    </p>
                    <p>
                      <IonSkeletonText animated style={{ width: "60%" }} />
                    </p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonAvatar slot="start">
                    <IonSkeletonText animated />
                  </IonAvatar>
                  <IonLabel>
                    <h3>
                      <IonSkeletonText animated style={{ width: "50%" }} />
                    </h3>
                    <p>
                      <IonSkeletonText animated style={{ width: "80%" }} />
                    </p>
                    <p>
                      <IonSkeletonText animated style={{ width: "60%" }} />
                    </p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonAvatar slot="start">
                    <IonSkeletonText animated />
                  </IonAvatar>
                  <IonLabel>
                    <h3>
                      <IonSkeletonText animated style={{ width: "50%" }} />
                    </h3>
                    <p>
                      <IonSkeletonText animated style={{ width: "80%" }} />
                    </p>
                    <p>
                      <IonSkeletonText animated style={{ width: "60%" }} />
                    </p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonAvatar slot="start">
                    <IonSkeletonText animated />
                  </IonAvatar>
                  <IonLabel>
                    <h3>
                      <IonSkeletonText animated style={{ width: "50%" }} />
                    </h3>
                    <p>
                      <IonSkeletonText animated style={{ width: "80%" }} />
                    </p>
                    <p>
                      <IonSkeletonText animated style={{ width: "60%" }} />
                    </p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonAvatar slot="start">
                    <IonSkeletonText animated />
                  </IonAvatar>
                  <IonLabel>
                    <h3>
                      <IonSkeletonText animated style={{ width: "50%" }} />
                    </h3>
                    <p>
                      <IonSkeletonText animated style={{ width: "80%" }} />
                    </p>
                    <p>
                      <IonSkeletonText animated style={{ width: "60%" }} />
                    </p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonAvatar slot="start">
                    <IonSkeletonText animated />
                  </IonAvatar>
                  <IonLabel>
                    <h3>
                      <IonSkeletonText animated style={{ width: "50%" }} />
                    </h3>
                    <p>
                      <IonSkeletonText animated style={{ width: "80%" }} />
                    </p>
                    <p>
                      <IonSkeletonText animated style={{ width: "60%" }} />
                    </p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonAvatar slot="start">
                    <IonSkeletonText animated />
                  </IonAvatar>
                  <IonLabel>
                    <h3>
                      <IonSkeletonText animated style={{ width: "50%" }} />
                    </h3>
                    <p>
                      <IonSkeletonText animated style={{ width: "80%" }} />
                    </p>
                    <p>
                      <IonSkeletonText animated style={{ width: "60%" }} />
                    </p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonAvatar slot="start">
                    <IonSkeletonText animated />
                  </IonAvatar>
                  <IonLabel>
                    <h3>
                      <IonSkeletonText animated style={{ width: "50%" }} />
                    </h3>
                    <p>
                      <IonSkeletonText animated style={{ width: "80%" }} />
                    </p>
                    <p>
                      <IonSkeletonText animated style={{ width: "60%" }} />
                    </p>
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonContent>
          )}
        </IonHeader>
        <IonContent id="content2"></IonContent>
      </IonMenu>
      <IonRouterOutlet
        id="main2"
        style={{
          backgroundColor: `${BackgroundColor}`,
        }}
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
