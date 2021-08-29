import {
  IonModal,
  IonButton,
  IonContent,
  IonIcon,
  IonRange,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
} from "@ionic/react";
import {
  addCircle,
  albums,
  arrowDown,
  heartOutline,
  pauseOutline,
  pauseSharp,
  play,
  playOutline,
  playSkipBack,
  playSkipForward,
  repeat,
  shuffle,
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

  if (props.audiotoplay) {
    props.audiotoplay.onended = () => {
      nextTrack();
    };
  }

  const playMusic = () => {
    if (
      props.audiotoplay?.src ===
        state?.nowPlaying?.tracks[state?.nowPlaying?.index]?.preview_url ||
      state?.nowPlaying?.tracks[state?.nowPlaying?.index]?.track?.preview_url
    ) {
      state?.nowPlaying?.playing
        ? props.audiotoplay?.play()
        : props.audiotoplay?.pause();
    } else {
      props.audiotoplay.src =
        state?.nowPlaying?.tracks[state?.nowPlaying?.index]?.preview_url ||
        state?.nowPlaying?.tracks[state?.nowPlaying?.index]?.track?.preview_url;
      state?.nowPlaying?.playing
        ? props.audiotoplay?.play()
        : props.audiotoplay?.pause();
    }
  };
  const likeSong = async (id: any) => {
    const like = await fetch(
      process.env.REACT_APP_NODE_ENV === "Dev"
        ? `http://localhost:3999/spotify/likeTrack/${id}`
        : `https://capstone_be.herokuapp.com/spotifty/likeTrack/${id}`,
      { credentials: "include" }
    );
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

  return (
    <IonModal
      swipeToClose={true}
      mode="ios"
      onDidDismiss={() => props.setShowModal(false)}
      cssClass="fullscreen"
      isOpen={props.showModal}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonIcon
              size="large"
              color={state?.user?.appTheming?.theme ? "white" : "dark"}
              icon={arrowDown}
            ></IonIcon>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <div className="fullscreen-player">
        <div
          style={{
            display: "flex",
            height: "90vh",
            justifyContent: "center",
            paddingBottom: "300px",
            alignItems: "center",
          }}
        >
          <div
            className={state.nowPlaying.playing ? "fs-cd-playing" : "fs-cd"}
            // src="https://www.pngitem.com/pimgs/m/13-134510_vinyl-record-high-resolution-hd-png-download.png"
          ></div>

          <img
            draggable={false}
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
        <div className="fs-actions-player">
          <IonIcon
            size="large"
            icon={heartOutline}
            onClick={() =>
              likeSong(
                state?.nowPlaying?.tracks[state?.nowPlaying?.index]?.track
                  ?.id ||
                  state?.nowPlaying?.tracks[state?.nowPlaying?.index]?.id
              )
            }
          />
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
        <div className="fs-player-buttons">
          <button className="playPause">
            <IonIcon
              color={state?.user?.appTheming?.theme ? "white" : "dark"}
              // onClick={() => repeatOrPlayAll()}
              className="player-icons player-ico"
              icon={repeat}
            ></IonIcon>
          </button>
          <button className="playPause">
            <IonIcon
              color={state?.user?.appTheming?.theme ? "white" : "dark"}
              onClick={() => previousTrack()}
              className="player-icons player-ico"
              icon={playSkipBack}
            ></IonIcon>
          </button>
          <button className="playPause">
            {state.nowPlaying.playing === true ? (
              <IonIcon
                color={state?.user?.appTheming?.theme ? "white" : "dark"}
                className="player-icons player-ico"
                onClick={() => {
                  playPauseMusic();
                }}
                size="large"
                icon={pauseSharp}
              ></IonIcon>
            ) : (
              <IonIcon
                className="player-ico"
                color={state?.user?.appTheming?.theme ? "white" : "dark"}
                onClick={() => {
                  playPauseMusic();
                }}
                size="large"
                icon={play}
              ></IonIcon>
            )}
          </button>
          <button className="playPause">
            <IonIcon
              color={state?.user?.appTheming?.theme ? "white" : "dark"}
              onClick={() => nextTrack()}
              className="player-icons player-ico"
              icon={playSkipForward}
            ></IonIcon>
          </button>
          <button className="playPause">
            <IonIcon
              color={state?.user?.appTheming?.theme ? "white" : "dark"}
              className="player-icons player-ico"
              icon={shuffle}
            ></IonIcon>
          </button>
        </div>
      </div>

      <div
        onClick={(e: any) => {
          props.updatetime(e);
        }}
        style={{ width: `${props.duration}vw` }}
        className="song-track-duration-fs"
      >
        <div
          color="primary"
          className="timeline-range-fs"
          style={{
            width: `${props.time}%`,
          }}
        ></div>
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
          color="primary"
        ></IonRange>
      </div>
    </IonModal>
  );
}
