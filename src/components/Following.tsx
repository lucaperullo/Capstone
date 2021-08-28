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
  IonSlide,
  IonSlides,
  IonText,
  IonThumbnail,
} from "@ionic/react";
import axios from "axios";
import { arrowDownOutline, chevronDownCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useStateValue } from "../contextApi/stateProvider";

const Following = () => {
  const slideOpts = {
    freeMode: true,
    // Responsive breakpoints
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      // when window width is >= 320px
      640: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      // when window width is >= 480px
      720: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      // when window width is >= 640px
      1024: {
        slidesPerView: 5,
        spaceBetween: 10,
      },
      1080: {
        slidesPerView: 6,
        spaceBetween: 10,
      },
      1280: {
        slidesPerView: 7,
        spaceBetween: 10,
      },
      1920: {
        slidesPerView: 8,
        spaceBetween: 10,
      },
    },

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
                <IonCol key={idx} sizeSm="12" sizeMd="12" sizeLg="12">
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
                            src={
                              user.profilePic
                                ? user.profilePic
                                : "https://media.discordapp.net/attachments/786174311718322227/859063520858341387/LOGO_LUCA.png?width=530&height=530"
                            }
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
                      <IonSlides options={slideOpts}>
                        {user.playlists.userPlaylists.items.map(
                          (playlist: any, i: number) => (
                            <IonSlide>
                              <div key={i}>
                                <img
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
    </IonContent>
  );
};
export default Following;
