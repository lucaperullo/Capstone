export const initialState = {
  user: null,
  socket: null,
  theme: true,
  chatTheme: {
    ChatBubble: "primary",
    ChatBackground: null,
    ChatBackgroundColor: "",
  },
  player: null,
};

export const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_SOCKET":
      return {
        ...state,
        socket: action.payload,
      };
    case "SET_ACTUAL_CHAT":
      return {
        ...state,
        chatTheme: action.payload,
      };
    case "SET_PLAYER":
      return {
        ...state,
        player: action.payload,
      };
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};
