import {
  IonModal,
  IonButton,
  IonContent,
  IonIcon,
  IonRange,
} from "@ionic/react";
import {
  pauseOutline,
  playOutline,
  volumeHighOutline,
  volumeLowOutline,
  volumeMediumOutline,
  volumeMuteOutline,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useStateValue } from "../contextApi/stateProvider";
import TextLoop from "react-text-loop";
import Link from "react-router";

export default function FullScreenPlayer(props: any) {
  const [state, dispatch] = useStateValue();
  const [time, setTime] = useState(0);
  const actualSong = state?.src;
  const audio = document.getElementById("audio-bar");
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
  const updateTrackBar = (dur: any, time: any) => {
    dispatch({
      type: "SET_TRACK_SPECS",
      payload: {
        currentTime: time,
        duration: dur,
      },
    });
  };
  useEffect(() => {
    // audio?.addEventListener("timeupdate", () => {
    //   updateTrackBar(audio?.duration, audio?.currentTime);
    // });
    if (actualSong !== null || undefined) {
      console.log(audio);
    }
  }, [actualSong]);
  const updateVolume = (e: any) => {
    const audiotoplay: any = document.getElementById("audio-tag-element");
    audiotoplay.volume = e.target.value / 100;
    props.setVolume(e.target.value);
  };
  const updateTime = () => {
    const audiotoplay: any = document.getElementById("audio-tag-element");
    audiotoplay.ontimeupdate = () => {
      setTime(audiotoplay.currentTime);
    };
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
  const volumeIcons = () => {
    if (props.volume === 0) {
      return volumeMuteOutline;
    }
    if (props.volume <= 30) {
      return volumeLowOutline;
    }
    if (props.volume <= 50) {
      return volumeMediumOutline;
    }
    if (props.volume <= 80) {
      return volumeHighOutline;
    }
  };
  useEffect(() => {
    updateTime();
  }, []);
  return (
    <IonModal
      swipeToClose={true}
      mode="ios"
      onDidDismiss={() => props.setShowModal(false)}
      cssClass="fullscreen"
      isOpen={props.showModal}
    >
      <div className="fullscreen-player">
        <audio
          id="audio-bar"
          className="playTimeBar"
          onTimeUpdateCapture={(e: any) =>
            updateTrackBar(e.currentTarget.currentTime, e.target.duration)
          }
          src={actualSong}
        />

        <div
          style={{
            display: "flex",
            height: "80vh",
            justifyContent: "center",

            alignItems: "center",
          }}
        >
          <div
            className={state?.playing ? "fs-cd-playing" : "fs-cd"}
            // src="https://www.pngitem.com/pimgs/m/13-134510_vinyl-record-high-resolution-hd-png-download.png"
          ></div>
          <div className="disco"></div>
          <img
            src={state?.cover}
            className={
              state?.playing
                ? "music-player-cover-playing-fs"
                : "music-player-cover-fs"
            }
            alt="track-cover-fs"
          />
        </div>
        <div className="fs-player-buttons">
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
        </div>
        <div className="fs-player-track-info">
          <TextLoop mask={true}>
            <h4
              className={
                state?.user?.appTheming?.theme
                  ? "song-title-light"
                  : "song-title"
              }
            >
              {state?.title}
            </h4>
            <h4
              className={
                state?.user?.appTheming?.theme
                  ? "artist-name-light"
                  : "artist-name"
              }
            >
              {state?.artist}
            </h4>
          </TextLoop>
        </div>
      </div>
      <div className="song-track-duration">
        <IonRange
          color="white"
          className="timeline-range-fs"
          value={props.time}
          onIonChange={(e: any) => {
            props.setTime(e.detail.value);
          }}
          min={0}
          max={30}
        ></IonRange>
      </div>
      <div className="player-volume-fs">
        <IonIcon
          className="volume-icon"
          onClick={() => {
            props.setVolume(0);
          }}
          color={state?.user?.appTheming?.theme ? "white" : "dark"}
          icon={volumeIcons()}
        />
        <IonRange
          className="volume-range-fs"
          value={props.volume}
          onIonChange={(e: any) => updateVolume(e)}
          min={0}
          max={100}
          color="tertiary"
        ></IonRange>
      </div>
    </IonModal>
  );
}
