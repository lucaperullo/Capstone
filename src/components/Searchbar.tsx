import { IonSearchbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useStateValue } from "../contextApi/stateProvider";

export default function Searchbar() {
  //TODO: add users results in search
  const [searchText, setSearchText] = useState("");
  let history = useHistory();
  const [state, dispatch] = useStateValue();
  const searchTracks = async (query: any) => {
    if (query.length === 0) {
      dispatch({
        type: "SET_SEARCH_RESULTS",
        payload: null,
      });
    } else {
      const data = await fetch(
        `${
          process.env.REACT_APP_NODE_ENV === "Dev"
            ? `http://localhost:3999/spotify/search/${query}`
            : `https://capstonebe.herokuapp.com/spotify/search/${query}`
        }`,
        {
          credentials: "include",
        }
      );
      const tracks = await data.json();

      const trackItems = tracks.tracks.items;

      const actualtracks = trackItems.filter(
        (track: any) => track.preview_url !== null
      );
      dispatch({
        type: "SET_SEARCH_RESULTS",
        payload: actualtracks,
      });
    }
  };

  useEffect(() => {
    searchTracks(searchText);
  }, [searchText]);
  return (
    <IonSearchbar
      color={state?.user?.appTheming?.theme ? "dark" : "light"}
      value={searchText}
      onIonChange={(e) => setSearchText(e.detail.value!)}
      animated
    ></IonSearchbar>
  );
}
