import {url, request} from '../api';
import {setOperatorList, fetchOperators} from './operator';

export const A_USER_SET = 'A_USER_SET';
export const A_USER_UPDATE_CLIENT = 'A_USER_UPDATE_CLIENT';
export const A_USER_SET_LIST = 'A_USER_SET_LIST';
export const A_USER_ERROR = 'A_USER_ERROR';
export const A_USER_SET_WORK_MODE = 'A_USER_SET_WORK_MODE';
export const A_USER_SET_AUTOANSWER_TIME = 'A_USER_SET_AUTOANSWER_TIME';
export const A_USER_SET_AUTOANSWER_TEXT = 'A_USER_SET_AUTOANSWER_TEXT';
export const A_USER_ADD = 'A_USER_ADD';

export const LS_KEY_ACTIVE_CLIENT = 'LS_KEY_ACTIVE_CLIENT';

export async function createClient(data) {
  try {
    let params = `${url}?...`;
    // eslint-disable-next-line
    for (let prop in data) {
      params = `${params}&${prop}=${data[prop]}`;
    }
    const users = await request(params);

    return users;
  } catch (error) {
  }
}

async function updateAndRefreshUser(dispatch, getState, url) {
  const {user: {active: login}} = getState();

  if (!login) throw new Error('E_USER_NOT_SET');

  const data = await request(url);

  dispatch({
    type: A_USER_UPDATE_CLIENT,
    payload: {
      login,
      data,
    }
  });
}

export const setError = error => ({
  type: A_USER_ERROR,
  payload: {
    error
  }
});

export function setUser(login) {
  return async function (dispatch) {
    dispatch(setOperatorList(null));

    dispatch({
      type: A_USER_SET,
      payload: {
        login
      }
    });
    localStorage.setItem(LS_KEY_ACTIVE_CLIENT, login);
    dispatch(fetchOperators());
  }
}

export const setUsers = list => ({
  type: A_USER_SET_LIST,
  payload: {
    list
  }
});

export function fetchUsers() {
  return async function (dispatch) {
    try {
      const list = await request(`${url}?...`);
      const activeClient = localStorage.getItem(LS_KEY_ACTIVE_CLIENT);
      
      dispatch(setUsers(list));
      if (activeClient) {
        dispatch(setUser(activeClient));
      }
    } catch (error) {
      dispatch(setError(error));
    }
  }
};

export function getClient(login) {
  return async function (dispatch) {
    try {
      if (!login) throw new Error('E_USER_NOT_SET');

      const data = await request(`${url}?...`);
      dispatch({
        type: A_USER_UPDATE_CLIENT,
        payload: {
          login,
          data,
        }
      });
    } catch (error) {
      dispatch(setError(error));
    }
  }
};


export function setAutoanswerTime(startTime, finishTime) {
  return async function (dispatch, getState) {
    try {
      const {user: {active: login}} = getState();

      await updateAndRefreshUser(
        dispatch,
        getState,
        `${url}?...`
      );
    } catch (error) {
      dispatch(setError(error));
    }
  }
};

export function setAutoanswerText(text) {
  return async function (dispatch, getState) {
    try {
      const {user: {active: login}} = getState();

      await updateAndRefreshUser(
        dispatch,
        getState,
        `${url}?...`
      );
    } catch (error) {
      dispatch(setError(error));
    }
  }
};

export function updatePassword(password) {
  return async function (dispatch, getState) {
    try {
      const {user: {active: login}} = getState();

      await updateAndRefreshUser(
        dispatch,
        getState,
        `${url}?...`
      );
    } catch (error) {
      dispatch(setError(error));
    }
  }
};

export function updateWorkMode(workMode) {
  return async function (dispatch, getState) {
    try {
      const {user: {active: login}} = getState();

      await updateAndRefreshUser(
        dispatch,
        getState,
        `${url}?...`
      );
    } catch (error) {
      dispatch(setError(error));
    }
  }
};

export function addClient(data) {
  return async function (dispatch, getState) {
    try {
      let params = `${url}?...`;
      // eslint-disable-next-line
      for (let prop in data) {
        params = `${params}&${prop}=${data[prop]}`;
      }
      await updateAndRefreshUser(dispatch, getState, params);
    } catch (error) {
      dispatch(setError(error));
    }
  }
};
