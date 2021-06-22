import { Card, Paragraph, Title, TouchableRipple } from 'react-native-paper'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import StatCard from './StatCard'
import shortenNumber from '../helpers/shortenNumber'

export default function ListScreen() {

  const stats = useSelector(state => state.stats)
  const { global } = stats

  const navigation = useNavigation()
  
  return (
    <View>
      <TouchableRipple
        onPress={() => {
          navigation.navigate('Details', {
            country: global
          })
        }}
        rippleColor="rgba(0, 0, 0, .32)"
      >
        <StatCard style={{"marginBottom": 5}} title="Worldwide">
          <View>
            <Paragraph>Cases</Paragraph>
            <Title>{shortenNumber(global.TotalConfirmed)}</Title>
          </View>
          <View>
            <Paragraph>Recovered</Paragraph>
            <Title>{shortenNumber(global.TotalRecovered)}</Title>
          </View>
          <View>
            <Paragraph>Deaths</Paragraph>
            <Title>{shortenNumber(global.TotalDeaths)}</Title>
          </View>
      </StatCard>
      </TouchableRipple>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContent: {
    "flexDirection": "row",
    "justifyContent": "space-between",
  }
})