import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonRow,
  IonThumbnail,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { useStateValue } from "../contextApi/stateProvider";

export default function SongList() {
  const [state, dispatch] = useStateValue();
  return (
    <IonContent>
      <div style={{ paddingBottom: "10px" }}>
        <div
          style={{
            position: "sticky",
            top: "0",
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
        <IonList>
          {state?.nowPlaying?.tracks.map((track: any, i: number) => (
            <IonItemSliding key={i}>
              <IonItem>
                <IonThumbnail slot="start">
                  <img
                    draggable="false"
                    src={track.track.album.images[0].url}
                    alt={track.track.name}
                  />
                </IonThumbnail>
                <IonLabel>{track.track.name}</IonLabel>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption onClick={() => {}}>Play</IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </div>
    </IonContent>
    // <IonGrid>
    //   <IonRow>
    //     {state?.tracks.map((track: any) => (
    //       <IonCol><IonCard>{track.title}</IonCard></IonCol>
    //     ))}
    //   </IonRow>
    // </IonGrid>
  );
}
