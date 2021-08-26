import {
  IonCard,
  IonContent,
  IonHeader,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { useState } from "react";
import DiscoverMusic from "./DiscoverMusic";
import Following from "./Following";
import ProfilePlaylists from "./ProfilePlaylists";
import TopUsersFolder from "./TopUsersFolder";

export default function ProfileNavigator() {
  const [nrc, setNrc] = useState(true);
  const [mru, setMru] = useState(false);
  const [feed, setFeed] = useState(false);
  return (
    <>
      <IonContent
        style={{
          height: "48px",
          position: "sticky",
          top: "-1px",
          zIndex: 10,
        }}
      >
        <IonSegment
          onIonChange={(e) => {
            if (e.detail.value === "Playlists") {
              setNrc(true);
              if (mru === true) {
                setMru(false);
              } else if (feed === true) {
                setFeed(false);
              }
            }
            if (e.detail.value === "Liked") {
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
          <IonSegmentButton value="Playlists">
            <IonLabel>Playlists</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="Liked">
            <IonLabel>Saved</IonLabel>
          </IonSegmentButton>
          {/* <IonSegmentButton value="Feed">
            <IonLabel>Feed</IonLabel>
          </IonSegmentButton> */}
        </IonSegment>
      </IonContent>
      {nrc && <ProfilePlaylists />}
      {mru && <TopUsersFolder />}
      {/* {feed && <Following />} */}
    </>
  );
}
