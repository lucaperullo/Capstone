import {
  IonAvatar,
  IonCard,
  IonContent,
  IonItem,
  IonLabel,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
} from "@ionic/react";
import { chevronDownCircleOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../contextApi/stateProvider";
import { socketConnection } from "../socketCalls/connection";
import { connectToRooms } from "../socketCalls/roomsConnection";
import { Group } from "../types";

export default function Conversations() {
  const [state, dispatch] = useStateValue();
  const [searchText, setSearchText] = useState("");
  let history = useHistory();
  function doRefresh(event: { detail: { complete: () => void } }) {
    console.log("Begin async operation");
    fetchUser();
    setTimeout(() => {
      console.log("Async operation has ended");
      event.detail.complete();
    }, 2000);
  }
  const fetchUser = async () => {
    let socket: { disconnect: () => any };
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/me`, {
        credentials: "include",
      });
      if (response.ok) {
        socket = socketConnection();
        dispatch({ type: "SET_SOCKET", payload: socket });

        const data = await response.json();

        dispatch({
          type: "SET_USER",
          payload: data,
        });

        connectToRooms(socket, data.rooms);
      } else {
        console.log("Error while fetching user");
      }
    } catch (error) {
      console.log(error);
    }
    return () => {
      socket && socket.disconnect();
    };
  };

  // };

  return (
    <IonContent style={{ display: "flex" }}>
      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent
          pullingIcon={chevronDownCircleOutline}
          pullingText="Pull to refresh"
          refreshingSpinner="circles"
          refreshingText="Refreshing..."
        ></IonRefresherContent>
      </IonRefresher>

      <IonCard>
        <IonSearchbar
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value!)}
          animated
        ></IonSearchbar>
      </IonCard>
      {state.user?.rooms ? (
        state.user?.rooms?.map((data: Group, i: number) => {
          const { userId } = data.participants.filter(
            (p) => p.userId._id !== state.user._id
          )[0];
          const { profilePic, bio, username, status } = userId;
          return (
            <IonItem
              key={i}
              onClick={(e) => {
                history.push(`/conversations/${data._id}`);
                // useGenerateGroup()
                dispatch({ type: "SET_ACTUAL_CHAT", payload: userId });
              }}
            >
              <IonAvatar slot="start">
                <img src={profilePic} alt="pro-pic" />
              </IonAvatar>
              <IonLabel>
                <h3>{username}</h3>
                <p>{bio}</p>
              </IonLabel>
            </IonItem>
          );
        })
      ) : (
        <IonContent
          style={{ position: "absolute", top: "16vh", height: "100%" }}
        ></IonContent>
      )}
    </IonContent>
  );
}