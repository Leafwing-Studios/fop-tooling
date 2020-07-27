import { combineReducers } from 'redux';
import user from './user';
import affixFilters from './affixFilters';
import globalAlert from './globalAlert';

export default combineReducers({ user, affixFilters, globalAlert });
