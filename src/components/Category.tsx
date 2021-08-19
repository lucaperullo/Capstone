import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useStateValue } from "../contextApi/stateProvider";

export default function Category() {
  const [state, dispatch] = useStateValue();
  let history = useHistory();
  const getTracks = async (id: string, idx: number, playlistName: string) => {
    try {
      console.log(state);

      console.log("hey");
      dispatch({
        type: "SET_ACTUAL_IDX",
        payload: 0,
      });

      const code = state?.user?.spotifyTokens?.access_token;
      const data = await fetch(
        `http://localhost:3999/spotify/playlist/${id}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${code}`,
          },
          credentials: "include",
        }
      );
      const playlistss = await data.json();
      console.log(playlistss);
      const playlist = playlistss?.items?.filter(
        (item: any) => item.track.preview_url !== null
      );
      dispatch({
        type: "SET_CURRENT_PLAYLIST",
        payload: playlist,
      });
      history.push(`/discover/${state?.categoryName}/${playlistName}`);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("Category mounted");
    console.log(state);
  }, []);
  return (
    <IonContent
      style={{
        height: "100vh",
      }}
    >
      <div style={{ paddingTop: "80px", paddingBottom: "100px" }}>
        <div
          style={{
            position: "sticky",
            top: "80px",
            width: "100vw",
            zIndex: 10,
          }}
        >
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="discover" />
            </IonButtons>
          </IonToolbar>
        </div>
        <IonGrid>
          <IonRow>
            {state?.category?.playlists?.items?.map(
              (playlist: any, idx: number) => (
                <IonCol sizeLg="3" sizeXl="2" sizeMd="6" sizeSm="6" sizeXs="12">
                  <IonCard
                    onClick={() => getTracks(playlist.id, idx, playlist.name)}
                  >
                    <div
                      style={{ justifyContent: "space-between" }}
                      className="flex"
                    >
                      <img
                        style={{ height: "100px" }}
                        alt={playlist.uri}
                        src={playlist.images[0].url}
                      />
                      <h3>{playlist.name}</h3>
                    </div>
                    <IonCardContent style={{ height: "125px" }}>
                      {playlist.description}
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              )
            )}
          </IonRow>
        </IonGrid>
      </div>
    </IonContent>
  );
}