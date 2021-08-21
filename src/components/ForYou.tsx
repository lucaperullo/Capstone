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
import { heartOutline, addOutline } from "ionicons/icons";
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
    <>
      <div className="section-name">
        <h2>Choosed for {state?.user?.username.split(" ")[0]}</h2>
      </div>
      <IonSlides
        style={{ paddingTop: "30px" }}
        key={state?.categories?.categories?.items
          ?.map((slide: any) => slide.id)
          .join("_")}
        options={forYou}
      >
        {state?.forYou?.map((song: any) => (
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
            <IonCard
              className="suggested-card"
              onClick={() => playTrack(song.preview_url)}
            >
              <img
                draggable="false"
                style={{
                  height: "100%",
                  width: "100%",
                }}
                src={song.album.images[0].url}
                alt={song.name}
              />
              <IonCardHeader
                style={{
                  height: "65px",
                }}
              >
                <h3> {song.name}</h3>
              </IonCardHeader>
              <IonCardContent>
                <div className="song-actions">
                  <IonIcon icon={heartOutline}></IonIcon>
                  <IonIcon icon={addOutline}></IonIcon>
                </div>
              </IonCardContent>
            </IonCard>
          </IonSlide>
        ))}
      </IonSlides>
    </>
  );
}
