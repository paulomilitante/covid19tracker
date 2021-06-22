import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card } from 'react-native-paper'
import Flag from 'react-native-flags-kit'


export default function StatCard(props) {

  return (
    <View>
      <Card style={props.style}>
        <Card.Title 
          title={props.title} 
          subtitle={props.subtitle} 
          left={ props.code ? 
            () => <Flag type="flat" code={props.code} size={32} /> 
            : undefined
          } 
        />
        <Card.Content style={styles.cardContent}>
          {props.children}
        </Card.Content>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContent: {
    "flexDirection": "row",
    "justifyContent": "space-between",
    "marginBottom": 10
  }
})