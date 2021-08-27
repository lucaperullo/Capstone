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
  play,
  pauseSharp,
  playSkipBack,
  repeat,
  playSkipForward,
  shuffle,
} from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import TextLoop from "react-text-loop";

import { useStateValue } from "../contextApi/stateProvider";
import FullScreenPlayer from "./FullScreenPlayer";
export default function Player() {
  //TODO: Fix volume
  const [state, dispatch] = useStateValue();
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [volume, setVolume] = useState(100);
  const audiotoplay: any = document.getElementById("audio-tag-element");

  if (audiotoplay) {
    audiotoplay.onended = () => {
      nextTrack();
    };
  }
  const playMusic = () => {
    const audiotoplay: any = document.getElementById("audio-tag-element");
    if (
      audiotoplay.src !==
        state?.nowPlaying?.tracks[state?.nowPlaying?.index]?.preview_url ||
      state?.nowPlaying?.tracks[state?.nowPlaying?.index]?.track?.preview_url
    ) {
      audiotoplay.src =
        state?.nowPlaying?.tracks[state?.nowPlaying?.index]?.preview_url ||
        state?.nowPlaying?.tracks[state?.nowPlaying?.index]?.track?.preview_url;
      state?.nowPlaying?.playing ? audiotoplay?.play() : audiotoplay?.pause();
    } else {
      state?.nowPlaying?.playing ? audiotoplay?.play() : audiotoplay?.pause();
    }
  };

  const playPauseMusic = () => {
    if (
      audiotoplay.src !==
        state?.nowPlaying?.tracks[state?.nowPlaying?.index]?.preview_url ||
      state?.nowPlaying?.tracks[state?.nowPlaying?.index]?.track?.preview_url
    ) {
      audiotoplay.play();
      dispatch({
        type: "SET_PLAY_PAUSE",
        payload: !state.nowPlaying.playing,
      });
    } else {
      dispatch({
        type: "SET_PLAY_PAUSE",
        payload: !state.nowPlaying.playing,
      });
    }
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

  const updateTime = (e: any) => {
    const percentage =
      (e.nativeEvent.offsetX / e.currentTarget.clientWidth) * 100;
    console.log(Math.floor((percentage / 100) * audiotoplay.duration));

    audiotoplay.currentTime = Math.floor(
      (percentage / 100) * audiotoplay.duration
    );
  };

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
  const updateVolume = (e: any) => {
    const audiotoplay: any = document.getElementById("audio-tag-element");
    audiotoplay.volume = e.target.value / 100;
    setVolume(e.target.value);
  };
  useEffect(() => {
    const audiotoplay: any = document.getElementById("audio-tag-element");
    audiotoplay.ontimeupdate = () => {
      setTime((audiotoplay.currentTime / audiotoplay.duration) * 100);
    };
  }, []);
  // useEffect(() => {
  //   setVolume(volume);
  // }, [audiotoplay, volume]);
  return (
    <>
      <audio id="audio-tag-element" />
      <FullScreenPlayer
        duration={duration}
        updatetime={updateTime}
        audiotoplay={audiotoplay}
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
              state?.nowPlaying?.playing
                ? "music-player-cover-playing"
                : "music-player-cover"
            }
            src={
              state?.nowPlaying?.tracks[state?.nowPlaying?.index]?.track?.album
                ?.images[0]?.url ||
              state?.nowPlaying?.tracks[state?.nowPlaying?.index]?.album
                ?.images[0]?.url
            }
          />
          <div className="player-track-info">
            <TextLoop mask={true}>
              <h4
                style={{ width: "200px" }}
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
                style={{ width: "200px" }}
                className={
                  state?.user?.appTheming?.theme
                    ? "artist-name-light"
                    : "artist-name"
                }
              >
                {state?.nowPlaying?.tracks[state?.nowPlaying?.index]?.track
                  ?.artists[0]?.name ||
                  state?.nowPlaying?.tracks[state?.nowPlaying?.index]
                    ?.artists[0]?.name}
              </h4>
            </TextLoop>
          </div>
        </div>
        <div>
          <div className="player-buttons">
            <div className="p-buttons">
              <button className="playPause">
                <IonIcon
                  color={state?.user?.appTheming?.theme ? "white" : "dark"}
                  // onClick={() => repeatOrPlayAll()}
                  className="player-icons desktop-buttons"
                  icon={repeat}
                ></IonIcon>
              </button>
              <button className="playPause">
                <IonIcon
                  color={state?.user?.appTheming?.theme ? "white" : "dark"}
                  onClick={() => previousTrack()}
                  className="player-icons desktop-buttons"
                  icon={playSkipBack}
                ></IonIcon>
              </button>
              <button className="playPause">
                {state.nowPlaying.playing === true ? (
                  <IonIcon
                    color={state?.user?.appTheming?.theme ? "white" : "dark"}
                    className="player-icons"
                    onClick={() => {
                      playPauseMusic();
                    }}
                    size="large"
                    icon={pauseSharp}
                  ></IonIcon>
                ) : (
                  <IonIcon
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
                  className="player-icons desktop-buttons"
                  icon={playSkipForward}
                ></IonIcon>
              </button>
              <button className="playPause">
                <IonIcon
                  color={state?.user?.appTheming?.theme ? "white" : "dark"}
                  className="player-icons desktop-buttons"
                  icon={shuffle}
                ></IonIcon>
              </button>
            </div>
            <div
              onClick={(e: any) => {
                updateTime(e);
              }}
              style={{ width: `${duration}vw` }}
              className="song-track-duration"
            >
              <div
                color="secondary"
                className="timeline-range"
                style={{
                  width: `${time}%`,
                }}
              ></div>
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
            color="secondary"
            className="volume-range"
            value={volume}
            onIonChange={(e: any) => updateVolume(e)}
            min={0}
            max={100}
          ></IonRange>
        </div>
      </div>
    </>
  );
}
