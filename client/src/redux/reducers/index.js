import { combineReducers } from 'redux';
import user from './user';
import affixFilters from './affixFilters';

export default combineReducers({ user, affixFilters });
