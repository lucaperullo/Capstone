import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonThumbnail,
} from "@ionic/react";
import { add, heart, play } from "ionicons/icons";
import React from "react";
import { useStateValue } from "../contextApi/stateProvider";

export default function ProfilePlaylists() {
  const [state, dispatch] = useStateValue();
  const playTrack = async (url: any) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${state.user.spotifyTokens.access_token}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        const tracks = await response.json();
        console.log(tracks);
        dispatch({
          type: "SET_CURRENT_PLAYLIST",
          payload: {
            tracks: tracks.items,
          },
        });
        // dispatch({
        //   type: "SET_ACTUAL_SONG",
        //   payload: {
        //     track: tracks.items[0].track,
        //     song_index: 0,
        //   },
        // });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <IonGrid>
      <IonRow>
        {state?.selectedUser?.playlists?.userPlaylists?.items.map(
          (playlist: any, i: number) => (
            <IonCol
              key={i}
              onClick={() =>
                playTrack(
                  playlist.tracks.href ? playlist.tracks.href : playlist.href
                )
              }
              sizeLg="3"
              sizeXl="2"
              sizeMd="4"
              sizeSm="6"
              sizeXs="6"
            >
              <div className="song">
                <img
                  className="song-image"
                  draggable="false"
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                  src={
                    playlist.images[0]?.url
                      ? playlist.images[0]?.url
                      : "https://media.discordapp.net/attachments/786174311718322227/859041060809474048/outMusic.png?width=706&height=703"
                  }
                  alt={playlist.name}
                />
                <div className="song-info">
                  <h3 className="song-text"> {playlist.name}</h3>
                </div>
                <div className="song-actions">
                  <IonIcon
                    onClick={() => playTrack(playlist.preview_url)}
                    className="song-button play-button"
                    icon={play}
                  />
                </div>
              </div>
            </IonCol>
          )
        )}
        {state?.selectedUser === null &&
          state?.user?.playlists?.userPlaylists?.items.map(
            (playlist: any, i: number) => (
              <IonCol
                key={i}
                onClick={() =>
                  playTrack(
                    playlist.tracks.href ? playlist.tracks.href : playlist.href
                  )
                }
                sizeLg="3"
                sizeXl="2"
                sizeMd="4"
                sizeSm="6"
                sizeXs="6"
              >
                <div className="song">
                  <img
                    className="song-image"
                    draggable="false"
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                    src={
                      playlist.images[0]?.url
                        ? playlist.images[0]?.url
                        : "https://media.discordapp.net/attachments/786174311718322227/859041060809474048/outMusic.png?width=706&height=703"
                    }
                    alt={playlist.name}
                  />
                  <div className="song-info">
                    <h3 className="song-text"> {playlist.name}</h3>
                  </div>
                  <div className="song-actions">
                    <IonIcon
                      onClick={() => playTrack(playlist.preview_url)}
                      className="song-button play-button"
                      icon={play}
                    />
                  </div>
                </div>
              </IonCol>
            )
          )}
      </IonRow>
    </IonGrid>
  );
}
