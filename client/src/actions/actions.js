import actionTypes from "./actionsType";

export const login = (user, token) => ({
  type: actionTypes.LOG_IN,
  payload: {
    user,
    token,
  },
});

export const logout = () => ({
  type: actionTypes.LOG_OUT,
  payload: {},
});

export const loginMessage = (data) => ({
  type: actionTypes.LOG_IN_MESSAGES,
  payload: data,
});

export const clearLoginMessage = () => ({
  type: actionTypes.CLEAR_LOG_IN_MESSAGES,
  payload: null,
});

export const register = () => ({
  type: actionTypes.REGISTER_USER,
  payload: data,
});

export const deleteRegisterMessage = () => ({
  type: actionTypes.DELETE_REGISTER_USER_MESSAGE,
  payload: null,
});

export const getVacations = (vacations) => ({
  type: actionTypes.GET_VACATIONS,
  payload: {
    vacations,
  },
});

export const postVacation = (data) => ({
  type: actionTypes.POST_VACATION_MESSAGE,
  DELETE_VACATION_MESSAGE,
  payload: data,
});
export function postVacation() {
  return ({
    type: actionTypes.DELETE_VACATION_MESSAGE,
    payload: null,
  });
}

export const deleteVacation = (vacationId) => ({
  type: actionTypes.DELETE_VACATION,
  payload: null,
});

export const getFollowedVacations = (followedVacations) => ({
  type: actionTypes.GET_FOLLOWED_VACATIONS,
  payload: { followedVacations },
});

export const resetVacations = () => ({
  type: actionTypes.RESET_VACATIONS,
  payload: {},
});

export const editVacation = (data) => ({
  type: actionTypes.EDIT_VACATION,
  payload: data,
});
