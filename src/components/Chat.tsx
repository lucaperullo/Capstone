import React, { useEffect, useRef, useState } from "react";

import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenu,
  IonRouterOutlet,
  IonSearchbar,
  IonText,
  IonTextarea,
  IonToolbar,
} from "@ionic/react";

import styled from "styled-components";
import Moment from "react-moment";

import "../theme/style.css";

import { mic } from "ionicons/icons";

import { sendSharp } from "ionicons/icons";
// import CreateGroup from "./CreateGroup";

import "../theme/style.css";

import { useStateValue } from "../contextApi/stateProvider";

import axios from "axios";
import Settings from "./Settings";

import { useHistory } from "react-router-dom";

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
  let history = useHistory();
  const [messageTheme, setMessageTheme] = useState<string>("primary");
  const [searchText, setSearchText] = useState<string>("");
  const [SettingsModalShow, setSettingsModalShow] = useState<boolean>(false);
  const [GroupModalShow, setGroupModalShow] = useState<boolean>(false);
  // const { status, data, error, isFetching } = useContacts(userNumber);
  const [searchResults, setSearchResults] = useState<any>(null);
  const [playingTrack, setPlayingTrack] = useState<any>();
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

  // const code = state.spotifyCode.toString();
  // const accessToken = useAuth(code);

  // console.log(code);
  // function doRefresh(event: { detail: { complete: () => void } }) {
  //   console.log("Begin async operation");

  //   setTimeout(() => {
  //     event.detail.complete();

  //     setTimeout(() => {
  //       console.log(searchResults);
  //     }, 100);
  //   }, 2000);
  // }
  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    socket.emit("SEND_MESSAGE", {
      text: message,
      roomId,
      senderId: state?.user?._id,
    });
    setMessage("");
    fetchMessages();
    // scrollToBottom();
  };
  const handleSubmitMessageEnter = async (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      socket.emit("SEND_MESSAGE", {
        text: message,
        roomId,
        senderId: state?.user?._id,
      });
      setMessage("");
      fetchMessages();
    }
  };
  const contentRef = useRef<HTMLIonContentElement | null>(null);
  const scrollToBottom = () => {
    contentRef.current && contentRef.current.scrollToBottom();
  };
  const fetchMessages = async () => {
    const messages = await axios.get(
      `${
        process.env.REACT_APP_NODE_ENV === "Dev"
          ? `http://localhost:3999/messages/${roomId}`
          : `https://capstonebe.herokuapp.com/messages/${roomId}`
      }`,
      {
        withCredentials: true,
      }
    );

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

  const chooseTrack = (track: any) => {
    // if (localStorage.getItem("playing")) {
    //   const tracks = localStorage.getItem("playing") + "," + track;
    //   return localStorage.setItem("playing", tracks);
    // }
    dispatch({ type: "SET_ACTUAL_SONG", payload: track });
    // setSearchResults("");
  };

  // const handlePlay = (track: any, id: any) => {
  //   chooseTrack(track);
  //   // getControls(id);
  // };

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
  // useEffect(() => {

  // }, []);

  //GET AUDIO CONTROLS FOR SONG

  useEffect(() => {
    if (!searchText) return setSearchResults([]);
    console.log("search is triggeres");
  }, []);
  return (
    <IonContent
      scrollEvents={true}
      scrollY={false}
      slot="fixed"
      style={{
        position: "absolute",
        height: "100vh",
        zIndex: 20,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <ChatContainer>
        <TextContainer>
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
                paddingBottom: "60px",
                paddingTop: "20px",
                minHeight: "100%",
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
              <HeaderChat>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonBackButton defaultHref={"home"} />
                  </IonButtons>
                  {state?.actualChat && (
                    <IonItem>
                      <IonAvatar slot="start">
                        <img
                          draggable="false"
                          src={state.actualChat.profilePic}
                          alt=""
                        />
                      </IonAvatar>
                      <IonLabel>
                        <h2>{state.actualChat.username}</h2>
                        {/* <p>{state.actualChat.bio}</p> */}
                        <p>{state.actualChat.status.presence}</p>
                      </IonLabel>
                    </IonItem>
                  )}
                </IonToolbar>
              </HeaderChat>
              {conversation?.map(
                ({ text, senderId, createdAt, _id }, idx: number) => {
                  const current =
                    state?.user?._id === senderId._id ? true : false;
                  return (
                    <div key={idx} className={current ? "right" : "left"}>
                      <IonCard
                        color={
                          current ? state?.user?.appTheming?.bubbleChat : ""
                        }
                        style={{
                          borderRadius: current
                            ? "15px 0px 15px 15px"
                            : "15px 15px 15px 0px",
                          boxShadow: `0px 0px 20px 1px ${
                            state?.user?.appTheming.backgroundColor ||
                            BackgroundColor
                          }`,
                        }}
                      >
                        <IonCardHeader>
                          <IonCardTitle>{text}</IonCardTitle>
                          <IonCardSubtitle>
                            <Moment date={createdAt} format="HH:mm" />
                          </IonCardSubtitle>
                        </IonCardHeader>
                      </IonCard>
                    </div>
                  );
                }
              )}
              <SenderContainer>
                <IonItem>
                  <div
                    style={{
                      width: "40px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <IonIcon
                      className="chat-button"
                      color="primary"
                      slot="start"
                      icon={mic}
                    />
                  </div>
                  <IonTextarea
                    placeholder="Write some text..."
                    value={message}
                    // onKeyPress={handleSendMessage}
                    onIonChange={(e) => setMessage(e.detail.value!)}
                    onKeyDown={(e) => handleSubmitMessageEnter(e)}
                  />

                  {message.length > 0 && (
                    <div
                      style={{
                        paddingLeft: "10px",
                        width: "40px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onClick={handleSubmitMessage}
                    >
                      <IonIcon
                        className="chat-button"
                        color="primary"
                        slot="end"
                        icon={sendSharp}
                      />
                    </div>
                  )}
                </IonItem>
              </SenderContainer>
            </div>
          </IonContent>
        </TextContainer>

        <MusiContainer>
          <IonContent>
            <IonSearchbar
              slot="fixed"
              value={searchText}
              onIonChange={(e) => setSearchText(e.detail.value!)}
              animated
            ></IonSearchbar>

            <IonCard style={{ paddingTop: "50px" }}>
              <IonCardContent>
                {searchResults &&
                  searchResults.length > 0 &&
                  searchResults.map((track: any) => {
                    return (
                      <IonCard
                        // onClick={() => handlePlay(track.uri, track.id)}
                        key={track.uri}
                        style={{ height: "auto", cursor: "pointer" }}
                      >
                        <IonCardHeader>
                          <img
                            draggable="false"
                            src={track.album.images[0].url}
                            alt={track.name}
                          />
                          <IonCardTitle>{track.name}</IonCardTitle>
                          <IonCardSubtitle>
                            {track.artists[0].name}
                          </IonCardSubtitle>
                        </IonCardHeader>
                      </IonCard>
                    );
                  })}
                {searchResults && searchResults.length < 1 && (
                  <EmptySearch>Results will be displayed here..</EmptySearch>
                )}
              </IonCardContent>
            </IonCard>
          </IonContent>
        </MusiContainer>
      </ChatContainer>

      <IonMenu
        swipeGesture={true}
        side="end"
        menuId="main2"
        contentId="content2"
      >
        <IonHeader>
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
        </IonHeader>
        <IonContent id="content2"></IonContent>
      </IonMenu>
      <IonRouterOutlet style={{ zIndex: 1 }} id="main2"></IonRouterOutlet>
    </IonContent>
  );
};

const MusiContainer = styled(IonContent)`
  @media (max-width: 768px) {
    display: none;
  }
  heigth: 100vh;
  width: 30vw;
`;
const TextContainer = styled(IonContent)`
  @media (max-width: 768px) {
    width: 100%;
  }
  height: auto;
  width: 70vw;
  padding-bottom: 65px;
`;
const EmptySearch = styled(IonText)`
  height: 85vh;
`;

const ChatContainer = styled.div`
  @media (max-width: 768px) {
    width: 100vw;
  }

  box-shadow: inset 0px 0px 20px 0px rgba(37, 37, 37, 0.461);
  position: absolute;
  z-index: 10;
  display: flex;
  flex-direction: row;
  height: 100%;
  padding-top: 50px;
  width: 100vw;
`;
const HeaderChat = styled.div`
  height: 50px;
  width: 100vw;
  z-index: 10;

  position: fixed;
  width: 100%;
  top: 0px;
`;
const SenderContainer = styled.div`
  @media (max-width: 768px) {
    width: 100vw;
  }
  position: fixed;
  height: 60px;
  width: 50vw;
  bottom: 0px;
  box-shadow: inset 0px 0px 20px 0px rgba(37, 37, 37, 0.461);
`;

export default Chat;
