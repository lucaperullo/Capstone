import {
  IonBadge,
  IonButton,
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
  IonSlide,
  IonSlides,
  IonText,
  IonThumbnail,
} from "@ionic/react";
import axios from "axios";
import { arrowDownOutline, chevronDownCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../contextApi/stateProvider";

const Following = () => {
  let history = useHistory();
  const slideOpts = {
    // Responsive breakpoints
    // // breakpoints: {
    // //   320: {
    // //     slidesPerView: 2,
    // //     spaceBetween: 10,
    // //   },
    // //   // when window width is >= 320px
    // //   640: {
    // //     slidesPerView: 3,
    // //     spaceBetween: 10,
    // //   },
    // //   // when window width is >= 480px
    // //   720: {
    // //     slidesPerView: 4,
    // //     spaceBetween: 10,
    // //   },
    // //   // when window width is >= 640px
    // //   1024: {
    // //     slidesPerView: 5,
    // //     spaceBetween: 10,
    // //   },
    // //   1080: {
    // //     slidesPerView: 6,
    // //     spaceBetween: 10,
    // //   },
    // //   1280: {
    // //     slidesPerView: 7,
    // //     spaceBetween: 10,
    // //   },
    // //   1920: {
    // //     slidesPerView: 8,
    // //     spaceBetween: 10,
    // //   },
    // },

    autoplay: { delay: 2000, disableOnInteraction: false },

    lazy: true,
    loop: true,
  };

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
    <div style={{ paddingTop: "50px" }}>
      <IonGrid>
        <IonRow>
          {state?.users?.map((user: any, idx: number) => {
            const userPresence = () => {
              if (user.status.presence === "online") return "green";
              if (user.status.presence === "offline") return "red";
              else return "blue";
            };
            return (
              <IonCol sizeSm="12" sizeMd="12" sizeLg="3" key={idx}>
                <IonCard>
                  <IonCardHeader>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <IonItem
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          width: "100%",
                          height: "70px",
                          borderRadius: "10px",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
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
                          src={
                            user.profilePic
                              ? user.profilePic
                              : "https://media.discordapp.net/attachments/786174311718322227/859063520858341387/LOGO_LUCA.png?width=530&height=530"
                          }
                          alt=""
                        />

                        <div
                          style={{
                            backgroundColor: userPresence(),
                            height: "7px",
                            width: "7px",
                            marginTop: "-24px",
                            marginLeft: "-15px",
                            marginRight: "15px",
                            borderRadius: "50%",
                          }}
                        ></div>
                        <IonCardTitle>
                          <h4
                            onClick={() =>
                              history.push(`/discover/user/${user._id}`)
                            }
                            className="link-white"
                          >
                            {user.username}
                          </h4>
                        </IonCardTitle>
                        <IonButton
                          slot="end"
                          onClick={() => toggleFollow(user._id, user.spotifyId)}
                        >
                          Follow
                        </IonButton>
                      </IonItem>
                    </div>
                  </IonCardHeader>

                  <IonCardContent style={{ height: "150px", width: "310px" }}>
                    <IonSlides
                      key={user?.playlists?.userPlaylists?.items
                        ?.map((slide: any) => slide.id)
                        .join("_")}
                      options={slideOpts}
                    >
                      {user?.playlists?.userPlaylists?.items?.map(
                        (playlist: any, i: number) => (
                          <IonSlide key={i}>
                            <div style={{ height: "150px", width: "150px" }}>
                              <img
                                style={{
                                  height: "100px",
                                  width: "100px",
                                  borderRadius: "10px",
                                }}
                                draggable="false"
                                src={playlist.images[0]?.url}
                                alt=""
                              />

                              <h4>{playlist.name}</h4>
                            </div>
                          </IonSlide>
                        )
                      )}
                    </IonSlides>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            );
          })}
        </IonRow>
      </IonGrid>
    </div>
  );
};
export default Following;
