import React, { useEffect, useState } from "react";
import {
  IonAvatar,
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
import { io } from "socket.io-client";
import "../theme/style.css";
import SettingsModal from "./Settings";
import { happySharp, personAddOutline, settingsOutline } from "ionicons/icons";

import { sendSharp } from "ionicons/icons";
import CreateGroup from "./CreateGroup";
import { url } from "inspector";
import "../theme/style.css";

import { useStateValue } from "../contextApi/stateProvider";
import { Group } from "../types";

export const socket = io(`ws://localhost:3000`, {
  withCredentials: true,
  transports: ["websocket"],
});

interface MMessages {
  text: string;
  sender: string;
  room: string;
}
const Chat = () => {
  const [messageTheme, setMessageTheme] = useState<string>("primary");

  const [SettingsModalShow, setSettingsModalShow] = useState<boolean>(false);
  const [GroupModalShow, setGroupModalShow] = useState<boolean>(false);
  // const { status, data, error, isFetching } = useContacts(userNumber);

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MMessages>();
  const [conversation, setConversation] = useState<[MMessages]>();

  const [user, setUser] = useState({});
  const [Background, setBackground] = useState<string>("");
  const [BackgroundColor, setBackgroundColor] = useState("");
  // const mess = useMessages("60d38f76df6d0412e18ecec6");
  // console.log(mess.data);

  const [state, dispatch] = useStateValue();
  console.log(state);

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(message);
      socket.emit("hello", message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      // console.log(newMessage);
      // setMessages((prevMessages: MMessages) => [...prevMessages, newMessage]);
    });
  }, []);

  // const handleSendMessage = () => {
  //   socket.emit("sendMessage", message, () => {
  //     setMessage("");
  //   });
  // };

  // useEffect(() => {
  //   console.log(status);
  //   status === "success" && console.log(data);
  // }, [status]);

  return (
    <IonContent style={{ zIndex: 10 }}>
      <IonHeader>
        {true === true ? (
          <div className="contact-header">
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
          </div>
        ) : (
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
        )}
      </IonHeader>
      <ChatContainer>
        <IonContent
          style={{
            zIndex: 1,
            height: "100%",
            backgroundImage: `url(${Background})`,
            backgroundColor: `transparent`,
          }}
        >
          <div className="left">
            <IonCard style={{ borderRadius: "15px 15px 15px 0px" }}>
              <IonCardContent>
                Hi its Chiara here!
                <div className="ion-text-end">
                  <span>2:54</span>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
          <div className="right">
            <IonCard
              style={{ borderRadius: "15px 0px 15px 15px" }}
              color={messageTheme}
            >
              <IonCardContent>
                Hey Chiara how are you? :D
                <div className="ion-text-end">
                  <span>2:54</span>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
          <div className="left">
            <IonCard style={{ borderRadius: "15px 15px 15px 0px" }}>
              <IonCardContent>
                Im doing great, i would like to know if we could meetup tonight!
                <div className="ion-text-end">
                  <span>2:54</span>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
          <div className="right">
            <IonCard
              style={{ borderRadius: "15px 0px 15px 15px" }}
              color={messageTheme}
            >
              <IonCardContent>
                Sure thing, tell me where and at what time
                <div className="ion-text-end">
                  <span>2:54</span>
                </div>
              </IonCardContent>
            </IonCard>
          </div>

          <div className="left">
            <IonCard style={{ borderRadius: "15px 15px 15px 0px" }}>
              <IonCardContent>
                Im doing great, i would like to know if we could meetup tonight!
                <div className="ion-text-end">
                  <span>2:54</span>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
          <div className="right">
            <IonCard
              style={{ borderRadius: "15px 0px 15px 15px" }}
              color={messageTheme}
            >
              <IonCardContent>
                Sure thing, tell me where and at what time
                <div className="ion-text-end">
                  <span>2:54</span>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
          <div className="right">
            <IonCard
              style={{ borderRadius: "15px 0px 15px 15px" }}
              color={messageTheme}
            >
              <IonCardContent>
                Hey Chiara how are you? :D
                <div className="ion-text-end">
                  <span>2:54</span>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
          <div className="left">
            <IonCard style={{ borderRadius: "15px 15px 15px 0px" }}>
              <IonCardContent>
                Im doing great, i would like to know if we could meetup tonight!
                <div className="ion-text-end">
                  <span>2:54</span>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
          <div className="right">
            <IonCard
              style={{ borderRadius: "15px 0px 15px 15px" }}
              color={messageTheme}
            >
              <IonCardContent>
                Sure thing, tell me where and at what time
                <div className="ion-text-end">
                  <span>2:54</span>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      </ChatContainer>

      <IonItem className="chat-box">
        <IonIcon
          className="chat-button"
          size="large"
          color="primary"
          slot="start"
          icon={happySharp}
        />
        <div className="chat-container">
          <form onSubmit={(e) => handleSubmitMessage(e)}></form>
          <IonTextarea
            placeholder="Write some text..."
            value={message}
            // onKeyPress={handleSendMessage}
            onIonChange={(e) => setMessage(e.detail.value!)}
          />
        </div>
        <IonIcon
          className="chat-button"
          size="large"
          color="primary"
          slot="end"
          icon={sendSharp}
        />
      </IonItem>

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
            // <IonContent style={{ bottom: 0 }}>
            //   <IonList>
            //     <IonItem>
            //       <IonAvatar slot="start">
            //         <IonSkeletonText animated />
            //       </IonAvatar>
            //       <IonLabel>
            //         <h3>
            //           <IonSkeletonText animated style={{ width: "50%" }} />
            //         </h3>
            //         <p>
            //           <IonSkeletonText animated style={{ width: "80%" }} />
            //         </p>
            //         <p>
            //           <IonSkeletonText animated style={{ width: "60%" }} />
            //         </p>
            //       </IonLabel>
            //     </IonItem>
            //     <IonItem>
            //       <IonAvatar slot="start">
            //         <IonSkeletonText animated />
            //       </IonAvatar>
            //       <IonLabel>
            //         <h3>
            //           <IonSkeletonText animated style={{ width: "50%" }} />
            //         </h3>
            //         <p>
            //           <IonSkeletonText animated style={{ width: "80%" }} />
            //         </p>
            //         <p>
            //           <IonSkeletonText animated style={{ width: "60%" }} />
            //         </p>
            //       </IonLabel>
            //     </IonItem>
            //     <IonItem>
            //       <IonAvatar slot="start">
            //         <IonSkeletonText animated />
            //       </IonAvatar>
            //       <IonLabel>
            //         <h3>
            //           <IonSkeletonText animated style={{ width: "50%" }} />
            //         </h3>
            //         <p>
            //           <IonSkeletonText animated style={{ width: "80%" }} />
            //         </p>
            //         <p>
            //           <IonSkeletonText animated style={{ width: "60%" }} />
            //         </p>
            //       </IonLabel>
            //     </IonItem>
            //     <IonItem>
            //       <IonAvatar slot="start">
            //         <IonSkeletonText animated />
            //       </IonAvatar>
            //       <IonLabel>
            //         <h3>
            //           <IonSkeletonText animated style={{ width: "50%" }} />
            //         </h3>
            //         <p>
            //           <IonSkeletonText animated style={{ width: "80%" }} />
            //         </p>
            //         <p>
            //           <IonSkeletonText animated style={{ width: "60%" }} />
            //         </p>
            //       </IonLabel>
            //     </IonItem>
            //     <IonItem>
            //       <IonAvatar slot="start">
            //         <IonSkeletonText animated />
            //       </IonAvatar>
            //       <IonLabel>
            //         <h3>
            //           <IonSkeletonText animated style={{ width: "50%" }} />
            //         </h3>
            //         <p>
            //           <IonSkeletonText animated style={{ width: "80%" }} />
            //         </p>
            //         <p>
            //           <IonSkeletonText animated style={{ width: "60%" }} />
            //         </p>
            //       </IonLabel>
            //     </IonItem>
            //     <IonItem>
            //       <IonAvatar slot="start">
            //         <IonSkeletonText animated />
            //       </IonAvatar>
            //       <IonLabel>
            //         <h3>
            //           <IonSkeletonText animated style={{ width: "50%" }} />
            //         </h3>
            //         <p>
            //           <IonSkeletonText animated style={{ width: "80%" }} />
            //         </p>
            //         <p>
            //           <IonSkeletonText animated style={{ width: "60%" }} />
            //         </p>
            //       </IonLabel>
            //     </IonItem>
            //     <IonItem>
            //       <IonAvatar slot="start">
            //         <IonSkeletonText animated />
            //       </IonAvatar>
            //       <IonLabel>
            //         <h3>
            //           <IonSkeletonText animated style={{ width: "50%" }} />
            //         </h3>
            //         <p>
            //           <IonSkeletonText animated style={{ width: "80%" }} />
            //         </p>
            //         <p>
            //           <IonSkeletonText animated style={{ width: "60%" }} />
            //         </p>
            //       </IonLabel>
            //     </IonItem>
            //     <IonItem>
            //       <IonAvatar slot="start">
            //         <IonSkeletonText animated />
            //       </IonAvatar>
            //       <IonLabel>
            //         <h3>
            //           <IonSkeletonText animated style={{ width: "50%" }} />
            //         </h3>
            //         <p>
            //           <IonSkeletonText animated style={{ width: "80%" }} />
            //         </p>
            //         <p>
            //           <IonSkeletonText animated style={{ width: "60%" }} />
            //         </p>
            //       </IonLabel>
            //     </IonItem>
            //     <IonItem>
            //       <IonAvatar slot="start">
            //         <IonSkeletonText animated />
            //       </IonAvatar>
            //       <IonLabel>
            //         <h3>
            //           <IonSkeletonText animated style={{ width: "50%" }} />
            //         </h3>
            //         <p>
            //           <IonSkeletonText animated style={{ width: "80%" }} />
            //         </p>
            //         <p>
            //           <IonSkeletonText animated style={{ width: "60%" }} />
            //         </p>
            //       </IonLabel>
            //     </IonItem>
            //     <IonItem>
            //       <IonAvatar slot="start">
            //         <IonSkeletonText animated />
            //       </IonAvatar>
            //       <IonLabel>
            //         <h3>
            //           <IonSkeletonText animated style={{ width: "50%" }} />
            //         </h3>
            //         <p>
            //           <IonSkeletonText animated style={{ width: "80%" }} />
            //         </p>
            //         <p>
            //           <IonSkeletonText animated style={{ width: "60%" }} />
            //         </p>
            //       </IonLabel>
            //     </IonItem>
            //     <IonItem>
            //       <IonAvatar slot="start">
            //         <IonSkeletonText animated />
            //       </IonAvatar>
            //       <IonLabel>
            //         <h3>
            //           <IonSkeletonText animated style={{ width: "50%" }} />
            //         </h3>
            //         <p>
            //           <IonSkeletonText animated style={{ width: "80%" }} />
            //         </p>
            //         <p>
            //           <IonSkeletonText animated style={{ width: "60%" }} />
            //         </p>
            //       </IonLabel>
            //     </IonItem>
            //     <IonItem>
            //       <IonAvatar slot="start">
            //         <IonSkeletonText animated />
            //       </IonAvatar>
            //       <IonLabel>
            //         <h3>
            //           <IonSkeletonText animated style={{ width: "50%" }} />
            //         </h3>
            //         <p>
            //           <IonSkeletonText animated style={{ width: "80%" }} />
            //         </p>
            //         <p>
            //           <IonSkeletonText animated style={{ width: "60%" }} />
            //         </p>
            //       </IonLabel>
            //     </IonItem>
            //   </IonList>
            // </IonContent>
            state.user?.rooms?.map((data: Group, i: number) => {
              return (
                <IonContent
                  onClick={() => {}}
                  key={i}
                  style={{ position: "absolute", top: "8vh", height: "90vh" }}
                >
                  <IonList>
                    <IonItem>
                      <IonAvatar slot="start">
                        <img src={data.groupPic} alt="pro-pic" />
                      </IonAvatar>
                      <IonLabel>
                        <h3>{data.name}</h3>
                        <p>{data.partecipants}</p>
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
  display: flex;
  flex-direction: column;
  height: 80vh;
  width: 100vw;
`;

const BlockDiv = styled.div`
  width: 100%;
  margin-top: 7.5px;
  margin-bottom: 7.5px;
  position: relative;
  display: block;
`;
export default Chat;
