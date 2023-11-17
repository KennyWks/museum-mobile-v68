import {english, indonesian} from '../../utils';
import ActionType from './globalActionType';

let globalState = {
  // url: 'http://192.168.103.60:8083',
  // path: '',
  // image: '',
  url: 'http://192.168.18.23',
  path: '/mweb/public',
  image: '/museum/files/Motif',
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
