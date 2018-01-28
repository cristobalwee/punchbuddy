import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//https://github.com/corbt/react-native-keep-awake
//https://github.com/skevy/react-native-gsap-demo

//https://www.muscleandfitness.com/workouts/workout-routines/hiit-hard-impact-wrap-boxing-circuit
//https://www.muscleandfitness.com/muscle-fitness-hers/hers-workouts/30-min-heavy-bag-hiit-workout-0
//https://www.mensfitness.com/training/cardio/8-amazing-fat-burning-intervals
//https://www.bodybuilding.com/fun/a_totw24.htm
//https://www.gymboss.com/blog/boxing-interval-workout-program/
//https://www.mensfitness.com/training/workout-routines/train-boxer

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello there</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
