import * as ACTION_TYPE from '../actions/actionTypes';

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  Authorization: 'null',
  userName: '',
  userEmail: '',
  groupId: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.LOGIN_USER:
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.user.id,
        groupId: action.payload.user.group_id,
        userName: action.payload.user.name,
        userEmail: action.payload.user.Email,
        Authorization: action.payload.token
      };
    case ACTION_TYPE.SET_USER_AUTH:
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.userId,
        userName: action.payload.userName,
        userEmail: action.payload.userEmail,
        Authorization: action.payload.Authorization,
        groupId: action.payload.groupId
      };
    case ACTION_TYPE.LOGOUT_USER:
      return {
        ...state,
        isSignedIn: false,
        userId: null,
        userName: '',
        userEmail: '',
        Authorization: '',
        groupId: null
      };
    default:
      return state;
  }
};
