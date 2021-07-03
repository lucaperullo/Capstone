import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  IonSkeletonText,
  IonThumbnail,
} from "@ionic/react";
import axios from "axios";
import {
  pin,
  wifi,
  wine,
  warning,
  walk,
  chevronDownCircleOutline,
  arrowDownOutline,
  personAdd,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useStateValue } from "../contextApi/stateProvider";

const Discover = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [state, dispatch] = useStateValue();
  const [users, setUsers] = useState<any>();
  const [Loading, setLoading] = useState(false);

  const toggleFollow = async (userid: string) => {
    try {
      const data = await axios.post(
        `https://capstonebe.herokuapp.com/users/follow/${userid}`,
        {
          withCredentials: true,
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await axios.get("https://capstonebe.herokuapp.com/users", {
        withCredentials: true,
      });
      setUsers(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  function doRefresh(event: { detail: { complete: () => void } }) {
    console.log("Begin async operation");

    setTimeout(() => {
      console.log("Async operation has ended");
      event.detail.complete();
      setLoading(!Loading);
      setTimeout(() => {
        console.log(state.user);
        setLoading(false);
      }, 1000);
    }, 10);
  }

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <IonContent>
        {/*-- Default Refresher --*/}
        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          <IonCard>
            <IonSearchbar
              value={searchText}
              onIonChange={(e) => setSearchText(e.detail.value!)}
              animated
            ></IonSearchbar>
          </IonCard>
          <IonGrid>
            <IonRow>
              {Loading && (
                <>
                  <IonCol size="3">
                    <IonCard>
                      <IonCardHeader>
                        <IonAvatar>
                          <IonSkeletonText animated />
                        </IonAvatar>

                        <IonCardSubtitle>
                          <IonSkeletonText animated style={{ width: "100%" }} />
                        </IonCardSubtitle>
                        <IonCardTitle>
                          <IonSkeletonText animated style={{ width: "100%" }} />
                        </IonCardTitle>
                      </IonCardHeader>

                      <IonCardContent>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <IonGrid>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                          </IonGrid>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="3">
                    <IonCard>
                      <IonCardHeader>
                        <IonAvatar>
                          <IonSkeletonText animated />
                        </IonAvatar>

                        <IonCardSubtitle>
                          <IonSkeletonText animated style={{ width: "100%" }} />
                        </IonCardSubtitle>
                        <IonCardTitle>
                          <IonSkeletonText animated style={{ width: "100%" }} />
                        </IonCardTitle>
                      </IonCardHeader>

                      <IonCardContent>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <IonGrid>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                          </IonGrid>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="3">
                    <IonCard>
                      <IonCardHeader>
                        <IonAvatar>
                          <IonSkeletonText animated />
                        </IonAvatar>

                        <IonCardSubtitle>
                          <IonSkeletonText animated style={{ width: "100%" }} />
                        </IonCardSubtitle>
                        <IonCardTitle>
                          <IonSkeletonText animated style={{ width: "100%" }} />
                        </IonCardTitle>
                      </IonCardHeader>

                      <IonCardContent>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <IonGrid>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                          </IonGrid>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="3">
                    <IonCard>
                      <IonCardHeader>
                        <IonAvatar>
                          <IonSkeletonText animated />
                        </IonAvatar>

                        <IonCardSubtitle>
                          <IonSkeletonText animated style={{ width: "100%" }} />
                        </IonCardSubtitle>
                        <IonCardTitle>
                          <IonSkeletonText animated style={{ width: "100%" }} />
                        </IonCardTitle>
                      </IonCardHeader>

                      <IonCardContent>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <IonGrid>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                          </IonGrid>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="3">
                    <IonCard>
                      <IonCardHeader>
                        <IonAvatar>
                          <IonSkeletonText animated />
                        </IonAvatar>

                        <IonCardSubtitle>
                          <IonSkeletonText animated style={{ width: "100%" }} />
                        </IonCardSubtitle>
                        <IonCardTitle>
                          <IonSkeletonText animated style={{ width: "100%" }} />
                        </IonCardTitle>
                      </IonCardHeader>

                      <IonCardContent>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <IonGrid>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                          </IonGrid>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="3">
                    <IonCard>
                      <IonCardHeader>
                        <IonAvatar>
                          <IonSkeletonText animated />
                        </IonAvatar>

                        <IonCardSubtitle>
                          <IonSkeletonText animated style={{ width: "100%" }} />
                        </IonCardSubtitle>
                        <IonCardTitle>
                          <IonSkeletonText animated style={{ width: "100%" }} />
                        </IonCardTitle>
                      </IonCardHeader>

                      <IonCardContent>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <IonGrid>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                          </IonGrid>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="3">
                    <IonCard>
                      <IonCardHeader>
                        <IonAvatar>
                          <IonSkeletonText animated />
                        </IonAvatar>

                        <IonCardSubtitle>
                          <IonSkeletonText animated style={{ width: "100%" }} />
                        </IonCardSubtitle>
                        <IonCardTitle>
                          <IonSkeletonText animated style={{ width: "100%" }} />
                        </IonCardTitle>
                      </IonCardHeader>

                      <IonCardContent>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <IonGrid>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                          </IonGrid>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="3">
                    <IonCard>
                      <IonCardHeader>
                        <IonAvatar>
                          <IonSkeletonText animated />
                        </IonAvatar>

                        <IonCardSubtitle>
                          <IonSkeletonText animated style={{ width: "100%" }} />
                        </IonCardSubtitle>
                        <IonCardTitle>
                          <IonSkeletonText animated style={{ width: "100%" }} />
                        </IonCardTitle>
                      </IonCardHeader>

                      <IonCardContent>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <IonGrid>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                          </IonGrid>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="3">
                    <IonCard>
                      <IonCardHeader>
                        <IonAvatar>
                          <IonSkeletonText animated />
                        </IonAvatar>

                        <IonCardSubtitle>
                          <IonSkeletonText animated style={{ width: "100%" }} />
                        </IonCardSubtitle>
                        <IonCardTitle>
                          <IonSkeletonText animated style={{ width: "100%" }} />
                        </IonCardTitle>
                      </IonCardHeader>

                      <IonCardContent>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <IonGrid>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <IonThumbnail>
                                <IonSkeletonText animated />
                              </IonThumbnail>
                              <IonSkeletonText animated />
                            </div>
                          </IonGrid>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </>
              )}
              {!Loading &&
                users?.length > 1 &&
                users.map((user: any) => {
                  console.log(user);
                  return (
                    <IonCol sizeSm="12" sizeMd="6" sizeLg="4">
                      <IonCard>
                        <IonCardHeader>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <IonAvatar>
                              <img src={user.profilePic} alt="" />
                            </IonAvatar>
                            <IonIcon
                              onClick={() => toggleFollow(user._id)}
                              style={{ cursor: "pointer" }}
                              size="large"
                              icon={personAdd}
                            ></IonIcon>
                          </div>
                          <IonCardTitle>
                            <h1>{user.username}</h1>
                          </IonCardTitle>
                          <IonCardSubtitle>
                            <h3>{user.bio}</h3>
                          </IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <IonGrid>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <IonThumbnail>
                                  <IonSkeletonText animated />
                                </IonThumbnail>
                                <IonSkeletonText animated />
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <IonThumbnail>
                                  <IonSkeletonText animated />
                                </IonThumbnail>
                                <IonSkeletonText animated />
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <IonThumbnail>
                                  <IonSkeletonText animated />
                                </IonThumbnail>
                                <IonSkeletonText animated />
                              </div>
                            </IonGrid>
                          </div>
                        </IonCardContent>
                      </IonCard>
                    </IonCol>
                  );
                })}
            </IonRow>
          </IonGrid>
        </IonContent>

        {/*-- Custom Refresher Properties --*/}
        <IonContent>
          <IonRefresher
            slot="fixed"
            onIonRefresh={doRefresh}
            pullFactor={0.5}
            pullMin={100}
            pullMax={200}
          >
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
        </IonContent>

        {/*-- Custom Refresher Content --*/}
        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
            <IonRefresherContent
              pullingIcon={chevronDownCircleOutline}
              pullingText="Pull to refresh"
              refreshingSpinner="circles"
              refreshingText="Refreshing..."
            ></IonRefresherContent>
          </IonRefresher>
        </IonContent>
      </IonContent>
    </>
  );
};
export default Discover;
