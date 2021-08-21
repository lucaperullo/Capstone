export const initialState = {
  user: null,
  users: null,
  socket: null,
  newReleases: null,
  searchResults: null,
  categories: null,
  recent: null,
  forYou: null,
  category: null,
  categoryName: null,
  tracks: null,
  logged: false,
  playing: false,
  idx: 0,
  src: null,
};

export const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
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
