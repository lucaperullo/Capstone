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
import { Provider } from "react-redux";
import LoginPage from "./pages/LoginPage";
import { store } from "./store/store";
import MainPage from "./pages/MainPage";
import { toggleTheme } from "./store/features/chatrooms/chatRoomSlice";
import { MenuExample } from "./components/MenuBar";
import RegisterPage from "./pages/RegisterPage";

const App: React.FC = () => (
  <Provider store={store}>
    <IonApp>
      <IonReactRouter>
        <Route path="/" exact component={RegisterPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/chat" exact component={MainPage} />
      </IonReactRouter>
    </IonApp>
  </Provider>
);

export default App;
