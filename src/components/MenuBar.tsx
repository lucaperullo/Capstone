import React from "react";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonRouterOutlet,
  IonButton,
} from "@ionic/react";
// const toggle(animated?: boolean) => Promise<boolean>
export const MenuExample: React.FC = () => (
  <>
    <IonMenu swipeGesture={true} side="end" menuId="main" contentId="content">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Start Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="content">
        <IonList>
          <IonItem>CONTENT 1</IonItem>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
    <IonRouterOutlet id="main"></IonRouterOutlet>
  </>
);
