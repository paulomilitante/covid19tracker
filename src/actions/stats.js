import baseAPI from '../network'

import { GET_STATS } from './types'
import { SORT_BY_CASES } from './types'
import { SORT_BY_NAME } from './types'
import { SORT_BY_DEATHS } from './types'

export const getStats = stats => (
  {
    type: GET_STATS,
    payload: stats
  }
)

export const sortByCases = () => (
  {
    type: SORT_BY_CASES
  }
)

export const sortByName = () => (
  {
    type: SORT_BY_NAME
  }
)

export const sortByDeaths = () => (
  {
    type: SORT_BY_DEATHS
  }
)

export const requestStats = () => {
  return async (dispatch) => {
    try {
      const res = await baseAPI.get('/summary')
      dispatch(getStats(res.data))
      dispatch(sortByCases())
    }
    catch (error) {
      console.log(error)
    }
  }
}