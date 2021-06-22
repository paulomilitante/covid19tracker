import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, ToggleButton, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import { requestStats } from '../actions/stats'
import CompactScreen from './CompactScreen'
import ListScreen from './ListScreen'

export default function HomeScreen() {
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(requestStats())
  }, [dispatch])
  
  const stats = useSelector(state => state.stats)
  const { countries } = stats  
  
  const { colors } = useTheme()
  const navigation = useNavigation()

  const [toggleList, setToggleList] = useState(true)
  const toggle = () => setToggleList(!toggleList)
  const ToggleListButton = 
    <ToggleButton 
    icon={toggleList ? "view-list" : "view-compact"}  
    color={colors.white}
    onPress={toggle}
    />

  useEffect(() => {
    navigation.setOptions({
      title,
      headerRight: () => (ToggleListButton),
      headerTitleStyle: {
        color: colors.white,
      }
    }, [navigation])
  })

  const title = toggleList ? 'Highest Cases' : 'Global Cases'
  const DisplayList = toggleList ? <CompactScreen countries={countries} /> : <ListScreen countries={countries} />

  return (
    <View style={styles.container}>
      {!countries?.length &&
        (<ActivityIndicator 
          animating={true} 
          color={colors.primary} 
          style={styles.activityIndicator}
        />)
      }
      {countries?.length ?
        DisplayList
        : undefined
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    'flex': 1,
    'justifyContent': 'center',
  },  
  activityIndicator: {
    'flex': 1
  }
})
