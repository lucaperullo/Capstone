import { Redirect, Route } from "react-router-dom";
import styled from "styled-components";
import {
  IonApp,
  IonItem,
  IonIcon,
  IonLabel,
  IonTabButton,
  IonBadge,
  IonContent,
  IonRouterOutlet,
  IonTabBar,
  IonTabs,
  IonSlide,
  IonSlides,
  IonSearchbar,
  IonMenuButton,
  IonHeader,
  IonSplitPane,
  IonMenu,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
// import "@ionic/react/css/padding.css";
// import "@ionic/react/css/float-elements.css";
// import "@ionic/react/css/text-alignment.css";
// import "@ionic/react/css/text-transformation.css";
// import "@ionic/react/css/flex-utils.css";
// import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/style.css";

// other imports

import LoginPage from "./pages/LoginPage";

// import RegisterPage from "./pages/RegisterPage";
import { useEffect, useState } from "react";
import { useStateValue } from "./contextApi/stateProvider.js";
import { personCircle, peopleCircleSharp, chatbubbles } from "ionicons/icons";
import Chat from "./components/Chat";
import Contacts from "./components/Contacts";
import Discover from "./components/Discover";
import Profile from "./components/Profile";
import Following from "./components/Following";
import { socketConnection } from "./socketCalls/connection";
import { connectToRooms } from "./socketCalls/roomsConnection";
import spotifyApi from "./api";
import Conversations from "./components/Conversations";

import Player from "./components/Player";
import Category from "./components/Category";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

//TODO: get users related artist albums and tracks for best suggestion
//TODO: optimize the relations between users (follow/unfollow !== chat)
//TODO: share timing of the queque of the songs with socket
//TODO: optimize styling and UX/UI to make it beginner friendly and not hard to use

const App: React.FC = () => {
  const [state, dispatch] = useStateValue();
  const [searchText, setSearchText] = useState<string>();
  let socket: { disconnect: () => any };
  // const fetchUser = async () => {
  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:3999/me`, {
        credentials: "include",
      });
      if (response.ok) {
        socket = socketConnection();
        dispatch({ type: "SET_SOCKET", payload: socket });

        const data = await response.json();

        dispatch({
          type: "SET_USER",
          payload: data,
        });

        connectToRooms(socket, data.rooms);
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
  useEffect(() => {
    fetchUser();
  }, []);

  const themeCheck = () => {
    if (state?.user?.appTheming?.theme) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  };
  const actualTheme = state?.user?.appTheming?.theme;
  useEffect(() => {
    themeCheck();
  }, [actualTheme]);

  return (
    <IonApp>
      <IonReactRouter>
        <Route path="/login" exact component={LoginPage} />
        <div className="desktopView">
          <Route path="/" component={Navbar} />
          <Route exact path="/discover">
            <Home />
          </Route>
        </div>
        <div className="mobileView">
          <Menu>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/discover">
                  <Home />
                </Route>
                <Route path="/discover/:category">
                  <Category />
                </Route>

                <Route path="/conversations/:id">
                  <IonContent>
                    <Chat />
                    {/* <Contacts /> */}
                  </IonContent>
                </Route>
                <Route exact path="/profile">
                  <Profile />
                </Route>
                <Route exact path="/">
                  {!localStorage.getItem("accessToken") ? (
                    <Redirect to="/login" />
                  ) : (
                    <Redirect to="/profile" />
                  )}
                </Route>
              </IonRouterOutlet>

              <IonTabBar slot="bottom">
                <IonTabButton tab="tab2" href="/discover">
                  <IonIcon size="large" icon={peopleCircleSharp} />
                  <IonBadge color="danger">112</IonBadge>
                </IonTabButton>

                <IonTabButton tab="tab4" href={`/contacts`}>
                  <IonIcon size="large" icon={chatbubbles} />
                  <IonBadge color="danger">999</IonBadge>
                </IonTabButton>
                <IonTabButton tab="tab1" href="/profile">
                  <IonIcon size="large" icon={personCircle} />
                  <IonBadge color="danger">2</IonBadge>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </Menu>
        </div>
      </IonReactRouter>

      <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
        <Player />
      </div>
    </IonApp>
  );
};
const Menu = styled.div`
  @media (max-width: 768px) {
    display: block;
  }
  display: block;
`;
export default App;
