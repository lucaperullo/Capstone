import React, { useEffect, useRef, useState } from "react";

import {
  IonAvatar,
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
  IonMenuButton,
  IonRefresher,
  IonRefresherContent,
  IonRouterOutlet,
  IonSearchbar,
  IonText,
  IonTextarea,
} from "@ionic/react";

import styled from "styled-components";
import Moment from "react-moment";

import "../theme/style.css";

import { chevronDownCircleOutline, mic } from "ionicons/icons";

import { sendSharp } from "ionicons/icons";
// import CreateGroup from "./CreateGroup";
import { url } from "inspector";
import "../theme/style.css";

import { useStateValue } from "../contextApi/stateProvider";

import axios from "axios";
import Settings from "./Settings";
import SpotifyWebApi from "spotify-web-api-node";

import Player from "./Player";

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

  const spotifyApi = new SpotifyWebApi({
    clientId: "caefca1208c4456685d3300573064639",
  });
  // const code = state.spotifyCode.toString();
  // const accessToken = useAuth(code);

  // console.log(code);
  function doRefresh(event: { detail: { complete: () => void } }) {
    console.log("Begin async operation");

    setTimeout(() => {
      event.detail.complete();

      setTimeout(() => {
        console.log(searchResults);
      }, 100);
    }, 2000);
  }
  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    socket.emit("SEND_MESSAGE", {
      text: message,
      roomId,
      senderId: state?.user?._id,
    });
    setMessage("");
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

  const chooseTrack = (track: any) => {
    // if (localStorage.getItem("playing")) {
    //   const tracks = localStorage.getItem("playing") + "," + track;
    //   return localStorage.setItem("playing", tracks);
    // }
    localStorage.setItem("playing", track);
    // setSearchResults("");
  };

  const handlePlay = (track: any) => {
    chooseTrack(track);
  };

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
  useEffect(() => {
    if (!searchText) return setSearchResults([]);
    if (state.spotifyAccess !== null) {
      spotifyApi.setAccessToken(state.spotifyAccess);
    }

    spotifyApi
      .searchTracks(searchText)
      .then((res: any) => {
        setSearchResults(res.body.tracks?.items);
      })
      .catch((err) => {
        console.log(err);
        console.log(state);
      });
  }, [searchText]);
  return (
    <IonContent
      scrollEvents={true}
      scrollY={false}
      slot="fixed"
      style={{
        zIndex: 10,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <ChatContainer>
        <TextContainer>
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
                height: "100%",
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
            </div>
            <SenderContainer>
              <IonItem>
                <IonIcon
                  className="chat-button"
                  color="primary"
                  slot="start"
                  icon={mic}
                />

                <div
                  style={{ borderRadius: "15px" }}
                  className="chat-container"
                >
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
            </SenderContainer>
          </IonContent>
        </TextContainer>

        <MusiContainer>
          {/*-- Default Refresher --*/}
          <IonContent>
            <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
              <IonRefresherContent
                pullingIcon={chevronDownCircleOutline}
                pullingText="Pull to refresh"
                refreshingSpinner="circles"
                refreshingText="Refreshing..."
              ></IonRefresherContent>
            </IonRefresher>

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
                        onClick={() => handlePlay(track.uri)}
                        key={track.uri}
                        style={{ height: "auto" }}
                      >
                        <IonCardHeader>
                          <img
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
        style={{ zIndex: 1 }}
        id="main2"
        // style={{
        //   backgroundColor: `${BackgroundColor}`,
        // }}
      ></IonRouterOutlet>
    </IonContent>
  );
};

const MusiContainer = styled(IonCard)`
  @media (max-width: 768px) {
    display: none;
  }
  heigth: 90vh;
  width: 30vw;
`;
const TextContainer = styled(IonCard)`
  @media (max-width: 768px) {
    width: 100%;
  }
  height: 85vh;
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
  padding: 15px;
  padding-bottom: 50px;
  box-shadow: inset 0px 0px 20px 0px rgba(37, 37, 37, 0.461);
  position: absolute;
  z-index: 10;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100vw;
`;
const SenderContainer = styled.div`
  @media (max-width: 768px) {
    width: 100vw;
    padding: 0;
    padding-bottom: 40px;
    left: 0;
  }
  width: 64vw;
  padding-bottom: 40px;
  box-shadow: inset 0px 0px 20px 0px rgba(37, 37, 37, 0.461);
  position: fixed;
  bottom: 0;
`;

export default Chat;
