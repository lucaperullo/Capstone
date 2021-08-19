import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import React, { useState } from "react";
import "../theme/style.css";
import DiscoverMusic from "./DiscoverMusic";
import Following from "./Following";
import MusicFolder from "./MusicFolder";
import TopUsersFolder from "./TopUsersFolder";

export default function Navigator() {
  const [nrc, setNrc] = useState(true);
  const [mru, setMru] = useState(false);
  const [feed, setFeed] = useState(false);
  return (
    <div
      style={{ position: "fixed", top: "100px", width: "100vw", zIndex: 10 }}
    >
      <IonSegment
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
        <IonSegmentButton value="Music">
          <IonLabel>Music</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="Tranding">
          <IonLabel>Tranding</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="Feed">
          <IonLabel>Feed</IonLabel>
        </IonSegmentButton>
      </IonSegment>

      {nrc && <DiscoverMusic />}
      {mru && <TopUsersFolder />}
      {feed && <Following />}
    </div>
  );
}
