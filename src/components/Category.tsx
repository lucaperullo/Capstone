import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../contextApi/stateProvider";

export default function Category() {
  const [state, dispatch] = useStateValue();
  let history = useHistory();
  const getTracks = async (id: string, idx: number, playlistName: string) => {
    try {
      const code = state?.user?.spotifyTokens?.access_token;
      const data = await fetch(
        `${
          process.env.REACT_APP_NODE_ENV === "Dev"
            ? ` http://localhost:3999/spotify/playlist/${id}/tracks`
            : `https://capstonebe.herokuapp.com/spotify/playlist/${id}/tracks`
        }`,
        {
          headers: {
            Authorization: `Bearer ${code}`,
          },
          credentials: "include",
        }
      );
      const playlistss = await data.json();

      const playlist = playlistss?.items?.filter(
        (item: any) => item.track.preview_url !== null
      );

      dispatch({
        type: "SET_CURRENT_PLAYLIST",
        payload: {
          tracks: playlist,
          index: 0,
        },
      });
      history.push(`/discover/${state?.categoryName}/${playlistName}`);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("Category mounted");
  }, []);
  return (
    <IonContent
      style={{
        height: "100vh",
      }}
    >
      <div style={{ paddingBottom: "10px" }}>
        <div
          style={{
            position: "sticky",
            top: "0px",
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
                <IonCol
                  key={idx}
                  sizeLg="3"
                  sizeXl="2"
                  sizeMd="4"
                  sizeSm="6"
                  sizeXs="12"
                >
                  <IonCard
                    onClick={() => getTracks(playlist.id, idx, playlist.name)}
                  >
                    <img
                      draggable="false"
                      style={{ height: "100%", width: "100%" }}
                      alt={playlist.uri}
                      src={playlist.images[0].url}
                    />

                    <IonCardHeader>
                      <h3>{playlist.name}</h3>
                    </IonCardHeader>
                    <IonCardContent style={{ height: "125px" }}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: playlist.description,
                        }}
                      ></div>
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
