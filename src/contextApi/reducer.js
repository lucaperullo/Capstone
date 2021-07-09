export const initialState = {
  user: null,
  socket: null,
  player: null,
  song: null,
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
    case "SET_ACTUAL_SONG":
      return {
        ...state,
        song: action.payload,
      };

    default:
      return state;
  }
};
