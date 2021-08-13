import { IonSearchbar } from "@ionic/react";
import React, { useEffect, useState } from "react";

export default function Searchbar() {
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    console.log(searchText);
  }, [searchText]);
  return (
    <div>
      <IonSearchbar
        value={searchText}
        onIonChange={(e) => setSearchText(e.detail.value!)}
        animated
      ></IonSearchbar>
    </div>
  );
}
