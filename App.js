import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, SafeAreaView } from 'react-navigation';
import axios from 'axios';

import styles from './styles.js';
import HomeView from './views/homeview.js';
import ProfileView from './views/profile.js';
import TimerView from './views/timerview.js';
import WorkoutFocusView from './views/workoutfocus.js';

// https://github.com/corbt/react-native-keep-awake
// https://github.com/skevy/react-native-gsap-demo
// https://github.com/yaraht17/react-native-draggable-view
// https://medium.com/@chris.dascoli/how-to-deploy-a-create-react-native-app-to-the-appstore-229a8fa36fb1

// https://www.muscleandfitness.com/workouts/workout-routines/hiit-hard-impact-wrap-boxing-circuit
// https://www.muscleandfitness.com/muscle-fitness-hers/hers-workouts/30-min-heavy-bag-hiit-workout-0
// https://www.mensfitness.com/training/cardio/8-amazing-fat-burning-intervals
// https://www.bodybuilding.com/fun/a_totw24.htm
// https://www.gymboss.com/blog/boxing-interval-workout-program/
// https://www.mensfitness.com/training/workout-routines/train-boxer

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeView,
    },
    Profile: {
      screen: ProfileView,
    },
    Timer: {
      screen: TimerView
    },
    Focus: {
      screen: WorkoutFocusView
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
