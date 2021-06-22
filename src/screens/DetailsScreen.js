import React, { useEffect, useCallback, useState } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Paragraph, Title } from 'react-native-paper'

import { requestCountryStats, clearCountryStats } from '../actions/countryStats'
import convertDate from '../helpers/convertDate'
import StatCard from '../components/StatCard'
import StatChart from '../components/StatChart'
import shortenNumber from '../helpers/shortenNumber'

export default function DetailsScreen(props) {

  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      title
    }, [navigation])
  })

  const countryStats = useSelector(state => state.countryStats)
  const { country } = props.route.params
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(requestCountryStats(country.Slug))
    return () => dispatch(clearCountryStats())
  }, [dispatch])

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    dispatch(requestCountryStats(country.Slug)).then(() => setRefreshing(false))
  },[dispatch])
  
  const chartData = []
  countryStats.stats.map(stat => {
    chartData.push(stat.Confirmed)
  })

  const title = country.Country ? country.Country : 'Worldwide'
  const code = country.CountryCode ? country.CountryCode : undefined
  
  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <StatCard style={{"marginBottom": 5}} title={title} code={code}>
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
      <StatCard style={{"marginBottom": 10}} subtitle={`New (${convertDate(country.Date)})`}>
          <View>
            <Paragraph>Cases</Paragraph>
            <Title>{shortenNumber(country.NewConfirmed)}</Title>
          </View>
          <View>
            <Paragraph>Recovered</Paragraph>
            <Title>{shortenNumber(country.NewRecovered)}</Title>
          </View>
          <View>
            <Paragraph>Deaths</Paragraph>
            <Title>{shortenNumber(country.NewDeaths)}</Title>
          </View>
      </StatCard>
      {country.Country && countryStats &&
        (<Card>
          <Card.Title title={'Covid-19 Cases Growth Rate'} />
          <StatChart
            dataset={chartData}
          />
        </Card>)
      }
    </ScrollView>
  )
}
