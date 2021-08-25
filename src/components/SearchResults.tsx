import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
  IonIcon,
} from "@ionic/react";
import { play } from "ionicons/icons";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useStateValue } from "../contextApi/stateProvider";

export default function SearchResults() {
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
  let history = useHistory();
  const [state, dispatch] = useStateValue();

  return (
    <div style={{ height: "100vh" }}>
      <div className="section-name">
        <h2 style={{ marginBottom: "50px" }}>Search results..</h2>
      </div>
      <IonGrid>
        <IonRow>
          {state?.searchResults?.map((item: any) => (
            <IonCol size="12" sizeSm="6" sizeMd="4" sizeLg="3" key={item.id}>
              <div className="song">
                <img
                  className="song-image"
                  draggable="false"
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                  src={
                    item.album.images[0]?.url
                      ? item.album.images[0]?.url
                      : "https://media.discordapp.net/attachments/786174311718322227/859041060809474048/outMusic.png?width=706&height=703"
                  }
                  alt={item.name}
                />
                <div className="song-info">
                  <h3 className="song-text"> {item.name}</h3>
                </div>
                <div className="song-actions">
                  <IonIcon
                    onClick={() =>
                      playTrack(
                        item.preview_url,
                        item.album.images[0]?.url,
                        item.name,
                        item.artists[0].name
                      )
                    }
                    className="song-button play-button"
                    icon={play}
                  />
                </div>
              </div>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
      <div style={{ height: "20vh" }}></div>
    </div>
  );
}
