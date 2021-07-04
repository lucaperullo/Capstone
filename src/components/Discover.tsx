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
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  IonSkeletonText,
  IonThumbnail,
  IonRippleEffect,
} from "@ionic/react";
import axios from "axios";
import {
  pin,
  wifi,
  wine,
  warning,
  walk,
  chevronDownCircleOutline,
  arrowDownOutline,
  personAdd,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useStateValue } from "../contextApi/stateProvider";

const Discover = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [state, dispatch] = useStateValue();
  const [users, setUsers] = useState<any>();
  const [Loading, setLoading] = useState(false);

  const toggleFollow = async (userid: string) => {
    try {
      const data = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/follow/${userid}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`, {
        withCredentials: true,
      });

      setUsers(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  function doRefresh(event: { detail: { complete: () => void } }) {
    console.log("Begin async operation");

    setTimeout(() => {
      fetchUsers();
      event.detail.complete();
      setLoading(!Loading);
      setTimeout(() => {
        console.log(state.user);
        setLoading(false);
      }, 100);
    }, 2000);
  }

  useEffect(() => {
    fetchUsers();
  }, [Loading]);
  return (
    <>
      <IonContent>
        {/*-- Default Refresher --*/}
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
            <IonSearchbar
              value={searchText}
              onIonChange={(e) => setSearchText(e.detail.value!)}
              animated
            ></IonSearchbar>
          </IonCard>
          <IonGrid>
            <IonRow>
              {Loading && <></>}
              {!Loading &&
                users?.length > 0 &&
                users
                  .filter((user: any) => user._id !== state?.user?._id)
                  .map((user: any, idx: number) => {
                    return (
                      <IonCol key={idx} sizeSm="12" sizeMd="6" sizeLg="4">
                        <StyledCard className="ion-activatable ripple-parent">
                          <IonCardHeader>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <IonAvatar>
                                <img src={user.profilePic} alt="" />
                              </IonAvatar>
                              <IonIcon
                                onClick={() => toggleFollow(user._id)}
                                style={{ cursor: "pointer" }}
                                size="large"
                                icon={personAdd}
                              ></IonIcon>
                            </div>
                            <IonCardTitle>
                              <h2>{user.username}</h2>
                            </IonCardTitle>
                            <IonCardSubtitle>
                              <h3>{user.bio}</h3>
                            </IonCardSubtitle>
                          </IonCardHeader>

                          <IonCardContent>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <IonGrid>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <IonThumbnail>
                                    <IonSkeletonText animated />
                                  </IonThumbnail>
                                  <IonSkeletonText animated />
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <IonThumbnail>
                                    <IonSkeletonText animated />
                                  </IonThumbnail>
                                  <IonSkeletonText animated />
                                </div>

                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <IonThumbnail>
                                    <IonSkeletonText animated />
                                  </IonThumbnail>
                                  <IonSkeletonText animated />
                                </div>
                              </IonGrid>
                            </div>
                          </IonCardContent>
                          <IonRippleEffect></IonRippleEffect>
                        </StyledCard>
                      </IonCol>
                    );
                  })}
            </IonRow>
          </IonGrid>
        </IonContent>

        {/*-- Custom Refresher Properties --*/}
        {/* <IonContent>
          <IonRefresher
            slot="fixed"
            onIonRefresh={doRefresh}
            pullFactor={3.5}
            pullMin={100}
            pullMax={500}
          >
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
        </IonContent> */}
      </IonContent>
    </>
  );
};

const StyledCard = styled(IonCard)`
  border-radius: 15px;
`;

export default Discover;
