import {  Button, DataTable, TouchableRipple } from 'react-native-paper'
import React, { useState, useCallback } from 'react'
import { RefreshControl, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import WorldData from '../components/WorldData'
import shortenNumber from '../helpers/shortenNumber'
import { useDispatch } from 'react-redux'
import { requestStats, sortByName, sortByCases, sortByDeaths } from '../actions/stats'

export default function ListScreen(props) {

  const [refreshing, setRefreshing] = useState(false)
  const dispatch = useDispatch()
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    dispatch(requestStats()).then(() => setRefreshing(false))
  },[dispatch])

  const navigation = useNavigation()
  
  const [toggleAll, setToggleAll] = useState(false)
  const toggle = () => setToggleAll(true)
  
  const { countries } = props
  const listSize = toggleAll ? countries.length -1 : 10
  

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <WorldData />
      <DataTable>
        <DataTable.Header>
          <TouchableOpacity onPress={() => dispatch(sortByName())} style={{'flex': 1}} >
            <DataTable.Title>Country</DataTable.Title>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(sortByCases())} style={{'flex': 1}} >
            <DataTable.Title numeric>Total Cases</DataTable.Title>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(sortByDeaths())} style={{'flex': 1}} >
            <DataTable.Title numeric>Total Deaths</DataTable.Title>
          </TouchableOpacity>
        </DataTable.Header>
          {countries.slice(0, listSize).map((country, index) => (
            <TouchableRipple
              key={index}
              onPress={() => {
                navigation.navigate('Details', {
                  country
                })
              }}
              rippleColor="rgba(0, 0, 0, .32)"
            >
              <DataTable.Row >
                <DataTable.Cell>{country.Country}</DataTable.Cell>
                <DataTable.Cell numeric>{shortenNumber(country.TotalConfirmed)}</DataTable.Cell>
                <DataTable.Cell numeric>{shortenNumber(country.TotalDeaths)}</DataTable.Cell>
              </DataTable.Row>
            </TouchableRipple>
          ))}  
      </DataTable>
      {!toggleAll && 
        (<Button style={{'paddingBottom': 10}} onPress={toggle}>See All</Button>)
      }
    </ScrollView>
  )
}