import baseAPI from '../network'

import { GET_COUNTRY_STATS } from './types'
import { CLEAR_COUNTRY_STATS } from './types'

export const getCountryStats = countryStats => (
  {
    type: GET_COUNTRY_STATS,
    payload: countryStats
  }
)

export const clearCountryStats = () => (
  {
    type: CLEAR_COUNTRY_STATS
  }
)

export const requestCountryStats= slug => {
  return async (dispatch) => {
    try {
      const res = await baseAPI.get(`/total/dayone/country/${slug}`)
      dispatch(getCountryStats(res.data))
    } 
    catch(error) {
      console.log(error)
    }
  }
}