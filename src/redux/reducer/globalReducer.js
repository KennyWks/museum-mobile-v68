import {english, indonesian} from '../../utils';
import ActionType from './globalActionType';

let globalState = {
  url: 'http://192.168.134.60:8083',
  languages: indonesian,
};

// Reducer
const rootReducer = (state = globalState, action) => {
  let value = action.option;
  if (action.type === ActionType.CHANGE_LANGUAGE && value === 'english') {
    globalState.languages = english;
  } else {
    globalState.languages = indonesian;
  }

  if (action.type === ActionType.CHANGE_SERVER) {
    globalState.url = value;
  }
  return state;
};

export default rootReducer;
