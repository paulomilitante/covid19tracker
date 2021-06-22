import { combineReducers } from 'redux'
import stats from './statsReducer'
import countryStats from './countryStatsReducer'

const reducers = {
  stats,
  countryStats
}

const rootReducer = combineReducers(reducers)

export default rootReducer