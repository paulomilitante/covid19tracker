import { GET_COUNTRY_STATS } from '../actions/types'
import { CLEAR_COUNTRY_STATS } from '../actions/types'

const initialState = {
  stats: []
}

const countryStatsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_COUNTRY_STATS:
      return {
        ...state,
        stats: action.payload
      }
    case CLEAR_COUNTRY_STATS:
      return {
        stats: []
      }
    default:
      return state
  }
}

export default countryStatsReducer