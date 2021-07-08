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
  IonRippleEffect,
  IonBadge,
  IonTabButton,
} from "@ionic/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  pin,
  wifi,
  wine,
  warning,
  walk,
  chevronDownCircleOutline,
  arrowDownOutline,
  personAdd,
  personCircle,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { useStateValue } from "../contextApi/stateProvider";

const Discover = () => {
  let history = useHistory();
  const [searchText, setSearchText] = useState<string>("");
  const [state, dispatch] = useStateValue();
  const [users, setUsers] = useState<any>();
  const [Loading, setLoading] = useState(false);
  console.log(state);
  const toggleFollow = async (userid: string) => {
    try {
      const data = await fetch(
        `https://capstonebe.herokuapp.com/users/follow/${userid}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await axios.get(`https://capstonebe.herokuapp.com/users`, {
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
      fetchUsers();
      event.detail.complete();
      setLoading(!Loading);
      setTimeout(() => {
        console.log(state.user);
        setLoading(false);
      }, 100);
    }, 2000);
  }

  useEffect(() => {
    fetchUsers();
  }, []);
  // const loadStuff = async () => {
  //   console.log(state);
  //   setTimeout(async () => {
  //     fetchUsers();
  //     getTokens();
  //   }, 100);
  // };

  return (
    <>
      <IonContent>
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
          <IonCard>
            <IonSearchbar
              value={searchText}
              onIonChange={(e) => setSearchText(e.detail.value!)}
              animated
            ></IonSearchbar>
          </IonCard>
          <IonGrid>
            <IonRow>
              {Loading && <></>}
              {!Loading &&
                users?.length > 0 &&
                users
                  .filter((user: any) => user._id !== state?.user?._id)
                  .map((user: any, idx: number) => {
                    const userPresence = () => {
                      if (user.status.presence === "online") return "success";
                      if (user.status.presence === "offline") return "dark";
                      else return "";
                    };
                    return (
                      <IonCol key={idx} sizeSm="12" sizeMd="6" sizeLg="4">
                        <StyledCard className="ion-activatable ripple-parent">
                          <IonCardHeader>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  style={{
                                    height: "40px",
                                    width: "40px",
                                    borderRadius: "50%",
                                    marginRight: "10px",
                                  }}
                                  src={user.profilePic}
                                  alt=""
                                />
                                <IonCardTitle>
                                  <h4>{user.username}</h4>
                                </IonCardTitle>
                              </div>
                            </div>
                            {/* <IonBadge
                                color={userPresence()}
                                style={{
                                  position: "relative",
                                  top: "-20px",
                                  left: "20px",
                                }}
                              ></IonBadge> */}
                          </IonCardHeader>
                          <div className="d-none"></div>
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

                          <IonRippleEffect></IonRippleEffect>
                        </StyledCard>
                      </IonCol>
                    );
                  })}
            </IonRow>
          </IonGrid>
        </IonContent>

        {/*-- Custom Refresher Properties --*/}
        {/* <IonContent>
          <IonRefresher
            slot="fixed"
            onIonRefresh={doRefresh}
            pullFactor={3.5}
            pullMin={100}
            pullMax={500}
          >
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
        </IonContent> */}
      </IonContent>
    </>
  );
};

const StyledCard = styled(IonCard)`
  border-radius: 15px;
`;

export default Discover;
