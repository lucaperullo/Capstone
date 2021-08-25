import React, { useEffect, useState } from "react";
import { useStateValue } from "../contextApi/stateProvider";
import { socketConnection } from "../socketCalls/connection";
import { connectToRooms } from "../socketCalls/roomsConnection";
import "../theme/desktop.css";

import DesktopNav from "./DesktopNav";
import Searchbar from "./Searchbar";
interface MMessages {
  text: string;
  senderId: any;
  roomId: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
export default function Navbar() {
  const [messageTheme, setMessageTheme] = useState<string>("primary");

  const [SettingsModalShow, setSettingsModalShow] = useState<boolean>(false);

  const [Background, setBackground] = useState<string>("");
  const [BackgroundColor, setBackgroundColor] = useState("");
  const [state, dispatch] = useStateValue();
  let socket: { disconnect: () => any };
  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${
          process.env.REACT_APP_NODE_ENV === "Production"
            ? "https://capstonebe.herokuapp.com/me"
            : "http://localhost:3999/me"
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

  return (
    <div className="sidebar-container">
      <div
        className={state?.user?.appTheming?.theme ? "navbar" : "navbar-light"}
      >
        <div className="title-logo">
          <img
            draggable="false"
            className="logo desktop-logo"
            src="https://media.discordapp.net/attachments/786174311718322227/859041060809474048/outMusic.png?width=495&height=492"
            alt=""
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <DesktopNav
            messageTheme={messageTheme}
            setMessageTheme={setMessageTheme}
            setChatBackgroundColor={setBackgroundColor}
            chatBackgroundColor={BackgroundColor}
            setChatBackground={setBackground}
            chatBackground={Background}
            modalShow={SettingsModalShow}
            setModalShow={setSettingsModalShow}
          />
        </div>
      </div>
    </div>
  );
}
