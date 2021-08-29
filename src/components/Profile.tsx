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
  IonRow,
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
  IonCol,
} from "@ionic/react";
import ReactAudioPlayer from "react-audio-player";
import {
  arrowDownOutline,
  caretBackOutline,
  caretForwardOutline,
  chevronDownCircleOutline,
  pauseOutline,
  pencil,
  playOutline,
  playSkipBackOutline,
  playSkipForwardOutline,
  repeatOutline,
  settingsOutline,
  shuffleOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useStateValue } from "../contextApi/stateProvider";
import ProfileNavigator from "./ProfileNavigator";

const Profile = () => {
  const [searchText, setSearchText] = useState("");
  const [Loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [state, dispatch] = useStateValue();
  const playTrack = async (url: any) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${state.user.spotifyTokens.access_token}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        const tracks = await response.json();
        console.log(tracks);
        dispatch({
          type: "SET_CURRENT_PLAYLIST",
          payload: {
            tracks: tracks.items,
          },
        });
        // dispatch({
        //   type: "SET_ACTUAL_SONG",
        //   payload: {
        //     track: tracks.items[0].track,
        //     song_index: 0,
        //   },
        // });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
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
      const data = await fetch(
        `${
          process.env.REACT_APP_NODE_ENV === "Dev"
            ? "http://localhost:3999/auth/me"
            : "https://capstonebe.herokuapp.com/auth/me"
        }`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(payload),
        }
      );
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
      <IonContent style={{ minHeight: "100vh" }}>
        {/*-- Default Refresher --*/}

        {Loading && (
          <IonContent>
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
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
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
          </IonContent>
        )}

        {!Loading && (
          <>
            <IonContent style={{ minHeight: "100vh" }}>
              <IonSearchbar
                value={searchText}
                onIonChange={(e) => setSearchText(e.detail.value!)}
                animated
              ></IonSearchbar>
              <IonCardHeader>
                <div
                  style={{
                    position: "absolute",
                    fontSize: "22px",
                    right: "10px",
                  }}
                >
                  <IonIcon
                    color="medium"
                    onClick={() => setClicked(!clicked)}
                    icon={pencil}
                  />
                </div>
                <div className="profile-cover">
                  {!clicked ? (
                    <img
                      draggable="false"
                      className="our-avatar"
                      src={state?.user?.profilePic}
                      alt=""
                    />
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
                </div>
                {clicked && (
                  <div>
                    <IonText>Status</IonText>

                    <IonSelect
                      value={state?.user?.status?.presence}
                      placeholder={status}
                      onIonChange={(e) => setStatus(e.detail.value.toString())}
                    >
                      <IonSelectOption value="online">online</IonSelectOption>
                      <IonSelectOption value="offline">offline</IonSelectOption>
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
                <ProfileNavigator />
              </IonCardContent>
              <div style={{ height: "20vh", width: "100vw" }}></div>
            </IonContent>
          </>
        )}
      </IonContent>
    </>
  );
};
export default Profile;
