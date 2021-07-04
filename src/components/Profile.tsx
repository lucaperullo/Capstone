import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRefresher,
  IonRefresherContent,
  IonRippleEffect,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonSkeletonText,
  IonText,
  IonTextarea,
  IonThumbnail,
} from "@ionic/react";
import {
  arrowDownOutline,
  caretBackOutline,
  caretForwardOutline,
  chevronDownCircleOutline,
  pauseOutline,
  playOutline,
  playSkipBackOutline,
  playSkipForwardOutline,
  repeatOutline,
  settingsOutline,
  shuffleOutline,
} from "ionicons/icons";
import { useState } from "react";
import { useStateValue } from "../contextApi/stateProvider";

const Profile = () => {
  const [searchText, setSearchText] = useState("");
  const [Loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [state, dispatch] = useStateValue();
  function doRefresh(event: { detail: { complete: () => void } }) {
    console.log("Begin async operation");

    setTimeout(() => {
      console.log("Async operation has ended");
      event.detail.complete();
      setLoading(!Loading);
      setTimeout(() => {
        console.log(state.user);
        setLoading(false);
      }, 1000);
    }, 10);
  }
  const [profilePic, setProfilePic] = useState<any>();
  const [bio, setBio] = useState(state?.user?.bio);
  const [username, setUsername] = useState(state?.user?.username);
  const [status, setStatus] = useState<any>(state?.user?.status);
  const [clicked, setClicked] = useState(false);
  const updateUser = async () => {
    try {
      const payload = {
        bio: bio,
        username: username,
        status: {
          presence: status,
        },
      };
      const data = await fetch(process.env.REACT_APP_BASE_URL + "/me", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(payload),
      });
      const user = await data.json();
      dispatch({
        type: "SET_USER",
        payload: await user,
      });
      setClicked(false);
    } catch (error) {
      console.log(error);
    }
  };
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
          {Loading && (
            <IonCard>
              <IonSearchbar
                value={searchText}
                onIonChange={(e) => setSearchText(e.detail.value!)}
                animated
              ></IonSearchbar>
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

          {!Loading && (
            <>
              <IonCard className="ion-activatable ripple-parent">
                <IonSearchbar
                  value={searchText}
                  onIonChange={(e) => setSearchText(e.detail.value!)}
                  animated
                ></IonSearchbar>
                <IonCardHeader>
                  <div>
                    <IonFab vertical="top" horizontal="end" slot="fixed">
                      <IonFabButton>
                        <IonIcon
                          onClick={() => setClicked(!clicked)}
                          icon={settingsOutline}
                        />
                      </IonFabButton>
                    </IonFab>
                  </div>
                  <IonAvatar>
                    {!clicked ? (
                      <img src={state?.user?.profilePic} alt="" />
                    ) : (
                      <input
                        onChange={(e) =>
                          setProfilePic(e.currentTarget?.files?.[0])
                        }
                        type="file"
                        id="img"
                        name="img"
                        accept="image/*"
                      ></input>
                    )}
                  </IonAvatar>
                  {clicked && (
                    <div>
                      <IonText>Status</IonText>

                      <IonSelect
                        value={state?.user?.status?.presence}
                        placeholder={status}
                        onIonChange={(e) => setStatus(e.detail.value)}
                      >
                        <IonSelectOption value="online">online</IonSelectOption>
                        <IonSelectOption value="offline">
                          offline
                        </IonSelectOption>
                      </IonSelect>
                    </div>
                  )}
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <IonCardTitle>
                      {!clicked ? (
                        <h1>{state?.user?.username}</h1>
                      ) : (
                        <IonItem>
                          <IonInput
                            value={username}
                            placeholder="Username here"
                            onIonChange={(e) => setUsername(e.detail.value!)}
                          ></IonInput>
                        </IonItem>
                      )}
                    </IonCardTitle>
                    <IonCardSubtitle>
                      {!clicked ? (
                        <h3>{state?.user?.bio}</h3>
                      ) : (
                        <IonItem>
                          <IonTextarea
                            value={bio}
                            placeholder="Write something about yourself, let everybody know what music you like!"
                            onIonChange={(e) => setBio(e.detail.value!)}
                          ></IonTextarea>
                        </IonItem>
                      )}
                    </IonCardSubtitle>
                    {clicked && (
                      <IonButton onClick={() => updateUser()}>save</IonButton>
                    )}
                  </div>
                </IonCardHeader>

                <IonCardContent>
                  <IonLabel>Playlists:</IonLabel>
                  <div
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  ></div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <IonButton color="light">
                        <IonIcon size="large" icon={shuffleOutline}></IonIcon>
                      </IonButton>
                      <IonButton color="light">
                        <IonIcon size="large" icon={repeatOutline}></IonIcon>
                      </IonButton>
                      <IonButton color="light">
                        <IonIcon
                          size="large"
                          icon={playSkipBackOutline}
                        ></IonIcon>
                      </IonButton>

                      <IonButton
                        color="light"
                        onClick={() => setPlaying(!playing)}
                      >
                        <IonIcon
                          size="large"
                          icon={playing ? playOutline : pauseOutline}
                        ></IonIcon>
                      </IonButton>

                      <IonButton color="light">
                        <IonIcon
                          size="large"
                          icon={playSkipForwardOutline}
                        ></IonIcon>
                      </IonButton>
                    </div>
                  </div>
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
                <IonRippleEffect></IonRippleEffect>
              </IonCard>
            </>
          )}
        </IonContent>
      </IonContent>
    </>
  );
};
export default Profile;
