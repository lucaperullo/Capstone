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
  const audiotoplay: any = useRef();
  if (audiotoplay.current) {
    audiotoplay.current.onended = () => {
      nextTrack();
    };
  }
  const playMusic = () => {
    audiotoplay.current.src =
      state?.nowPlaying?.tracks[state?.nowPlaying?.index]?.preview_url ||
      state?.nowPlaying?.tracks[state?.nowPlaying?.index]?.track?.preview_url;
    state?.nowPlaying?.playing
      ? audiotoplay?.current?.play()
      : audiotoplay?.current?.pause();
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
    // const audiotoplay: any = document.getElementById("audio-tag-element");
    audiotoplay.current.volume = e.target.value / 100;
    setVolume(e.target.value);
  };
  const updateTime = () => {
    if (audiotoplay.current.currentTime) {
      audiotoplay.current.ontimeupdate = () => {
        setTime(audiotoplay.current?.currentTime);
      };
    }
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

  useEffect(() => {
    updateTime();
  }, []);
  useEffect(() => {
    if (!!audiotoplay.current) {
      audiotoplay.current.volume = volume / 100;
    }
  }, [audiotoplay, volume]);
  return (
    <>
      <FullScreenPlayer
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
          <audio ref={audiotoplay} id="audio-tag-element" />
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
