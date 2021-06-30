import { Redirect, Route } from "react-router-dom";

import {
  IonApp,
  IonItem,
  IonIcon,
  IonLabel,
  IonToggle,
  IonRow,
  IonCol,
  IonInput,
  IonTabButton,
  IonBadge,
  IonContent,
  IonRouterOutlet,
  IonTabBar,
  IonTabs,
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

import RegisterPage from "./pages/RegisterPage";
import { useEffect } from "react";
import { useStateValue } from "./contextApi/stateProvider.js";
import {
  personCircle,
  planetSharp,
  peopleCircleSharp,
  chatbubbles,
} from "ionicons/icons";
import Chat from "./components/Chat";
import Contacts from "./components/Contacts";
import Discover from "./components/Discover";
import Profile from "./components/Profile";
import Following from "./components/Following";
import { socketConnection } from "./socketCalls/connection";
import { connectToRooms } from "./socketCalls/roomsConnection";

const App: React.FC = () => {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    let socket: { disconnect: () => any };
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
    fetchUser();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/login" exact component={LoginPage} />

        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/discover">
              <Discover />
            </Route>

            <Route path="/following">
              <IonContent>
                <Following />
              </IonContent>
            </Route>
            <Route path="/conversations">
              <IonContent>
                <Chat />
                <Contacts />
              </IonContent>
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="top">
            <IonTabButton tab="tab2" href="/discover">
              <IonIcon icon={planetSharp} />
              <IonBadge color="danger">112</IonBadge>
              <IonLabel>Discover</IonLabel>
            </IonTabButton>

            <IonTabButton tab="tab3" href="/following">
              <IonIcon icon={peopleCircleSharp} />
              <IonBadge color="danger">5</IonBadge>
              <IonLabel>Following</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab4" href="/conversations">
              <IonIcon icon={chatbubbles} />
              <IonBadge color="danger">999</IonBadge>
              <IonLabel>Conversations</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab1" href="/profile">
              <IonIcon icon={personCircle} />
              <IonBadge color="danger">2</IonBadge>
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
