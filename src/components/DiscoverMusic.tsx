import {
  IonGrid,
  IonRow,
  IonCol,
  IonSpinner,
  IonContent,
  IonCardContent,
  IonLabel,
  IonItem,
  IonSlides,
  IonSlide,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
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
import {
  addOutline,
  chevronDownCircleOutline,
  heartOutline,
} from "ionicons/icons";
import ForYou from "./ForYou";
import Searchbar from "./Searchbar";
import SearchResults from "./SearchResults";
import RecentlyPlayed from "./RecentlyPlayed";

export default function DiscoverMusic() {
  let history = useHistory();
  const [state, dispatch] = useStateValue();
  const [Loading, setLoading] = useState(false);

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

  return (
    <div
      style={{
        height: "100vh",
        overflow: "visible",
        paddingTop: "120px",
      }}
    >
      <div className="searchbar-">
        <Searchbar />
      </div>
      {state?.searchResults < 1 ? (
        <>
          <div className="section-name">
            <h2>Categories</h2>
          </div>
          <IonSlides
            style={{ paddingTop: "40px" }}
            key={state?.categories?.categories?.items
              ?.map((slide: any) => slide.id)
              .join("_")}
            options={slideOpts}
          >
            {state?.categories?.categories?.items !== undefined ? (
              state?.categories?.categories?.items?.map((item: any) => {
                return (
                  <IonSlide
                    style={{
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <img
                        draggable="false"
                        className="category"
                        onClick={() => getCategory(item.id)}
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: "12px",
                          cursor: "pointer",
                        }}
                        src={item.icons[0]?.url ? item.icons[0].url : ""}
                        alt=""
                      />
                      <h4 style={{ marginTop: "-60px", color: "white" }}>
                        {item.name}
                      </h4>
                    </div>
                  </IonSlide>
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
          </IonSlides>

          <ForYou />
          <RecentlyPlayed />
        </>
      ) : (
        <div className="search-results">
          <div className="section-name">
            <h2>New Releases</h2>
          </div>
          <IonSlides
            style={{ paddingTop: "30px" }}
            key={state?.newReleases?.albums?.items
              ?.map((slide: any) => slide.id)
              .join("_")}
            options={slideOpts}
          >
            {state?.newReleases?.albums?.items !== undefined ? (
              state?.newReleases?.albums?.items?.map((item: any) => {
                return (
                  <IonSlide
                    style={{
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ height: "100px", width: "100px" }}>
                      <img
                        draggable="false"
                        onClick={() => getCategory(item.id)}
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: "12px",
                          cursor: "pointer",
                        }}
                        src={item.images[0]?.url ? item.images[0].url : ""}
                        alt=""
                      />
                    </div>
                  </IonSlide>
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
          </IonSlides>

          <SearchResults />
        </div>
      )}
    </div>
  );
}
function setUsers(data: any) {
  throw new Error("Function not implemented.");
}
