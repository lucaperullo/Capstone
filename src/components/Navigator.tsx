import {
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonContent,
} from "@ionic/react";
import React, { useState } from "react";
import { useStateValue } from "../contextApi/stateProvider";
import "../theme/style.css";
import DiscoverMusic from "./DiscoverMusic";
import Following from "./Following";

export default function Navigator() {
  const [nrc, setNrc] = useState(true);
  const [mru, setMru] = useState(false);
  const [feed, setFeed] = useState(false);
  const [state, dispatch] = useStateValue();
  return (
    <IonContent
      style={{
        width: "100vw",
        minHeight: "100vh",
      }}
    >
      <div
        className={
          state?.user?.appTheming?.theme
            ? "navigator-discover"
            : "navigator-discover-light"
        }
      >
        <IonSegment
          color="primary"
          onIonChange={(e) => {
            if (e.detail.value === "Music") {
              setNrc(true);
              if (mru === true) {
                setMru(false);
              } else if (feed === true) {
                setFeed(false);
              }
            }
            if (e.detail.value === "Tranding") {
              setMru(true);
              if (nrc === true) {
                setNrc(false);
              } else if (feed === true) {
                setFeed(false);
              }
            }
            if (e.detail.value === "Feed") {
              setFeed(true);
              if (nrc === true) {
                setNrc(false);
              } else if (mru === true) {
                setMru(false);
              }
            }
          }}
        >
          <IonSegmentButton color="primary" value="Music">
            <IonLabel>Music</IonLabel>
          </IonSegmentButton>
          {/* <IonSegmentButton value="Tranding">
          <IonLabel>People</IonLabel>
        </IonSegmentButton> */}
          <IonSegmentButton color="primary" value="Feed">
            <IonLabel>Feed</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </div>
      {nrc && <DiscoverMusic />}
      {/* {mru && <SavedTracks />} */}
      {feed && <Following />}
      <div style={{ height: "300px" }}></div>
    </IonContent>
  );
}
