import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { LineChart, Grid, YAxis } from 'react-native-svg-charts'
import { ActivityIndicator, useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'

import shortenNumber from '../helpers/shortenNumber'


export default function StatChart(props) {

  const { colors } = useTheme()

  const countryStats = useSelector(state => state.countryStats)
  const { stats } = countryStats

  const contentInset = { top: 10, bottom: 20 }

  return (
    <View style={styles.container}>
      {!stats.length &&
        (<ActivityIndicator 
          animating={true} 
          color={colors.primary} 
          style={styles.activityIndicator}
        />)
      }
      {stats.length ?
        (<>
          <YAxis
            data={props.dataset}
            contentInset={contentInset}
            style={{'marginLeft': 15}}
            svg={{
                fill: 'grey',
                fontSize: 10,
            }}
            numberOfTicks={5}
            formatLabel={value => shortenNumber(value)}
          />
          <LineChart
            style={{ height: 200, width: Dimensions.get("window").width * 0.85 }}
            data={props.dataset}
            svg={{ stroke: colors.primary }}
            contentInset={contentInset}
          >
            <Grid />
          </LineChart>
        </>)
        : undefined
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    'height': 200,
    'flexDirection': 'row',
  },  
  activityIndicator: {
    'flex': 1
  }
})