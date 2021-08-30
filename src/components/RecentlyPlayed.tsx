import {
  IonSlides,
  IonSlide,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonIcon,
} from "@ionic/react";
import { heart, add, play, bookmarkOutline } from "ionicons/icons";
import React from "react";
import { useStateValue } from "../contextApi/stateProvider";

export default function RecentlyPlayed() {
  const [state, dispatch] = useStateValue();
  const getRecent = async () => {
    try {
      const code = state?.user?.spotifyTokens?.access_token;

      const response = await fetch(
        `${
          process.env.REACT_APP_NODE_ENV === "Dev"
            ? "http://localhost:3999/spotify/recently-played"
            : "https://capstonebe.herokuapp.com/spotify/recently-played"
        }`,
        {
          headers: {
            Authorization: `Bearer ${code}`,
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const res = await response.json();

        dispatch({
          type: "SET_RECENT",
          payload: await res,
        });
      } else {
        console.log("Error while fetching categories");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const toggleLike = async (id: any) => {
    if (id) {
      const data = await fetch(
        process.env.REACT_APP_NODE_ENV === "Dev"
          ? `http://localhost:3999/spotify/likeTrack/${id}`
          : `https://capstonebe.herokuapp.com/spotify/likeTrack/${id}`,
        {
          credentials: "include",
        }
      );
      if (data) {
        getRecent();
      }
    }
  };
  const recentlyPlayed = {
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
    lazy: true,
  };
  const playTrack = (index: number) => {
    dispatch({
      type: "SET_CURRENT_PLAYLIST",
      payload: {
        tracks: state.recent,
        index: index,
      },
    });
  };
  return (
    <div>
      <div className="section-name">
        <h2>Recently played on Spotify</h2>
      </div>
      <IonSlides
        style={{ paddingTop: "30px" }}
        key={state.recent?.length}
        options={recentlyPlayed}
      >
        {state?.recent?.map((song: any, i: number) => (
          <IonSlide
            key={i}
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="song">
              <img
                className="song-image"
                draggable="false"
                style={{
                  height: "100%",
                  width: "100%",
                }}
                src={song?.track?.album?.images[0]?.url}
                alt={song?.track?.name}
              />
              <div className="song-info">
                <h3 className="song-text"> {song?.track?.name}</h3>
                <p className="song-text muted">
                  {song?.track?.artists.map((artist: any) => artist.name)}
                </p>
              </div>
              <div className="song-actions">
                <IonIcon
                  onClick={() => playTrack(i)}
                  className="song-button play-button"
                  icon={play}
                />
                <IonIcon
                  onClick={() => {
                    toggleLike(song.track.id);
                  }}
                  className="song-button like-button"
                  icon={bookmarkOutline}
                ></IonIcon>
                <IonIcon
                  className="song-button playlist-button"
                  icon={add}
                ></IonIcon>
              </div>
            </div>
          </IonSlide>
        ))}
      </IonSlides>
      <div style={{ height: "40vh" }}></div>
    </div>
  );
}
