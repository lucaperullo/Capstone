import React, { useEffect, useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonSlide,
  IonSlides,
  IonContent,
} from "@ionic/react";
import { bookmark, play } from "ionicons/icons";
import { useStateValue } from "../contextApi/stateProvider";

export default function TopUsersFolder() {
  const dislike = async (id: any) => {
    const data = await fetch(
      `http://localhost:3000/spotify/unlikeTrack/${id}`,
      { credentials: "include" }
    );
  };
  const [state, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);
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
  const getUserFavourites = async () => {
    try {
      const res = await fetch(
        `${
          process.env.REACT_APP_NODE_ENV === "Production"
            ? "https://capstonebe.herokuapp.com/spotify/favourites"
            : "http://localhost:3999/spotify/favourites"
        }`,

        {
          credentials: "include",
        }
      );
      console.log(res);
      if (res.ok) {
        console.log("favourits setted");
        const res2 = await res.json();
        console.log(res2);
        const data = res2.items.filter(
          (item: any) => item.track.preview_url !== null
        );
        dispatch({
          type: "SET_FAVOURITES",
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const slideOpts = {
    initialSlide: 1,
    speed: 400,
  };
  useEffect(() => {
    getUserFavourites();
  }, []);
  return (
    <IonGrid>
      <IonRow>
        {state?.favourites?.map((track: any, i: number) => (
          <IonCol
            key={i}
            onClick={() =>
              playTrack(
                track.track.preview_url,
                track.track.album.images[0].url,
                track.track.name,
                track.track.artists[0].name
              )
            }
            sizeLg="3"
            sizeXl="2"
            sizeMd="6"
            sizeSm="6"
            sizeXs="12"
          >
            <div className="song">
              <img
                className="song-image"
                draggable="false"
                style={{
                  height: "100%",
                  width: "100%",
                }}
                src={track.track.album.images[0].url}
                alt={track.track.name}
              />
              <div className="song-info">
                <h3 className="song-text"> {track.track.name}</h3>
              </div>
              <div className="song-actions">
                <IonIcon
                  onClick={() =>
                    playTrack(
                      track.track.preview_url,
                      track.track.album.images[0].url,
                      track.track.name,
                      track.track.artists[0].name
                    )
                  }
                  className="song-button play-button"
                  icon={play}
                />
                <IonIcon
                  onClick={() => dislike(track.track.id)}
                  icon={bookmark}
                />
              </div>
            </div>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
}
