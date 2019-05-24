const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  Authorization: "null",
  userName: "",
  userEmail: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.user.id,
        userName: action.payload.user.name,
        userEmail: action.payload.user.Email,
        Authorization: action.payload.token
      };
    case "SET_USER_AUTH":
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.userId,
        userName: action.payload.userName,
        userEmail: action.payload.userEmail,
        Authorization: action.payload.Authorization
      };
    case "LOGOUT_USER":
      return {
        ...state,
        isSignedIn: false,
        userId: null,
        userName: "",
        userEmail: "",
        Authorization: ""
      };
    default:
      return state;
  }
};
  