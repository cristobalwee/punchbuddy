import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, Alert } from 'react-native';
import { Font } from 'expo';

import styles from '../styles.js';
import WorkoutCard from '../components/workoutcard.js';
import MenuItem from '../components/menuitem.js';
import IntervalItem from '../components/intervalitem.js';
import WorkoutDrawer from '../components/workoutdrawer.js';

// https://github.com/bamlab/react-native-image-header-scroll-view

const workout = {
  "name": "Running - Intermediate",
  "total_length": 1440,
  "total_intervals": 24,
  "intervals" : [
    {
      "name": "Warmup",
      "description": "Warmup: take a few seconds to get focused and ready.",
      "length": 30
    },
    {
      "name": "Sprint",
      "description": "Sprint: run as fast as possible for the alotted time.",
      "length": 30
    },
    {
      "name": "Rest",
      "description": "Rest: rest for the alotted time, remember to take deep breaths.",
      "length": 30
    },
    {
      "name": "Sprint",
      "description": "Sprint: run as fast as possible for the alotted time.",
      "length": 30
    },
    {
      "name": "Rest",
      "description": "Rest: rest for the alotted time, remember to take deep breaths.",
      "length": 30
    },
    {
      "name": "Sprint",
      "description": "Sprint: run as fast as possible for the alotted time.",
      "length": 30
    },
    {
      "name": "Rest",
      "description": "Rest: rest for the alotted time, remember to take deep breaths.",
      "length": 30
    },
    {
      "name": "Sprint",
      "description": "Sprint: run as fast as possible for the alotted time.",
      "length": 30
    },
    {
      "name": "Rest",
      "description": "Rest: rest for the alotted time, remember to take deep breaths.",
      "length": 30
    },
    {
      "name": "Sprint",
      "description": "Sprint: run as fast as possible for the alotted time.",
      "length": 30
    },
    {
      "name": "Rest",
      "description": "Rest: rest for the alotted time, remember to take deep breaths.",
      "length": 30
    },
    {
      "name": "Sprint",
      "description": "Sprint: run as fast as possible for the alotted time.",
      "length": 30
    },
    {
      "name": "Rest",
      "description": "Rest: rest for the alotted time, remember to take deep breaths.",
      "length": 30
    },
    {
      "name": "Sprint",
      "description": "Sprint: run as fast as possible for the alotted time.",
      "length": 30
    },
    {
      "name": "Rest",
      "description": "Rest: rest for the alotted time, remember to take deep breaths.",
      "length": 30
    },
    {
      "name": "Sprint",
      "description": "Sprint: run as fast as possible for the alotted time.",
      "length": 30
    },
    {
      "name": "Rest",
      "description": "Rest: rest for the alotted time, remember to take deep breaths.",
      "length": 30
    },
    {
      "name": "Sprint",
      "description": "Sprint: run as fast as possible for the alotted time.",
      "length": 30
    },
    {
      "name": "Rest",
      "description": "Rest: rest for the alotted time, remember to take deep breaths.",
      "length": 30
    },
    {
      "name": "Sprint",
      "description": "Sprint: run as fast as possible for the alotted time.",
      "length": 30
    },
    {
      "name": "Rest",
      "description": "Rest: rest for the alotted time, remember to take deep breaths.",
      "length": 30
    },
    {
      "name": "Sprint",
      "description": "Sprint: run as fast as possible for the alotted time.",
      "length": 30
    },
    {
      "name": "Rest",
      "description": "Rest: rest for the alotted time, remember to take deep breaths.",
      "length": 30
    },
    {
      "name": "Sprint",
      "description": "Sprint: run as fast as possible for the alotted time.",
      "length": 30
    }
  ]
}

class WorkoutDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'cubano-regular': require('../assets/fonts/cubano-regular-webfont.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    const { params } = this.props.navigation.state;
    if (!this.state.fontLoaded) {
      return <Text>Loading</Text>
    }

    return (
      <View style={styles.container}>
        <ScrollView contentInsetAdjustmentBehavior={"always"} style={styles.profileview}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25}}>
            <TouchableHighlight
              underlayColor={'#fff'}
              onPress={() => this.props.navigation.goBack(null)}>
              <Image
                source={require('../assets/back_icon.png')}
                style={{width: 9, height: 15}}
              />
            </TouchableHighlight>
            <Text style={{fontFamily: 'cubano-regular', fontSize: 16}}>Workout Detail</Text>
            <Text style={{fontFamily: 'quicksand-light', fontSize: 14}}></Text>
          </View>
          {workout.intervals.map((item, i) => {
            return <IntervalItem key={i} title={i + 1 + '/' + workout.total_intervals} subtitle={item.name + ', 00:' + item.length} />
          })}
        </ScrollView>
        <View style={styles.addworkoutbutton}>
          <TouchableHighlight
            onPress={() => {
              Alert.alert(
                'Add workout',
                'Would you like to add this to your workouts?',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
                ]
              );
            }}>
            <Text style={{fontFamily: 'cubano-regular', fontSize: 16, color: '#fff', textAlign: 'center'}}>
              <Image
                source={require('../assets/add_icon.png')}
                style={{width: 18, height: 18, marginTop: 3}}
              />
              &nbsp;
              Add to my Workouts
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default WorkoutDetailView;
