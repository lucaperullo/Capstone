export const initialState = {
  user: null,
  socket: null,
  newReleases: null,
  categories: null,
  category: null,
  tracks: null,
  player: {
    playing: false,
    volume: 0.5,
    currentTime: 0,
  },
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
    case "SET_NEW_RELEASES":
      return {
        ...state,
        newReleases: action.payload,
      };
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "SET_SELECTED_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };
    case "SET_CURRENT_PLAYLIST":
      return {
        ...state,
        tracks: action.payload,
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
        song: {
          track: action.payload.song,
          song_index: action.payload.idx,
        },
      };

    default:
      return state;
  }
};
