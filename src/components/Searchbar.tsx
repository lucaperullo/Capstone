import { IonSearchbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useStateValue } from "../contextApi/stateProvider";

export default function Searchbar() {
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
        ` https://spotify-fetch.herokuapp.com/https://capstonebe.herokuapp.com/spotify/search/${query}`,
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
    <div className="searchbar-all">
      <IonSearchbar
        value={searchText}
        onIonChange={(e) => setSearchText(e.detail.value!)}
        animated
      ></IonSearchbar>
    </div>
  );
}
