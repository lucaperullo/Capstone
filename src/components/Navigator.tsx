import {
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonContent,
} from "@ionic/react";
import React, { useState } from "react";
import "../theme/style.css";
import DiscoverMusic from "./DiscoverMusic";
import Following from "./Following";

export default function Navigator() {
  const [nrc, setNrc] = useState(true);
  const [mru, setMru] = useState(false);
  const [feed, setFeed] = useState(false);
  return (
    <IonContent
      style={{
        width: "100vw",
        minHeight: "100vh",
      }}
    >
      <div className="navigator-discover">
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
            <IonLabel style={{ color: "white" }}>Music</IonLabel>
          </IonSegmentButton>
          {/* <IonSegmentButton value="Tranding">
          <IonLabel>People</IonLabel>
        </IonSegmentButton> */}
          <IonSegmentButton value="Feed">
            <IonLabel style={{ color: "white" }}>Feed</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </div>
      {nrc && <DiscoverMusic />}
      {/* {mru && <TopUsersFolder />} */}
      {feed && <Following />}
      <div style={{ height: "500px" }}></div>
    </IonContent>
  );
}
