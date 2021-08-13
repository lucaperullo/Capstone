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
  IonHeader,
  IonToolbar,
  IonSpinner,
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
import DiscoverMusic from "./DiscoverMusic";
import MusicFolder from "./MusicFolder";
import TopUsersFolder from "./TopUsersFolder";
import SimilarTastesFolder from "./SimilarTastesFolder";

const Discover = () => {
  let history = useHistory();
  const [searchText, setSearchText] = useState<string>("");
  const [state, dispatch] = useStateValue();
  const [users, setUsers] = useState<any>();
  const [Loading, setLoading] = useState(false);
  const toggleFollow = async (userid: string) => {
    try {
      const data = await fetch(`http://localhost:3999/users/follow/${userid}`, {
        method: "PUT",
        credentials: "include",
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUser = async () => {
    let socket: { disconnect: () => any };
    try {
      const response = await fetch(`http://localhost:3999/me`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();

        dispatch({
          type: "SET_USER",
          payload: data,
        });
      } else {
        console.log("Error while fetching user");
      }
    } catch (error) {
      console.log(error);
    }
    return () => {
      socket && socket.disconnect();
    };
  };
  const fetchNewReleases = async () => {
    try {
      const code = state?.user?.spotifyTokens?.access_token;
      console.log(code);
      const response = await fetch(
        `http://localhost:3999/spotify/new/releases`,
        { method: "POST", body: code, credentials: "include" }
      );
      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: "SET_NEW_RELEASES",
          payload: data,
        });
      } else {
        console.log("Error while fetching releases");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCategories = async () => {
    try {
      const code = state?.user?.spotifyTokens?.access_token;
      console.log(code);
      const response = await fetch(`http://localhost:3999/spotify/categories`, {
        method: "POST",
        body: code,
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: "SET_CATEGORIES",
          payload: data,
        });
      } else {
        console.log("Error while fetching categories");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCategory = async (category: any) => {
    try {
      const code = state?.user?.spotifyTokens?.access_token;

      const response = await fetch(
        `http://localhost:3999/spotify/category/${category}`,
        {
          headers: {
            Authorization: `Bearer ${code}`,
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("CATEFOEYAUIUADBAI", data);
        dispatch({
          type: "SET_SELECTED_CATEGORY",
          payload: data,
        });
        // window.location.assign(`/discover/${category}`);
      } else {
        console.log("Error while fetching categories");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await axios.get(`http://localhost:3999/users`, {
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
  const getMoreCategories = async () => {
    try {
      const code = state?.user?.spotifyTokens?.access_token;
      const response = await fetch(
        `http://localhost:3999/spotify/view-more-categories`,
        {
          method: "POST",
          body: code,
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: "SET_CATEGORIES",
          payload: data,
        });
      } else {
        console.log("Error while fetching categories");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMoreReleases = async () => {
    try {
      const code = state?.user?.spotifyTokens?.access_token;
      const response = await fetch(
        `http://localhost:3999/spotify/view-more-releases`,
        { method: "POST", body: code, credentials: "include" }
      );
      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: "SET_NEW_RELEASES",
          payload: data,
        });
      } else {
        console.log("Error while fetching releases");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNewReleases();
    fetchCategories();
    fetchUser();
    fetchUsers();
    console.log(state);
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
          <MusicFolder />
          <TopUsersFolder />
          <SimilarTastesFolder />
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
                              onClick={() => toggleFollow(user._id)}
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
