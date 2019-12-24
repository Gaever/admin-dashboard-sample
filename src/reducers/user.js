import ObserverFactory from '../redux/observer';
import {
  A_USER_ERROR,
  A_USER_SET,
  A_USER_UPDATE_CLIENT,
  A_USER_SET_LIST,
  A_USER_SET_WORK_MODE,
  A_USER_SET_AUTOANSWER_TIME,
  A_USER_SET_AUTOANSWER_TEXT,
} from '../actions/user';

const initialState = {
  list: null,
  loginToIndex: null,
  active: null,
  error: null,
};

class UserReducer extends ObserverFactory {
  constructor() {
    super();
    this.registerHandlers();
  }

  registerHandlers() {
    this.on(A_USER_ERROR, this.handleSetUserError.bind(this));

    this.on(A_USER_SET, this.handleSetUser.bind(this));
    this.on(A_USER_SET_LIST, this.handleSetUsers.bind(this));
    this.on(A_USER_SET_WORK_MODE, this.handleSetWorkMode.bind(this));
    this.on(A_USER_SET_AUTOANSWER_TIME, this.handleSetAutoAnswerTime.bind(this));
    this.on(A_USER_SET_AUTOANSWER_TEXT, this.handleSetAutoAnswerText.bind(this));
    this.on(A_USER_UPDATE_CLIENT, this.handleUpdateClient.bind(this));
  }

  handleUpdateClient = ({ state, action }) => {
    const {
      payload: {
        login,
        data,
      } = {},
    } = action || {};
    const {list, loginToIndex} = state || {};

    const index = loginToIndex[login];
    const newList = list;
    newList[index] = data;

    return ({
      ...state,
      list: newList,
    });
  }

  handleSetAutoAnswerText = ({ state, action }) => {
    const {payload: {
      text,
    } = {}} = action || {};
    const {active, list, loginToIndex} = state || {};

    if (!active) return { ...state };
    
    const index = loginToIndex[active];
    const newList = list;
    newList[index].autoAnswer = text;

    return ({
      ...state,
      list: newList,
    });
  }

  handleSetAutoAnswerTime = ({ state, action }) => {
    const {payload: {
      startTime,
      finishTime,
    } = {}} = action || {};
    const {active, list, loginToIndex} = state || {};

    if (!active) return { ...state };
    
    const index = loginToIndex[active];
    const newList = list;
    newList[index].startTime = startTime;
    newList[index].finishTime = finishTime;

    return ({
      ...state,
      list: newList,
    });
  }

  handleSetWorkMode = ({ state, action }) => {
    const {payload: {workMode} = {}} = action || {};
    const {active, list, loginToIndex} = state || {};

    if (!active) return { ...state };
    const index = loginToIndex[active];
    const newList = list;
    newList[index].workMode = workMode;

    return ({
      ...state,
      list: newList,
    });
  }

  handleSetUserError = ({ state, action }) => {
    const {payload: {error} = {}} = action || {};
    return ({
      ...state,
      error,
    });
  }

  handleSetUser = ({ state, action }) => {
    const {payload: {login} = {}} = action || {};
    return ({
      ...state,
      active: login
    });
  }

  handleSetUsers = ({ state, action }) => {
    const {payload: {list} = {}} = action || {};
    const loginToIndex = {};
    list.forEach((item, index) => {
      loginToIndex[item.login] = index;
    });

    return ({
      ...state,
      list,
      loginToIndex
    });
  }
}

export default new UserReducer().produceReducer(initialState);
