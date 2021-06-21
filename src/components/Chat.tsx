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
import io from "socket.io-client";
import "../theme/style.css";
import SettingsModal from "./Settings";
import { happySharp, personAddOutline, settingsOutline } from "ionicons/icons";
import { useContacts } from "../hooks/useContacts";
import { useAllGroups } from "../hooks/useGroups";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { sendSharp } from "ionicons/icons";
import CreateGroup from "./CreateGroup";
import { url } from "inspector";
import "../theme/style.css";
// socket
const endpoint = "http://localhost:5000";
const socket = io(endpoint, { transports: ["websocket"] });
// interface color {

// }
const Chat = () => {
  const [userNumber] = useLocalStorage<string>("userNumber", "");
  const [SettingsModalShow, setSettingsModalShow] = useState<boolean>(false);
  const [GroupModalShow, setGroupModalShow] = useState<boolean>(false);
  const { status, data, error, isFetching } = useContacts(userNumber);
  const [message, setMessage] = useState<string>("");
  const [Background, setBackground] = useState<string>("");
  const [BackgroundColor, setBackgroundColor] = useState("");
  const handleSendMessage = () => {
    socket.emit("sendMessage", message, () => {
      setMessage("");
    });
  };

  // useEffect(() => {
  //   console.log(status);
  //   status === "success" && console.log(data);
  // }, [status]);

  return (
    <IonContent>
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
        <IonContent style={{ zIndex: 1, height: "100%" }}>
          <div className="left">
            <IonCard>
              <IonCardContent>
                Hi its Chiara here!
                <div className="ion-text-end">
                  <span>2:54</span>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
          <div className="right">
            <IonCard>
              <IonCardContent>
                Hey Chiara how are you? :D
                <div className="ion-text-end">
                  <span>2:54</span>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
          <div className="left">
            <IonCard>
              <IonCardContent>
                Im doing great, i would like to know if we could meetup tonight!
                <div className="ion-text-end">
                  <span>2:54</span>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
          <div className="right">
            <IonCard>
              <IonCardContent>
                Sure thing, tell me where and at what time
                <div className="ion-text-end">
                  <span>2:54</span>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
          <div className="right">
            <IonCard>
              <IonCardContent>
                Hey Chiara how are you? :D
                <div className="ion-text-end">
                  <span>2:54</span>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
          <div className="left">
            <IonCard>
              <IonCardContent>
                Im doing great, i would like to know if we could meetup tonight!
                <div className="ion-text-end">
                  <span>2:54</span>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
          <div className="right">
            <IonCard>
              <IonCardContent>
                Sure thing, tell me where and at what time
                <div className="ion-text-end">
                  <span>2:54</span>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
          <div className="right">
            <IonCard>
              <IonCardContent>
                Hey Chiara how are you? :D
                <div className="ion-text-end">
                  <span>2:54</span>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
          <div className="left">
            <IonCard>
              <IonCardContent>
                Im doing great, i would like to know if we could meetup tonight!
                <div className="ion-text-end">
                  <span>2:54</span>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
          <div className="right">
            <IonCard>
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
          <IonTextarea
            placeholder="Write some text..."
            value={message}
            onKeyPress={handleSendMessage}
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
          {data ? (
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
            data.map((data, i) => {
              return (
                <IonContent
                  key={i}
                  style={{ position: "absolute", top: "8vh", height: "90vh" }}
                >
                  <IonList>
                    <IonItem>
                      <IonAvatar slot="start">
                        <img src={data.profileImg} alt="profileImg" />
                      </IonAvatar>
                      <IonLabel>
                        <h3>{data.contactsName}</h3>
                        <p>{data.about}</p>
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
          backgroundImage: `url(${Background})`,
          backgroundColor: `${BackgroundColor}`,
        }}
      ></IonRouterOutlet>
    </IonContent>
  );
};

const IonContainer = styled(IonContent)`
  display: flex;
  flex-direction: column-reverse;
`;
const IonItems = styled(IonItem)`
  position: fixed;
  bottom: 1rem;
  width: 62%;
`;
const ChatContainer = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;
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
