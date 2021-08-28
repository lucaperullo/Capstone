import { Redirect, Route } from "react-router-dom";

import { IonApp, IonContent } from "@ionic/react";
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
import "swiper/swiper.scss";

// other imports

import LoginPage from "./pages/LoginPage";

// import RegisterPage from "./pages/RegisterPage";
import { useEffect, useState } from "react";
import { useStateValue } from "./contextApi/stateProvider.js";

import Profile from "./components/Profile";

import { socketConnection } from "./socketCalls/connection";
import { connectToRooms } from "./socketCalls/roomsConnection";

import Player from "./components/Player";
import Category from "./components/Category";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SongList from "./components/SongList";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper/core";
import Chat from "./components/Chat";
import Contacts from "./components/Contacts";
//TODO: get users related artist albums and tracks for best suggestion
//TODO: optimize the relations between users (follow/unfollow !== chat)
//TODO: share timing of the queque of the songs with socket
//TODO: optimize styling and UX/UI to make it beginner friendly and not hard to use
SwiperCore.use([EffectCoverflow, Pagination]);
const App: React.FC = () => {
  const [state, dispatch] = useStateValue();
  const [searchText, setSearchText] = useState<string>();

  let socket: { disconnect: () => any };
  // const fetchUser = async () => {
  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${
          process.env.REACT_APP_NODE_ENV === "Production"
            ? "http://localhost:3999/auth/me"
            : "https://capstonebe.herokuapp.com/auth/me"
        }`,
        {
          credentials: "include",
        }
      );
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
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/conversations/:id">
          <Chat />
        </Route>
        <Route path="/" component={Player} />
        <Route path="/login" exact component={LoginPage} />
        <Route exact path="/discover/:category">
          <Category />
        </Route>
        <Route path="/discover/:category/:playlist">
          <SongList />
        </Route>

        <div className="desktopView">
          <Route path="/" component={Navbar} />
          <Route exact path="/discover">
            <Home />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
        </div>
        <div className="mobileView">
          <Route path="/" component={Navbar} />
          <Route exact path="/discover">
            <Home />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
        </div>
      </IonReactRouter>

      <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
        <Player />
      </div>
    </IonApp>
  );
};

export default App;
