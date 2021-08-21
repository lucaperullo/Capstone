import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useStateValue } from "../contextApi/stateProvider";

export default function SearchResults() {
  let history = useHistory();
  const [state, dispatch] = useStateValue();

  return (
    <div style={{ height: "100vh", paddingBottom: "100px" }}>
      <IonGrid>
        <IonRow>
          {state?.searchResults?.map((item: any) => (
            <IonCol size="12" sizeMd="6" sizeLg="4" key={item.id}>
              <IonCard style={{ height: "300px" }}>
                <IonCardHeader>
                  <IonCardTitle>{item.name}</IonCardTitle>

                  <IonCardSubtitle>
                    {item.artists?.map((artist: any) => {
                      return artist.name;
                    })}
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <div style={{ height: "150px", width: "150px" }}>
                    <img
                      draggable="false"
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "12px",
                      }}
                      src={item.album.images[0].url}
                      alt=""
                    />
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </div>
  );
}
