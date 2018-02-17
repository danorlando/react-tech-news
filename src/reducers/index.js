import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { navigationReducer} from './navigationReducer';

const rootReducer = combineReducers({
  navigationReducer,
  router: routerReducer
});

export default rootReducer;
