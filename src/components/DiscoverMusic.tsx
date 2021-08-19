import {
  IonGrid,
  IonRow,
  IonCol,
  IonSpinner,
  IonContent,
  IonCardContent,
  IonLabel,
  IonItem,
} from "@ionic/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper styles

// Import Swiper React components

// install Swiper modules
import { useStateValue } from "../contextApi/stateProvider";
import { useHistory } from "react-router";
import { chevronDownCircleOutline } from "ionicons/icons";

export default function DiscoverMusic() {
  let history = useHistory();
  const [state, dispatch] = useStateValue();
  const [Loading, setLoading] = useState(false);

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

        dispatch({
          type: "SET_CATEGORY",
          payload: data,
        });
        dispatch({
          type: "SET_SELECTED_CATEGORY",
          payload: category,
        });
        console.log(state);
        history.push(`/discover/${category}`);
      } else {
        console.log("Error while fetching categories");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getForYou = async () => {
    try {
      const code = state?.user?.spotifyTokens?.access_token;
      console.log("running forYou");
      const response = await fetch(
        `http://localhost:3999/spotify/raccomanded`,
        {
          headers: {
            Authorization: `Bearer ${code}`,
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const res = await response.json();
        console.log("this is res, ", res);
        const data = res.filter((item: any) => item.preview_url !== null);
        dispatch({
          type: "SET_FOR_YOU",
          payload: data,
        });

        console.log(state);
      } else {
        console.log("Error while fetching categories");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getRecent = async () => {
    try {
      console.log("running get recent");
      const code = state?.user?.spotifyTokens?.access_token;

      const response = await fetch(
        `http://localhost:3999/spotify/recently-played`,
        {
          headers: {
            Authorization: `Bearer ${code}`,
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const res = await response.json();

        const data = res.filter((item: any) => item.track.preview_url !== null);
        dispatch({
          type: "SET_RECENT",
          payload: data,
        });

        console.log(state);
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
  useEffect(() => {
    // getMoreCategories();
    // getMoreReleases();
    getForYou();
    getRecent();
  }, []);
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
  return (
    <>
      <IonContent style={{ height: "25vh" }}>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          breakpoints={{
            "0": {
              effect: "slide",
              centeredSlides: true,
              slidesPerView: 1,
              spaceBetween: 10,
            },
            "640": {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            "768": {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            "1024": {
              slidesPerView: 8,
              spaceBetween: 50,
            },
          }}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 45,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          className="mySwiper"
        >
          {state?.categories?.categories?.items !== undefined ? (
            state?.categories?.categories?.items?.map((item: any) => {
              return (
                <SwiperSlide>
                  <img
                    onClick={() => getCategory(item.id)}
                    style={{
                      borderRadius: "12px",

                      cursor: "pointer",
                    }}
                    src={item.icons[0]?.url ? item.icons[0].url : ""}
                    alt=""
                  />
                  <h4>{item.name}</h4>
                </SwiperSlide>
              );
            })
          ) : (
            <div
              style={{
                height: "40vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IonSpinner name="crescent" />
            </div>
          )}
        </Swiper>
      </IonContent>
      <IonContent style={{ height: "25vh" }}>
        <IonGrid>
          <IonRow>
            {state?.forYou?.map((song: any) => (
              <IonCol sizeMd="6" sizeSm="12">
                <IonItem
                // onClick={() => getTracks(playlist.id, idx, playlist.name)}
                >
                  <IonCardContent
                    className="suggested-card"
                    style={{ height: "125px", display: "flex" }}
                  >
                    <img
                      style={{
                        position: "relative",
                        top: "-20%",
                        height: "155px",
                      }}
                      src={song.album.images[0].url}
                      alt={song.name}
                    />

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IonLabel>{song.name}</IonLabel>
                    </div>
                  </IonCardContent>
                </IonItem>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
}
function setUsers(data: any) {
  throw new Error("Function not implemented.");
}
