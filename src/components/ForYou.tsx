import React from "react";
import {
  IonSlides,
  IonSlide,
  IonItem,
  IonCardContent,
  IonLabel,
  IonIcon,
  IonCard,
  IonCardHeader,
} from "@ionic/react";
import { heartOutline, addOutline, play, heart, add } from "ionicons/icons";
import { useStateValue } from "../contextApi/stateProvider";
import styled from "styled-components";

export default function ForYou() {
  const [state, dispatch] = useStateValue();

  const forYou = {
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
  const playTrack = (
    track: string,
    cover: string,
    title: string,
    artist: string
  ) => {
    dispatch({
      type: "SET_ACTUAL_SONG",
      payload: track,
    });
    dispatch({
      type: "SET_PLAYING",
      payload: true,
    });
    dispatch({
      type: "SET_COVER",
      payload: cover,
    });
    dispatch({
      type: "SET_TITLE",
      payload: title,
    });
    dispatch({
      type: "SET_ARTIST",
      payload: artist,
    });
  };
  return (
    <>
      <div className="section-name">
        <h2 style={{ marginTop: "60px" }}>
          Chosen for {state?.user?.username.split(" ")[0]}
        </h2>
      </div>
      <IonSlides
        style={{ paddingTop: "30px" }}
        key={state?.categories?.categories?.items
          ?.map((slide: any) => slide.id)
          .join("_")}
        options={forYou}
      >
        {state?.forYou?.map((song: any, i: number) => (
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
                src={song?.album?.images[0]?.url}
                alt={song?.name}
              />
              <div className="song-info">
                <h3 className="song-text"> {song?.name}</h3>
                <p className="song-text muted">
                  {song?.artists.map((artist: any) => artist.name)}
                </p>
              </div>
              <div className="song-actions">
                <IonIcon
                  onClick={() =>
                    playTrack(
                      song.preview_url,
                      song.album.images[0].url,
                      song.name,
                      song.artists.map((artist: any) => artist.name).join(", ")
                    )
                  }
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
    </>
  );
}
