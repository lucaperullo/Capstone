import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonRefresher,
  IonRefresherContent,
  IonRippleEffect,
  IonRow,
  IonSearchbar,
  IonSkeletonText,
  IonText,
  IonThumbnail,
} from "@ionic/react";
import axios from "axios";
import { arrowDownOutline, chevronDownCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useStateValue } from "../contextApi/stateProvider";

const Following = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [state, dispatch] = useStateValue();
  function doRefresh(event: { detail: { complete: () => void } }) {
    console.log("Begin async operation");

    setTimeout(() => {
      console.log("Async operation has ended");
      event.detail.complete();
    }, 2000);
  }
  const toggleFollow = async (userid: string, username: string) => {
    try {
      const data = await fetch(
        `${
          process.env.REACT_APP_NODE_ENV === "Dev"
            ? `http://localhost:3999/users/follow/${userid}/${username}`
            : `https://capstonebe.herokuapp.com/users/follow/${userid}/${username}`
        }`,

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
      const res = await fetch(
        `${
          process.env.REACT_APP_NODE_ENV === "Dev"
            ? "http://localhost:3999/users"
            : "https://capstonebe.herokuapp.com/users"
        }`,
        {
          credentials: "include",
        }
      );
      const dat = await res.json();
      const data = dat.filter(
        (user: any) => user.username !== state?.user?.username
      );
      dispatch({
        type: "SET_USERS",
        payload: await data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <IonContent style={{ height: "100vh" }}>
      <div style={{ paddingTop: "50px" }}>
        <IonGrid>
          <IonRow>
            {state?.users?.map((user: any, idx: number) => {
              const userPresence = () => {
                if (user.status.presence === "online") return "green";
                if (user.status.presence === "offline") return "grey";
                else return "";
              };
              return (
                <IonCol key={idx} sizeSm="12" sizeMd="6" sizeLg="4">
                  <IonCard>
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
                            draggable="false"
                            style={{
                              height: "40px",
                              width: "40px",
                              borderRadius: "50%",
                              marginRight: "10px",
                            }}
                            onClick={() =>
                              toggleFollow(user._id, user.spotifyId)
                            }
                            src={user.profilePic}
                            alt=""
                          />
                          <IonCardTitle>
                            <h4>{user.username}</h4>
                          </IonCardTitle>
                          <div
                            style={{
                              backgroundColor: userPresence(),
                              height: "6px",
                              width: "6px",
                              marginTop: "-4px",
                              marginLeft: "3px",
                              borderRadius: "50%",
                            }}
                          ></div>
                        </div>
                      </div>
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
                            {user.playlists.userPlaylists.items.map(
                              (playlist: any, i: number) => {
                                <div key={i}>
                                  <IonThumbnail>
                                    <img
                                      draggable="false"
                                      src={playlist.images[0]?.url}
                                      alt=""
                                    />
                                  </IonThumbnail>
                                  <IonText>{playlist.name}</IonText>
                                </div>;
                              }
                            )}
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
      </div>
    </IonContent>
  );
};
export default Following;
