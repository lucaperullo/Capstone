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
import NewContactModal from "./NewContactModal";

import "../theme/style.css";
import SettingsModal from "./Settings";

import { socket } from "./Chat";
import { Group, UserMe } from "../types/index";
import { useStateValue } from "../contextApi/stateProvider";

const Contacts: React.FC = () => {
  const [state, dispatch] = useStateValue();
  const [user, setUser] = useState<UserMe | undefined>();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const fetchUser =
    // useCallback(
    async () => {
      try {
        const response = await fetch(`http://localhost:3999/me`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();

          setUser(data);
          console.log(user);
          socket.emit("LAST_SEEN", { userID: data._id });
        } else {
          console.log("Error while fetching user");
        }
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchUser();
  }, []);
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
              <IonIcon
                color="primary"
                slot="end"
                style={{ display: "flex" }}
                onClick={() => setModalShow(true)}
                icon={addCircleSharp}
                size="large"
              />
            </IonItem>
            <IonItem>
              <IonSearchbar
                animated
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
                        console.log();
                        // useGenerateGroup()
                      }}
                    >
                      <IonAvatar slot="start">
                        <img src={data.groupPic} alt="pro-pic" />
                      </IonAvatar>
                      <IonLabel>
                        <h3>{data.name}</h3>
                        <p>{data.partecipants}</p>
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

            <NewContactModal
              modalShow={modalShow}
              setModalShow={setModalShow}
            />
          </IonHeader>
        </div>
        <IonContent id="content"></IonContent>
      </IonMenu>
      <IonRouterOutlet id="main"></IonRouterOutlet>
    </>
  );
};

export default Contacts;
