export const initialState = {
  user: null,
  users: null,
  socket: null,
  newReleases: null,
  searchResults: null,
  favourites: null,
  categories: null,
  recent: null,
  forYou: null,
  category: null,
  categoryName: null,
  logged: false,
  actualChat: null,
  nowPlaying: {
    tracks: [],
    playing: false,
    index: 0,
  },
};

export const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_ACTUAL_CHAT":
      return {
        ...state,
        actualChat: action.payload,
      };
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "SET_LOGGED_STATE":
      return {
        ...state,
        logged: action.payload,
      };
    case "SET_RECENT":
      return {
        ...state,
        recent: action.payload,
      };
    case "SET_FAVOURITES":
      return {
        ...state,
        favourites: action.payload,
      };
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
      };
    case "SET_FOR_YOU":
      return {
        ...state,
        forYou: action.payload,
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
        categoryName: action.payload,
      };
    case "SET_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };
    case "SET_CURRENT_PLAYLIST":
      return {
        ...state,
        nowPlaying: {
          tracks: action.payload.tracks,
          playing: true,
          index: action.payload.index,
        },
      };
    case "SET_PLAY_PAUSE":
      return {
        ...state,
        nowPlaying: {
          ...state.nowPlaying,
          playing: action.payload,
        },
      };

    case "SET_SOCKET":
      return {
        ...state,
        socket: action.payload,
      };

    case "SET_ACTUAL_SONG":
      return {
        ...state,
        src: action.payload,
      };
    case "SET_ACTUAL_IDX":
      return {
        ...state,
        idx: action.payload,
      };
    case "SET_PLAYING":
      return {
        ...state,
        playing: action.payload,
      };
    default:
      return state;
  }
};
