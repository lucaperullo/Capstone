import {
  IonCard,
  IonContent,
  IonHeader,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
} from "@ionic/react";
import { arrowDownOutline, chevronDownCircleOutline } from "ionicons/icons";
import { useState } from "react";

const Following = () => {
  const [searchText, setSearchText] = useState<string>("");
  function doRefresh(event: { detail: { complete: () => void } }) {
    console.log("Begin async operation");

    setTimeout(() => {
      console.log("Async operation has ended");
      event.detail.complete();
    }, 2000);
  }
  return (
    <>
      <IonContent>
        {/*-- Default Refresher --*/}
        <IonContent>
          <IonContent>
            <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
              <IonRefresherContent
                pullingIcon={chevronDownCircleOutline}
                pullingText="Pull to refresh"
                refreshingSpinner="circles"
                refreshingText="Refreshing..."
              ></IonRefresherContent>
            </IonRefresher>

            <IonCard>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IonHeader>
                  <h1>#FEED</h1>
                </IonHeader>
              </div>
            </IonCard>
          </IonContent>
        </IonContent>
      </IonContent>
    </>
  );
};
export default Following;
