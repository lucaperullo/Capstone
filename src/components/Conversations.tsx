import {
  IonAvatar,
  IonCard,
  IonContent,
  IonItem,
  IonLabel,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonToolbar,
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

  // };
  useEffect(() => {}, [searchText]);
  return (
    <IonContent style={{ display: "flex" }}>
      <IonToolbar>
        <IonSearchbar
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value!)}
        ></IonSearchbar>
      </IonToolbar>

      {state.user?.rooms ? (
        state.user?.rooms?.map((data: Group, i: number) => {
          const { userId } = data.participants.filter(
            (p: any) => p.userId._id !== state.user._id
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
                <img draggable="false" src={profilePic} alt="pro-pic" />
              </IonAvatar>
              <IonLabel>
                <h3>{username}</h3>
                <p>{bio}</p>
              </IonLabel>
            </IonItem>
          );
        })
      ) : (
        <div>
          <h3>You dont have any conversations yet</h3> <br />
          <a href="/discover">Discover new people with similar music tastes!</a>
        </div>
      )}
    </IonContent>
  );
}
