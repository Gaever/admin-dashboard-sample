import {request, url} from '../api';

export const A_OPERATOR_UPDATE = 'A_OPERATOR_UPDATE';
export const A_OPERATOR_SET_LIST = 'A_OPERATOR_SET_LIST';
export const A_OPERATOR_ERROR = 'A_OPERATOR_ERROR';

export const setError = error => ({
  type: A_OPERATOR_ERROR,
  payload: {
    error
  }
});

export const setOperatorList = list => ({
  type: A_OPERATOR_SET_LIST,
  payload: {
    list
  }
})

export function fetchOperators() {
  return async function (dispatch, getState) {
    try {
      const {user: {active: login}} = getState();
      const list = await request(`${url}?...`);
      dispatch(setOperatorList(list));
    } catch (error) {
      dispatch(setError(error));
    }
  }
};

export function getOperator(id) {
  return async function (dispatch, getState) {
    try {
      const {user: {active: login}} = getState();

      const data = await request(`${url}?...`);
      dispatch({
        type: A_OPERATOR_UPDATE,
        payload: {
          id,
          data,
        }
      });
    } catch (error) {
      dispatch(setError(error));
    }
  }
};

export function invalidateOperatorSession(id) {
  return async function (dispatch, getState) {
    try {
      const {user: {active: login}} = getState();

      const list = await request(`${url}?...`);
      dispatch(setOperatorList(list));
    } catch (error) {
      dispatch(setError(error));
    }
  }
};

export function updateOperatorLogin(id, operatorLogin) {
  return async function (dispatch, getState) {
    try {
      const {user: {active: login}} = getState();

      const list = await request(`${url}?...`);
      dispatch(setOperatorList(list));
    } catch (error) {
      dispatch(setError(error));
    }
  }
};

export function updateOperatorName(id, operatorName) {
  return async function (dispatch, getState) {
    try {
      const {user: {active: login}} = getState();

      const list = await request(`${url}?...`);
      dispatch(setOperatorList(list));
    } catch (error) {
      dispatch(setError(error));
    }
  }
};

export function updateIsManager(id, isManager) {
  return async function (dispatch, getState) {
    try {
      const {user: {active: login}} = getState();

      const list = await request(`${url}?...`);
      dispatch(setOperatorList(list));
    } catch (error) {
      dispatch(setError(error));
    }
  }
};

export function updateOperatorPassword(id, password) {
  return async function (dispatch, getState) {
    try {
      const {user: {active: login}} = getState();

      const list = await request(`${url}?...`);
      dispatch(setOperatorList(list));
    } catch (error) {
      dispatch(setError(error));
    }
  }
};

export async function addOperator(client, data) {
  try {
    let params = `${url}?...`;
    // eslint-disable-next-line
    for (let prop in data) {
      params = `${params}&${prop}=${data[prop]}`;
    }
    return request(params);
  } catch (error) {
  }
}

export function removeOperator(id) {
  return async function (dispatch, getState) {
    try {
      const {user: {active: login}} = getState();

      const list = await request(`${url}?...`);
      dispatch(setOperatorList(list));
    } catch (error) {
      dispatch(setError(error));
    }
  }
};

export function restoreOperator(id) {
  return async function (dispatch, getState) {
    try {
      const {user: {active: login}} = getState();

      const list = await request(`${url}?...`);
      dispatch(setOperatorList(list));
    } catch (error) {
      dispatch(setError(error));
    }
  }
};
