export const initialState = {
  user: null,
  socket: null,
  actualChat: null,
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
        actualChat: action.payload,
      };
    default:
      return state;
  }
};
