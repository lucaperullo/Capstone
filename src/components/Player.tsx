import { IonButton, IonIcon, IonLabel, IonRange } from "@ionic/react";
import {
  shuffleOutline,
  repeatOutline,
  playSkipBackOutline,
  playOutline,
  pauseOutline,
  playSkipForwardOutline,
  sunny,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";

import { useStateValue } from "../contextApi/stateProvider";
export default function Player() {
  const [state, dispatch] = useStateValue();

  const playMusic = () => {
    if (state?.tracks) {
      console.log(state.tracks);
      dispatch({
        type: "SET_ACTUAL_SONG",
        payload: state.tracks[state.idx]?.track?.preview_url,
      });
    }
    dispatch({
      type: "SET_PLAYING",
      payload: true,
    });
    const audiotoplay: any = document.getElementById("audio-tag-element");
    audiotoplay.src = state?.src;
    const playPromise = audiotoplay.play();
    if (playPromise) {
      playPromise.then(() => {
        setTimeout(() => {
          audiotoplay.pause();
          dispatch({
            type: "SET_PLAYING",
            payload: false,
          });
        }, 30000);
      });
      // .catch(() => {
      //   dispatch({
      //     type: "SET_PLAYING",
      //     payload: false,
      //   });
      // });
    }
  };
  const previousTrack = () => {
    const audiotoplay: any = document.getElementById("audio-tag-element");
    dispatch({
      type: "SET_ACTUAL_IDX",
      payload: state.idx - 1,
    });
    dispatch({
      type: "SET_ACTUAL_SONG",
      payload: state?.tracks[state.idx - 1]?.track?.preview_url,
    });
    audiotoplay.src = state?.src;
    const playPromise = audiotoplay.play();
    dispatch({
      type: "SET_PLAYING",
      payload: true,
    });
    if (playPromise) {
      playPromise.then(() => {
        setTimeout(() => {
          audiotoplay.pause();
          dispatch({
            type: "SET_PLAYING",
            payload: false,
          });
        }, 30000);
      });
      // .catch(() => {
      //   dispatch({
      //     type: "SET_PLAYING",
      //     payload: false,
      //   });
      // });
    }
    // setPlayingTrackName(
    //   state?.tracks?.items[state?.idx - 1]?.track?.name
    // );
    // setPlayingArtistName(
    //   state?.tracks?.items[state?.idx - 1]?.track?.artists[0]?.name
    // );
  };
  const nextTrack = () => {
    const audiotoplay: any = document.getElementById("audio-tag-element");
    dispatch({
      type: "SET_ACTUAL_IDX",
      payload: state.idx + 1,
    });
    dispatch({
      type: "SET_ACTUAL_SONG",
      payload: state?.tracks[state.idx + 1]?.track?.preview_url,
    });
    dispatch({
      type: "SET_PLAYING",
      payload: true,
    });
    audiotoplay.src = state?.src;
    const playPromise = audiotoplay.play();
    if (playPromise) {
      playPromise.then(() => {
        setTimeout(() => {
          audiotoplay.pause();
          dispatch({
            type: "SET_PLAYING",
            payload: false,
          });
        }, 30000);
      });
      // .catch(() => {
      //   dispatch({
      //     type: "SET_PLAYING",
      //     payload: false,
      //   });
      // });
    }
  };
  const pauseMusic = () => {
    // dispatch({
    //   type: "SET_ACTUAL_SONG",
    //   src: state?.tracks?.items[state?.idx]?.track?.preview_url,
    // });
    dispatch({
      type: "SET_PLAYING",
      payload: false,
    });
    const audiotoplay: any = document.getElementById("audio-tag-element");
    audiotoplay.pause();
  };
  // const repeatOrPlayAll = () => {
  //   const audiotoplay: any = document.getElementById("audio-tag-element");
  //   audiotoplay.play();
  //   setTimeout(() => {
  //     audiotoplay.pause();
  //     audiotoplay.src = state?.tracks?.items[index]?.track?.preview_url;
  //     setIndex(+1);
  //     audiotoplay.play();
  //   }, 3000);
  // };
  useEffect(() => {
    console.log(state?.tracks);
  }, []);
  return (
    <div
      className={
        state?.user?.appTheming?.theme ? "our-player" : "our-player-light"
      }
    >
      <div className="music-player-info">
        <img
          draggable="false"
          className={
            state?.player?.playing
              ? "music-player-cover-playing"
              : "music-player-cover"
          }
          // src={playingTrack}
        />
        <div className="names">
          {/* <h2 className="music-player-title">{playingTrackName}</h2>
          <h4 className="music-player-artist">{playingArtistName}</h4> */}
        </div>
        <audio id="audio-tag-element" src={state?.src}></audio>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IonIcon
            // onClick={() => repeatOrPlayAll()}
            className="player-icons"
            icon={repeatOutline}
          ></IonIcon>

          <IonIcon
            onClick={() => previousTrack()}
            className="player-icons"
            icon={playSkipBackOutline}
          ></IonIcon>
          <button className="playPause">
            {state?.playing === true ? (
              <IonIcon
                onClick={() => {
                  pauseMusic();
                }}
                size="large"
                icon={pauseOutline}
              ></IonIcon>
            ) : (
              <IonIcon
                onClick={() => {
                  playMusic();
                }}
                size="large"
                icon={playOutline}
              ></IonIcon>
            )}
          </button>
          <IonIcon
            onClick={() => nextTrack()}
            className="player-icons"
            icon={playSkipForwardOutline}
          ></IonIcon>
          <IonIcon className="player-icons" icon={shuffleOutline}></IonIcon>
        </div>
      </div>
      <div style={{ height: "40px", width: "15vw" }}>
        <IonRange min={0} max={100} color="secondary">
          <IonLabel slot="start">0</IonLabel>
          <IonLabel slot="end">100</IonLabel>
        </IonRange>
      </div>
    </div>
  );
}
