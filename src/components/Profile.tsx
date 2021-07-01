import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRefresher,
  IonRefresherContent,
  IonSkeletonText,
  IonThumbnail,
} from "@ionic/react";
import { arrowDownOutline, chevronDownCircleOutline } from "ionicons/icons";
import { useState } from "react";
import { useStateValue } from "../contextApi/stateProvider";

const Profile = () => {
  const [fakeLoad, setFakeLoad] = useState(false);
  const [state, dispatch] = useStateValue();
  function doRefresh(event: { detail: { complete: () => void } }) {
    console.log("Begin async operation");

    setTimeout(() => {
      console.log("Async operation has ended");
      event.detail.complete();
      setFakeLoad(!fakeLoad);
      setTimeout(() => {
        console.log(state.user);
        setFakeLoad(false);
      }, 1000);
    }, 10);
  }
  return (
    <>
      <IonContent>
        {/*-- Default Refresher --*/}
        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          {fakeLoad && (
            <IonCard>
              <IonCardHeader>
                <IonAvatar>
                  <IonSkeletonText animated />
                </IonAvatar>

                <IonCardSubtitle>
                  <IonSkeletonText animated style={{ width: "100%" }} />
                </IonCardSubtitle>
                <IonCardTitle>
                  <IonSkeletonText animated style={{ width: "100%" }} />
                </IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <IonGrid>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <IonThumbnail>
                        <IonSkeletonText animated />
                      </IonThumbnail>
                      <IonSkeletonText animated />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <IonThumbnail>
                        <IonSkeletonText animated />
                      </IonThumbnail>
                      <IonSkeletonText animated />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <IonThumbnail>
                        <IonSkeletonText animated />
                      </IonThumbnail>
                      <IonSkeletonText animated />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <IonThumbnail>
                        <IonSkeletonText animated />
                      </IonThumbnail>
                      <IonSkeletonText animated />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <IonThumbnail>
                        <IonSkeletonText animated />
                      </IonThumbnail>
                      <IonSkeletonText animated />
                    </div>
                  </IonGrid>
                </div>
              </IonCardContent>
            </IonCard>
          )}

          {!fakeLoad && (
            <IonCard>
              <IonCardHeader>
                <IonAvatar>
                  <img src={state?.user?.profilePic} alt="" />
                </IonAvatar>
                <IonCardTitle>
                  <h1>{state?.user?.username}</h1>
                </IonCardTitle>
                <IonCardSubtitle>
                  <h3>{state?.user?.bio}</h3>
                </IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent>
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <IonGrid>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <IonThumbnail>
                        <IonSkeletonText animated />
                      </IonThumbnail>
                      <IonSkeletonText animated />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <IonThumbnail>
                        <IonSkeletonText animated />
                      </IonThumbnail>
                      <IonSkeletonText animated />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <IonThumbnail>
                        <IonSkeletonText animated />
                      </IonThumbnail>
                      <IonSkeletonText animated />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <IonThumbnail>
                        <IonSkeletonText animated />
                      </IonThumbnail>
                      <IonSkeletonText animated />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <IonThumbnail>
                        <IonSkeletonText animated />
                      </IonThumbnail>
                      <IonSkeletonText animated />
                    </div>
                  </IonGrid>
                </div>
              </IonCardContent>
            </IonCard>
          )}
        </IonContent>

        {/*-- Custom Refresher Properties --*/}
        <IonContent>
          <IonRefresher
            slot="fixed"
            onIonRefresh={doRefresh}
            pullFactor={0.5}
            pullMin={100}
            pullMax={200}
          >
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
        </IonContent>

        {/*-- Custom Refresher Content --*/}
        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
            <IonRefresherContent
              pullingIcon={chevronDownCircleOutline}
              pullingText="Pull to refresh"
              refreshingSpinner="circles"
              refreshingText="Refreshing..."
            ></IonRefresherContent>
          </IonRefresher>
        </IonContent>
      </IonContent>
    </>
  );
};
export default Profile;
