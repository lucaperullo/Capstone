import io from "socket.io-client";

export const socketConnection = () => {
  const socket = io.connect(`${process.env.REACT_APP_BASE_URL}/`);
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });
  return socket;
};
