import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonGrid,
  IonRow,
  IonThumbnail,
} from "@ionic/react";
import React from "react";
import { useStateValue } from "../contextApi/stateProvider";

export default function ProfilePlaylists() {
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
  return (
    <IonGrid>
      <IonRow>
        {state?.user?.playlists?.userPlaylists?.items.map((playlist: any) => (
          <IonCol
            onClick={() =>
              playTrack(
                playlist.tracks.href ? playlist.tracks.href : playlist.href
              )
            }
            sizeLg="3"
            sizeXl="2"
            sizeMd="6"
            sizeSm="6"
            sizeXs="12"
          >
            <IonCard
              className="profile-playlists-card"
              style={{ cursor: "pointer" }}
            >
              <IonCardHeader>
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "12px",
                    boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.7)",
                    cursor: "pointer",
                  }}
                  src={
                    playlist.images[0]?.url
                      ? playlist.images[0]?.url
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWcT0gfUfQFnyI5p8HCnWSbLHQhmy_cO80TxudY7E4ZtfoqI93Ky2Dx6FDvjoICrsBAj8&usqp=CAU"
                  }
                  alt=""
                />
              </IonCardHeader>
              <IonCardContent>
                {" "}
                <h4>{playlist.name}</h4>
              </IonCardContent>
            </IonCard>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
}
