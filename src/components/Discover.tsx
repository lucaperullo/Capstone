import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
  IonContent,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import {
  pin,
  wifi,
  wine,
  warning,
  walk,
  chevronDownCircleOutline,
  arrowDownOutline,
} from "ionicons/icons";

const Discover = () => {
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
          <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
            <IonRefresherContent
              pullingIcon={arrowDownOutline}
            ></IonRefresherContent>
          </IonRefresher>
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
export default Discover;
