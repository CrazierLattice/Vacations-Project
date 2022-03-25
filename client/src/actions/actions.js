import {
  DELETE_REGISTER_USER_MESSAGE,
  REGISTER_USER,
  CLEAR_LOG_IN_MESSAGES,
  LOG_IN,
  LOG_OUT,
  LOG_IN_MESSAGES,
  GET_VACATIONS,
  POST_VACATION_MESSAGE,
  DELETE_VACATION_MESSAGE,
  DELETE_VACATION,
  GET_FOLLOWED_VACATIONS,
  EDIT_VACATION,
  RESET_VACATIONS,
} from "./actionsType";
export const login = (user, token) => ({
  type: LOG_IN,
  payload: {
    user,
    token,
  },
});

export const logout = () => ({
  type: LOG_OUT,
  payload: {},
});

export const loginMessage = (data) => ({
  type: LOG_IN_MESSAGES,
  payload: data,
});

export const clearLoginMessage = () => ({
  type: CLEAR_LOG_IN_MESSAGES,
  payload: null,
});

export const register = () => ({
  type: REGISTER_USER,
  payload: data,
});

export const deleteRegisterMessage = () => ({
  type: DELETE_REGISTER_USER_MESSAGE,
  payload: null,
});

export const getVacations = (vacations) => ({
  type: GET_VACATIONS,
  payload: {
    vacations,
  },
});

export const postVacation = (data) => ({
  type: POST_VACATION_MESSAGE,
  DELETE_VACATION_MESSAGE,
  payload: data,
});
export const postVacation = () => ({
  type: DELETE_VACATION_MESSAGE,
  payload: null,
});

export const deleteVacation = (vacationId) => ({
  type: DELETE_VACATION,
  payload: null,
});

export const getFollowedVacations = (followedVacations) => ({
  type: GET_FOLLOWED_VACATIONS,
  payload: { followedVacations },
});

export const resetVacations = () => ({
  type: RESET_VACATIONS,
  payload: {},
});

export const editVacation = (data) => ({
  type: EDIT_VACATION,
  payload: data,
});
