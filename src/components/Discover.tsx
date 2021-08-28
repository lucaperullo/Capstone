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

  const getMoreCategories = async () => {
    try {
      const code = state?.user?.spotifyTokens?.access_token;
      const response = await fetch(
        `${
          process.env.REACT_APP_NODE_ENV === "Dev"
            ? "http://localhost:3999/spotify/view-more-categories"
            : "https://capstonebe.herokuapp.com/spotify/view-more-categories"
        }`,
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
        `${
          process.env.REACT_APP_NODE_ENV === "Dev"
            ? "http://localhost:3999/spotify/view-more-releases"
            : "https://capstonebe.herokuapp.com/spotify/view-more-releases"
        }`,
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
  const getForYou = async () => {
    try {
      const code = state?.user?.spotifyTokens?.access_token;

      const response = await fetch(
        `${
          process.env.REACT_APP_NODE_ENV === "Dev"
            ? "http://localhost:3999/spotify/raccomanded"
            : "https://capstonebe.herokuapp.com/spotify/raccomanded"
        }`,
        {
          headers: {
            Authorization: `Bearer ${code}`,
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const res = await response.json();

        const data = await res.filter((item: any) => item.preview_url !== null);
        dispatch({
          type: "SET_FOR_YOU",
          payload: data,
        });
      } else {
        console.log("Error while fetching categories");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getRecent = async () => {
    try {
      const code = state?.user?.spotifyTokens?.access_token;

      const response = await fetch(
        `${
          process.env.REACT_APP_NODE_ENV === "Dev"
            ? "http://localhost:3999/spotify/recently-played"
            : "https://capstonebe.herokuapp.com/spotify/recently-played"
        }`,
        {
          headers: {
            Authorization: `Bearer ${code}`,
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const res = await response.json();

        const data = res.filter((item: any) => item.track.preview_url !== null);
        dispatch({
          type: "SET_RECENT",
          payload: data,
        });
      } else {
        console.log("Error while fetching categories");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getUserFavourites = async () => {
    try {
      const res = await fetch(
        `${
          process.env.REACT_APP_NODE_ENV === "Dev"
            ? "http://localhost:3999/spotify/favourites"
            : "https://capstonebe.herokuapp.com/spotify/favourites"
        }`,
        {
          credentials: "include",
        }
      );
      console.log(res);
      if (res.ok) {
        console.log("favourits setted");
        const res2 = await res.json();
        console.log(res2);
        const data = res2.items.filter(
          (item: any) => item.track.preview_url !== null
        );
        dispatch({
          type: "SET_FAVOURITES",
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMoreReleases();
    getMoreCategories();
    // fetchUser();
    getUserFavourites();
    getForYou();
    getRecent();
  }, []);

  return <Navigator />;
};

export default Discover;
