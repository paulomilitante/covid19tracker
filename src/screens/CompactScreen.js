import { Paragraph, Title, TouchableRipple } from 'react-native-paper'
import React, { useEffect, useCallback, useState } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import StatCard from '../components/StatCard'
import shortenNumber from '../helpers/shortenNumber'
import { useDispatch } from 'react-redux'
import { requestStats, sortByCases } from '../actions/stats'

export default function CompactScreen(props) {

  const { countries } = props
  const navigation = useNavigation()
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(sortByCases())
  }, [dispatch])

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    dispatch(requestStats()).then(() => setRefreshing(false))
  },[dispatch])

  return (
    <ScrollView 
      style={{"backgroundColor": "darkgrey"}}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {countries.slice(0, 10).map((country, index) => (
        <TouchableRipple
          key={index}
          onPress={() => {
            navigation.navigate('Details', {
              country
            })
          }}
          rippleColor="rgba(0, 0, 0, .32)"
        > 
          <StatCard style={{"marginBottom": 5}} title={country.Country} code={country.CountryCode}>
            <View>
              <Paragraph>Cases</Paragraph>
              <Title>{shortenNumber(country.TotalConfirmed)}</Title>
            </View>
            <View>
              <Paragraph>Recovered</Paragraph>
              <Title>{shortenNumber(country.TotalRecovered)}</Title>
            </View>
            <View>
              <Paragraph>Deaths</Paragraph>
              <Title>{shortenNumber(country.TotalDeaths)}</Title>
            </View>
          </StatCard>
        </TouchableRipple>
      ))}
    </ScrollView>
  )
}