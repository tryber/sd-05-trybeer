import helper from '../../Helper';

export const REQUESTING_USER = 'REQUESTING_USER';
export const REQUEST_USER_SUCCESS = 'REQUEST_USER_SUCCESS';
export const CLEAR_USER = 'CLEAR_USER';
export const REQUEST_USER_ERROR = 'REQUEST_USER_ERROR';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';

const requestingUser = () => ({
  type: REQUESTING_USER,
});

const requestUserSuccess = (data) => ({
  type: REQUEST_USER_SUCCESS,
  data,
});

const clearUser = () => ({
  type: CLEAR_USER,
});

const requestUserError = (error) => ({
  type: REQUEST_USER_ERROR,
  error,
});

export function getUserDataAct(body) {
  return (dispatch) => {
    dispatch(requestingUser());
    return helper.fetch.getUser(body).then(
      (data) => {
        helper.localstorage.registerData(data);
        dispatch(requestUserSuccess(data));
      },
      (error) => dispatch(requestUserError(error)),
    );
  };
}

const updateUserSuccess = (data) => ({
  type: UPDATE_USER_SUCCESS,
  data,
});

const updateUserError = (error) => ({
  type: UPDATE_USER_ERROR,
  error,
});

export function updateUserAct(body) {
  return (dispatch) => {
    dispatch(requestingUser());
    return helper.fetch.updateUser(body).then(
      (data) => {
        helper.localstorage.registerData(data);
        dispatch(updateUserSuccess(data));
      },
      (error) => dispatch(updateUserError(error)),
    );
  };
}

const registerUserSuccess = (data) => ({
  type: REGISTER_USER_SUCCESS,
  data,
});

const registerUserError = (error) => ({
  type: REGISTER_USER_ERROR,
  error,
});

export function registerUserAct(body) {
  return (dispatch) => {
    dispatch(requestingUser());
    return helper.fetch.registerUser(body).then(
      (data) => {
        helper.localstorage.registerData(data);
        dispatch(registerUserSuccess(data));
      },
      (error) => dispatch(registerUserError(error)),
    );
  };
}

export function clear() {
  return (dispatch) => {
    helper.localstorage.clearAll();
    dispatch(clearUser());
    return {};
  };
}
