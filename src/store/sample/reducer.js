import { initialState } from './state';
import { SAMPLE } from './actionType';

export default (state = initialState, action) => {
  switch (action.type) {
    case SAMPLE:
      return state;

    default:
      return state;
  }
};
