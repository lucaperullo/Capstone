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
  IonBackButton,
  IonButtons,
  IonToolbar,
} from "@ionic/react";

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

export interface User {
  spotifyTokens: SpotifyTokens;
  playlists: Playlists;
  appTheming: AppTheming;
  status: Status;
  bio: string;
  refreshToken?: null[] | null;
  profilePic: string;
  contacts?: null[] | null;
  rooms?: RoomsEntity[] | null;
  _id: string;
  spotifyId: string;
  username: string;
  country: string;
}
export interface SpotifyTokens {
  access_token: string;
  refresh_token: string;
  expires_in: string;
}
export interface Playlists {
  userPlaylists: UserPlaylists;
  next?: null;
  previous?: null;
  total: number;
}
export interface UserPlaylists {
  items?: ItemsEntity[] | null;
}
export interface ItemsEntity {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images?: ImagesEntity[] | null;
  name: string;
  owner: Owner;
  primary_color?: null;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}
export interface ExternalUrls {
  spotify: string;
}
export interface ImagesEntity {
  height: number;
  url: string;
  width: number;
}
export interface Owner {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}
export interface Tracks {
  href: string;
  total: number;
}
export interface AppTheming {
  theme: boolean;
  bubbleChat: string;
  backgroundColor: string;
  backgroundImage: string;
}
export interface Status {
  music: Music;
  presence: string;
}
export interface Music {
  tracks?: null[] | null;
}
export interface RoomsEntity {
  playlist?: null[] | null;
  _id: string;
  participants?: ParticipantsEntity[] | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface ParticipantsEntity {
  _id: string;
  userId: string;
}

const UserProfile = () => {
  const [searchText, setSearchText] = useState("");
  const [Loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [user, setUser] = useState<User>();
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
  const getUser = async (id: any) => {
    const data = await fetch(
      process.env.REACT_APP_NODE_ENV === "Dev"
        ? `http://localhost:3999/auth/${id}`
        : `http://capstonebe.herokuapp.com/auth/${id}`,
      {
        credentials: "include",
      }
    );
    const user = await data.json();
    dispatch({
      type: "SET_USER_PROFILE",
      payload: user,
    });
  };

  useEffect(() => {
    const id = window.location.pathname.split("/")[3];

    setLoading(true);
    getUser(id);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

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
              <IonToolbar>
                <IonButtons slot="start">
                  <IonBackButton defaultHref="home" />
                </IonButtons>
              </IonToolbar>
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
                ></div>
                <div className="profile-cover">
                  <img
                    draggable="false"
                    className="our-avatar"
                    src={state?.selectedUser?.profilePic}
                    alt=""
                  />
                </div>

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
                    <h1>{state?.selectedUser?.username}</h1>
                  </IonCardTitle>
                  <IonCardSubtitle>
                    <h3>{state?.selectedUser?.bio}</h3>
                  </IonCardSubtitle>
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
export default UserProfile;
