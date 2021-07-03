import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonContent,
  IonItem,
  IonAvatar,
  IonLabel,
  IonSearchbar,
  IonIcon,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonRouterOutlet,
  IonSkeletonText,
} from "@ionic/react";
import { addCircleSharp } from "ionicons/icons";

import "../theme/style.css";
import SettingsModal from "./Settings";
import { useHistory } from "react-router-dom";
import { Group, UserMe } from "../types/index";
import { useStateValue } from "../contextApi/stateProvider";

const Contacts: React.FC = () => {
  const [state, dispatch] = useStateValue();

  const { user } = state;
  let history = useHistory();
  return (
    <>
      <IonMenu
        swipeGesture={true}
        side="start"
        menuId="main"
        contentId="content"
      >
        <div style={{ backgroundColor: "black", height: "100vh" }}>
          <IonHeader>
            <IonItem>
              <IonAvatar slot="start">
                <img src={user?.profilePic} alt="pro-pic" />
              </IonAvatar>
            </IonItem>
            <IonItem>
              <IonSearchbar
                animated={true}
                // value={searchText}
                onIonChange={(e) =>
                  state.user?.rooms?.filter(
                    (contact: { name: string }) =>
                      contact.name === e.detail.value!
                  )
                }
              ></IonSearchbar>
            </IonItem>

            {state.user?.rooms ? (
              state.user?.rooms?.map((data: Group, i: number) => {
                const { userId } = data.participants.filter(
                  (p) => p.userId._id !== state.user._id
                )[0];
                const { profilePic, bio, username, status } = userId;
                return (
                  <IonContent
                    key={i}
                    style={{
                      position: "absolute",
                      top: "16vh",
                      height: "82vh",
                    }}
                  >
                    <IonItem
                      onClick={(e) => {
                        history.push(`/conversations/${data._id}`);
                        // useGenerateGroup()
                        dispatch({ type: "SET_ACTUAL_CHAT", payload: userId });
                      }}
                    >
                      <IonAvatar slot="start">
                        <img src={profilePic} alt="pro-pic" />
                      </IonAvatar>
                      <IonLabel>
                        <h3>{username}</h3>
                        <p>{bio}</p>
                      </IonLabel>
                    </IonItem>
                  </IonContent>
                );
              })
            ) : (
              <IonContent
                style={{ position: "absolute", top: "16vh", height: "82vh" }}
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
        </div>
        <IonContent id="content"></IonContent>
      </IonMenu>
      <IonRouterOutlet id="main"></IonRouterOutlet>
    </>
  );
};

export default Contacts;
