import ObserverFactory from '../redux/observer';
import {
  // A_OPERATOR_ERROR,
  A_OPERATOR_UPDATE,
  A_OPERATOR_SET_LIST,
} from '../actions/operator';

const initialState = {
  list: {},
  error: null,
};

class OperatorReducer extends ObserverFactory {
  constructor() {
    super();
    this.registerHandlers();
  }

  registerHandlers() {
    // this.on(A_OPERATOR_ERROR, this.handleSetUserError.bind(this));
    this.on(A_OPERATOR_SET_LIST, this.handleSetOperators.bind(this));
    this.on(A_OPERATOR_UPDATE, this.handleUpdateOperator.bind(this));
  }

  handleUpdateOperator = ({ state, action }) => {
    const {
      payload: {
        id,
        data,
      } = {},
    } = action || {};
    const {list} = state || {};

    return ({
      ...state,
      list: {
        ...list,
        [id]: data
      },
    });
  }

  handleSetOperators = ({ state, action }) => {
    const {payload: {list} = {}} = action || {};

    if (!list) {
      return {
        ...state,
        list
      }
    }
    const newList = {};
    list.forEach((item, index) => {
      newList[item.id] = item;
    });

    return ({
      ...state,
      list: newList,
    });
  }
}

export default new OperatorReducer().produceReducer(initialState);
