import {
  IonSlides,
  IonSlide,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonIcon,
} from "@ionic/react";
import { heart, add, play } from "ionicons/icons";
import React from "react";
import { useStateValue } from "../contextApi/stateProvider";

export default function RecentlyPlayed() {
  const [state, dispatch] = useStateValue();
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
  const playTrack = (track: string) => {
    dispatch({
      type: "SET_ACTUAL_SONG",
      payload: track,
    });
    dispatch({
      type: "SET_PLAYING",
      payload: true,
    });
  };
  return (
    <div>
      <div className="section-name">
        <h2>Recently played</h2>
      </div>
      <IonSlides
        style={{ paddingTop: "30px" }}
        key={state?.categories?.categories?.items
          ?.map((slide: any) => slide.id)
          .join("_")}
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
                  {song?.track?.artists
                    .map((artist: any) => artist.name)
                    .join(", ")}
                </p>
              </div>
              <div className="song-actions">
                <IonIcon
                  onClick={() => playTrack(song.track.preview_url)}
                  className="song-button play-button"
                  icon={play}
                />
                <IonIcon
                  className="song-button like-button"
                  icon={heart}
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
      <div style={{ height: "20vh" }}></div>
    </div>
  );
}
