import {
  IonCard,
  IonHeader,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonSpinner,
} from "@ionic/react";
import axios from "axios";
import React from "react";
import { useStateValue } from "../contextApi/stateProvider";

export default function DiscoverMusic() {
  const [state, dispatch] = useStateValue();
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
  const fetchCategories = async () => {
    try {
      const code = state?.user?.spotifyTokens?.access_token;
      console.log(code);
      const response = await fetch(`http://localhost:3999/spotify/categories`, {
        method: "POST",
        body: code,
        credentials: "include",
      });
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
        // window.location.assign(`/discover/${category}`);
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

  return (
    <>
      <IonCard>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IonHeader>
            <h1>#NEW RELEASES</h1>
          </IonHeader>
          <IonButton
            color={
              state?.newReleases?.albums?.items?.length === 46
                ? "danger"
                : "tertiary"
            }
            onClick={() =>
              state?.newReleases?.albums?.items.length > 4
                ? fetchNewReleases()
                : getMoreReleases()
            }
          >
            {state?.newReleases?.albums?.items?.length === 46
              ? "Show Less"
              : "Show More"}
          </IonButton>
        </div>
      </IonCard>
      <IonGrid>
        <IonRow>
          {state?.newReleases?.albums?.items !== undefined ? (
            state?.newReleases?.albums.items.map((album: any) => (
              <IonCol sizeXl="3" sizeLg="4" sizeMd="6" sizeXs="12">
                <div>
                  <img
                    style={{
                      width: "250px",
                      height: "250px",
                      borderRadius: "12px",
                      boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.2)",
                      cursor: "pointer",
                    }}
                    src={album.images[0].url}
                    alt=""
                  />
                  <h4>{album.name}</h4>
                </div>
              </IonCol>
            ))
          ) : (
            <div
              style={{
                height: "40vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IonSpinner name="crescent" />
            </div>
          )}
        </IonRow>
      </IonGrid>

      <IonCard>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IonHeader>
            <h1>#CATEGORIES</h1>
          </IonHeader>
          <IonButton
            color={
              state?.categories?.categories?.items?.length > 4
                ? "danger"
                : "tertiary"
            }
            onClick={() =>
              state?.categories?.categories?.items?.length > 4
                ? fetchCategories()
                : getMoreCategories()
            }
          >
            {state?.categories?.categories?.items?.length > 4
              ? "Show Less"
              : "Show More"}
          </IonButton>
        </div>
      </IonCard>
      <IonGrid>
        <IonRow style={{ paddingBottom: "100px" }}>
          {state?.categories?.categories?.items !== undefined ? (
            state?.categories?.categories?.items?.map((item: any) => {
              return (
                <IonCol sizeXl="3" sizeLg="4" sizeMd="6" sizeXs="12">
                  <div onClick={() => getCategory(item.id)}>
                    <img
                      onClick={() => getCategory(item.id)}
                      style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "12px",
                        boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.7)",
                        cursor: "pointer",
                      }}
                      src={item.icons[0]?.url ? item.icons[0].url : ""}
                      alt=""
                    />
                    <h4>{item.name}</h4>
                  </div>
                </IonCol>
              );
            })
          ) : (
            <div
              style={{
                height: "40vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <IonSpinner name="crescent" />
            </div>
          )}
        </IonRow>
      </IonGrid>
    </>
  );
}
function setUsers(data: any) {
  throw new Error("Function not implemented.");
}
