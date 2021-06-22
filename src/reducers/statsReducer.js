import { GET_STATS } from '../actions/types'
import { SORT_BY_CASES } from '../actions/types'
import { SORT_BY_DEATHS } from '../actions/types'
import { SORT_BY_NAME } from '../actions/types'

const initialState = {
  global: {
    NewConfirmed: 0,
    TotalConfirmed: 0,
    NewDeaths: 0,
    TotalDeaths: 0,
    NewRecovered: 0,
    TotalRecovered: 0
  },
  countries: []
}

const statsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_STATS:
      return {
        ...state,
        global: action.payload.Global,
        countries: action.payload.Countries
      }
    case SORT_BY_CASES:
      return {
        ...state,
        countries: state.countries.slice().sort((x, y) => (
          x.TotalConfirmed < y.TotalConfirmed ? 1 : -1
        ))
      }
    case SORT_BY_NAME:
      return {
        ...state,
        countries: state.countries.slice().sort((x, y) => (
          x.Slug > y.Slug ? 1 : -1
        ))
      }
    case SORT_BY_DEATHS:
      return {
        ...state,
        countries: state.countries.slice().sort((x, y) => (
          x.TotalDeaths < y.TotalDeaths ? 1 : -1
        ))
      }
    default:
      return state
  }
}

export default statsReducer