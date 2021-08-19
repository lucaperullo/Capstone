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
  IonBadge,
  IonTabButton,
  IonHeader,
  IonToolbar,
  IonSpinner,
} from "@ionic/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  pin,
  wifi,
  wine,
  warning,
  walk,
  chevronDownCircleOutline,
  arrowDownOutline,
  personAdd,
  personCircle,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { useStateValue } from "../contextApi/stateProvider";
import DiscoverMusic from "./DiscoverMusic";
import MusicFolder from "./Navigator";
import TopUsersFolder from "./TopUsersFolder";
import SimilarTastesFolder from "./SimilarTastesFolder";
import Navigator from "./Navigator";

const Discover = () => {
  let history = useHistory();
  const [searchText, setSearchText] = useState<string>("");
  const [state, dispatch] = useStateValue();
  const [users, setUsers] = useState<any>();

  const toggleFollow = async (userid: string) => {
    try {
      const data = await fetch(`http://localhost:3999/users/follow/${userid}`, {
        method: "PUT",
        credentials: "include",
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUser = async () => {
    let socket: { disconnect: () => any };
    try {
      const response = await fetch(`http://localhost:3999/me`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();

        dispatch({
          type: "SET_USER",
          payload: data,
        });
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
  const fetchNewReleases = async () => {
    try {
      const code = state?.user?.spotifyTokens?.access_token;
      console.log(code);
      const response = await fetch(
        `http://localhost:3999/spotify/new/releases`,
        { method: "POST", body: code, credentials: "include" }
      );
      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: "SET_NEW_RELEASES",
          payload: data,
        });
      } else {
        console.log("Error while fetching releases");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCategory = async (category: any) => {
    try {
      const code = state?.user?.spotifyTokens?.access_token;

      const response = await fetch(
        `http://localhost:3999/spotify/category/${category}`,
        {
          headers: {
            Authorization: `Bearer ${code}`,
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("CATEFOEYAUIUADBAI", data);
        dispatch({
          type: "SET_SELECTED_CATEGORY",
          payload: data,
        });
        // history.push(`/discover/${category}`);
      } else {
        console.log("Error while fetching categories");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await axios.get(`http://localhost:3999/users`, {
        withCredentials: true,
      });

      setUsers(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMoreCategories = async () => {
    try {
      const code = state?.user?.spotifyTokens?.access_token;
      const response = await fetch(
        `http://localhost:3999/spotify/view-more-categories`,
        {
          method: "POST",
          body: code,
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: "SET_CATEGORIES",
          payload: data,
        });
      } else {
        console.log("Error while fetching categories");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMoreReleases = async () => {
    try {
      const code = state?.user?.spotifyTokens?.access_token;
      const response = await fetch(
        `http://localhost:3999/spotify/view-more-releases`,
        { method: "POST", body: code, credentials: "include" }
      );
      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: "SET_NEW_RELEASES",
          payload: data,
        });
      } else {
        console.log("Error while fetching releases");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMoreReleases();
    getMoreCategories();
    fetchUser();
    fetchUsers();
  }, []);
  // const loadStuff = async () => {
  //   console.log(state);
  //   setTimeout(async () => {
  //     fetchUsers();
  //     getTokens();
  //   }, 100);
  // };

  return (
    <>
      {/*-- Default Refresher --*/}
      <IonContainer>
        <div style={{ paddingTop: "80px" }}>
          <Navigator />
        </div>
      </IonContainer>

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
    </>
  );
};

const StyledCard = styled(IonCard)`
  border-radius: 15px;
`;
const IonContainer = styled(IonContent)`
  overflow: hidden;
  height: 100vh;
  padding-bottom: 1000px;
`;
export default Discover;
