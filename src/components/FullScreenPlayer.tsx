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
import React, { useEffect, useRef, useState } from "react";
import { useStateValue } from "../contextApi/stateProvider";
import TextLoop from "react-text-loop";
import Link from "react-router";

export default function FullScreenPlayer(props: any) {
  const [state, dispatch] = useStateValue();

  if (props.audiotoplay.current) {
    props.audiotoplay.current.onended = () => {
      nextTrack();
    };
  }
  const playMusic = () => {
    if (props.audiotoplay.current) {
      props.audiotoplay.current.src =
        state?.nowPlaying?.tracks[state?.nowPlaying?.index]?.preview_url;
      state?.nowPlaying?.playing
        ? props.audiotoplay?.current?.play()
        : props.audiotoplay?.current?.pause();
    }
  };

  const playPauseMusic = () => {
    dispatch({
      type: "SET_PLAY_PAUSE",
      payload: !state.nowPlaying.playing,
    });
  };

  useEffect(() => {
    playMusic();
  }, [state?.nowPlaying]);
  const previousTrack = () => {
    dispatch({
      type: "SET_CURRENT_PLAYLIST",
      payload: {
        ...state?.nowPlaying,
        index: state?.nowPlaying?.index > 1 ? state?.nowPlaying?.index - 1 : 0,
      },
    });
  };
  const nextTrack = () => {
    dispatch({
      type: "SET_CURRENT_PLAYLIST",
      payload: {
        ...state?.nowPlaying,
        index:
          state?.nowPlaying?.tracks.length > state?.nowPlaying?.index + 1
            ? state?.nowPlaying?.index + 1
            : 0,
      },
    });
  };

  const updateVolume = (e: any) => {
    if (props.audiotoplay.current) {
      props.audiotoplay.current.volume = e.target.value / 100;
      props.setVolume(e.target.value);
    }
  };
  const updateTime = () => {
    console.log("hi");
    // if (props.audiotoplay.current.currentTime !== null) {
    //   console.log(props.audiotoplay.current);
    //   props.audiotoplay.current.ontimeupdate = () => {
    //     props.setTime(props.audiotoplay.current.currentTime);
    //   };
    // }
  };

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
    if (props.volume >= 80) {
      return volumeHighOutline;
    }
  };
  useEffect(() => {
    if (!!props.audiotoplay.current) {
      props.audiotoplay.current.volume = props.volume / 100;
    }
  }, [props.audiotoplay, props.volume]);
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
        <div
          style={{
            display: "flex",
            height: "80vh",
            justifyContent: "center",

            alignItems: "center",
          }}
        >
          <div
            className={state.nowPlaying.playing ? "fs-cd-playing" : "fs-cd"}
            // src="https://www.pngitem.com/pimgs/m/13-134510_vinyl-record-high-resolution-hd-png-download.png"
          ></div>
          <div className="disco"></div>
          <img
            src={
              state?.nowPlaying?.tracks[state?.nowPlaying?.index]?.track?.album
                ?.images[0]?.url ||
              state?.nowPlaying?.tracks[state?.nowPlaying?.index]?.album
                ?.images[0]?.url
            }
            className={
              state.nowPlaying.playing
                ? "music-player-cover-playing-fs"
                : "music-player-cover-fs"
            }
            alt="track-cover-fs"
          />
        </div>
        <div className="fs-player-buttons">
          <button className="playPause">
            {state.nowPlaying.playing === true ? (
              <IonIcon
                onClick={() => {
                  playPauseMusic();
                }}
                size="large"
                icon={pauseOutline}
              ></IonIcon>
            ) : (
              <IonIcon
                onClick={() => {
                  playPauseMusic();
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
              {state?.nowPlaying?.tracks[state?.nowPlaying?.index]?.track
                ?.name ||
                state?.nowPlaying?.tracks[state?.nowPlaying?.index]?.name}
            </h4>
            <h4
              className={
                state?.user?.appTheming?.theme
                  ? "artist-name-light"
                  : "artist-name"
              }
            >
              {state?.nowPlaying?.tracks[state?.nowPlaying?.index]?.track
                ?.artists[0].name ||
                state?.nowPlaying?.tracks[state?.nowPlaying?.index]?.artists[0]
                  ?.name}
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
          onIonChange={(e: any) => props.setVolume(e.detail.value)}
          min={0}
          max={100}
          color="tertiary"
        ></IonRange>
      </div>
    </IonModal>
  );
}
