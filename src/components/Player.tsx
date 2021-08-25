import { IonButton, IonIcon, IonLabel, IonModal, IonRange } from "@ionic/react";
import {
  shuffleOutline,
  repeatOutline,
  playSkipBackOutline,
  playOutline,
  pauseOutline,
  playSkipForwardOutline,
  sunny,
  volumeMuteOutline,
  volumeLowOutline,
  volumeMediumOutline,
  volumeHighOutline,
} from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import TextLoop from "react-text-loop";

import { useStateValue } from "../contextApi/stateProvider";
import FullScreenPlayer from "./FullScreenPlayer";
export default function Player() {
  const [state, dispatch] = useStateValue();
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const audioPlayer: any = useRef();
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
    }
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
  const updateVolume = (e: any) => {
    const audiotoplay: any = document.getElementById("audio-tag-element");
    audiotoplay.volume = e.target.value / 100;
    setVolume(e.target.value);
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
    if (volume === 0) {
      return volumeMuteOutline;
    }
    if (volume <= 30) {
      return volumeLowOutline;
    }
    if (volume <= 50) {
      return volumeMediumOutline;
    }
    if (volume >= 80) {
      return volumeHighOutline;
    }
  };
  useEffect(() => {
    updateTime();
  }, []);
  return (
    <>
      <FullScreenPlayer
        volume={volume}
        setVolume={setVolume}
        time={time}
        setTime={setTime}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <div
        className={
          state?.user?.appTheming?.theme ? "our-player" : "our-player-light"
        }
      >
        <div className="music-player-info">
          <img
            onClick={() => setShowModal(true)}
            draggable="false"
            className={
              state?.playing
                ? "music-player-cover-playing"
                : "music-player-cover"
            }
            src={state?.cover}
          />
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
          <audio ref={audioPlayer} id="audio-tag-element" src={state?.src} />
        </div>
        <div>
          <div className="player-buttons">
            <div className="p-buttons">
              <IonIcon
                // onClick={() => repeatOrPlayAll()}
                className="player-icons desktop-buttons"
                icon={repeatOutline}
              ></IonIcon>

              <IonIcon
                onClick={() => previousTrack()}
                className="player-icons desktop-buttons"
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
                className="player-icons desktop-buttons"
                icon={playSkipForwardOutline}
              ></IonIcon>
              <IonIcon
                className="player-icons desktop-buttons"
                icon={shuffleOutline}
              ></IonIcon>
            </div>
            <div className="song-track-duration">
              <IonRange
                color="dark"
                className="timeline-range"
                onIonChange={(e: any) => {
                  setTime(e.target.value);
                }}
                value={time}
                min={0}
                max={30}
              ></IonRange>
            </div>
          </div>
        </div>
        <div className="player-volume">
          <IonIcon
            className="volume-icon"
            onClick={() => {
              setVolume(0);
            }}
            color={state?.user?.appTheming?.theme ? "white" : "dark"}
            icon={volumeIcons()}
          />
          <IonRange
            className="volume-range"
            value={volume}
            onIonChange={(e: any) => updateVolume(e)}
            min={0}
            max={100}
            color="tertiary"
          ></IonRange>
        </div>
      </div>
    </>
  );
}
