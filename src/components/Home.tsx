import { IonSlide, IonSlides } from "@ionic/react";
import React from "react";
import Conversations from "./Conversations";
import Discover from "./Discover";

export default function Home() {
  const slideOpts = {
    initialSlide: 0,
    speed: 200,
  };
  return (
    <IonSlides pager={true} options={slideOpts}>
      <IonSlide style={{ height: "100vh" }}>
        <Discover />
      </IonSlide>
      <IonSlide style={{ height: "100vh" }}>
        <Conversations />
      </IonSlide>
    </IonSlides>
  );
}
