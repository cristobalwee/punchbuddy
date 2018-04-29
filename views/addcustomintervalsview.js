import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, Alert, AsyncStorage, FlatList, AlertIOS } from 'react-native';
import { Font } from 'expo';

import styles from '../styles.js';
import WorkoutCard from '../components/workoutcard.js';
import MenuItem from '../components/menuitem.js';
import IntervalItem from '../components/intervalitem.js';
import WorkoutDrawer from '../components/workoutdrawer.js';
import Data from '../data.json';

// https://github.com/bamlab/react-native-image-header-scroll-view

class AddCustomIntervalsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      name: "My Workout",
      interval_name: "Work",
      intervals: 12,
      workout: [],
      total_length: 0,
      interval_info: "Let's get sweaty",
      myWorkouts: []
    };
  }

  async componentDidMount() {
    let workouts = [{
      "name": "Warmup",
      "description": "Take a few seconds to get focused and ready.",
      "length": 10
    }];
    let length = 10;
    for (let i = 0; i < this.state.intervals; i++) {
      workouts.push({
        "name": "Interval " + (i + 1),
        "description": "This is interval " + (i + 1),
        "length": 30
      });
      length += 30;
    };
    this.setState({ workout: workouts,  total_length: length});

    let data = null;
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:workouts');
      if (value !== null){
        data = JSON.parse(value);
        if (Array.isArray(data)) {
          this.setState({ myWorkouts: data });
        }
      }
    } catch (error) {
      console.log(error);
    }

    await Font.loadAsync({
      'cubano-regular': require('../assets/fonts/cubano-regular-webfont.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    displayTime = (time) => {
      if (time/60 < 1) {
        if (time < 10) {
          return ("00:0" + time);
        }
        return ("00:" + time);
      } else {
        if (time % 60 === 0) {
          if (time/60 < 10) {
            return ("0" + time/60 + ":00");
          }
          return (time/60 + ":00");
        }

        const difference = (time/60) - Math.floor(time/60);
        const diffMin = Math.round(difference * 60);
        if (time/60 < 10) {
          if (diffMin < 10) {
            return ("0" + Math.round(time/60) + ":0" + diffMin);
          }
          return ("0" + Math.round(time/60) + ":" + diffMin);
        }
        if (diffMin < 10) {
          return (Math.round(time/60) + ":0" + diffMin);
        }
        return (Math.round(time/60) + ":" + diffMin);
      }
    }

    renderIntervals = () => {
      return this.state.workout.map((item, i) => (
        <View key={i} style={{marginBottom: 10}}>
          <Text style={{fontFamily: 'cubano-regular', fontSize: 16, marginBottom: 15}}>Interval {i + 1}</Text>
          <MenuItem
            title={"Interval Name"}
            subtitle={item.name}
            callback={(text) => {
              let tempWorkout = this.state.workout;
              tempWorkout[i].name = text;
              this.setState({ workout: tempWorkout });
            }} />
          <MenuItem
            title={"Interval Length"}
            subtitle={displayTime(item.length)}
            callback={(text) => {
              let tempWorkout = this.state.workout;
              let length = this.state.total_length;
              tempWorkout[i].length = text;
              length += text;
              this.setState({ workout: tempWorkout, total_length: length });
            }} />
          <MenuItem
            title={"Interval Info"}
            info={item.description}
            callback={(text) => {
              let tempWorkout = this.state.workout;
              tempWorkout[i].description = text;
              this.setState({ workout: tempWorkout });
            }} />
        </View>
      ));
    }

    const { params } = this.props.navigation.state;
    if (!this.state.fontLoaded) {
      return <Text>Loading</Text>
    }

    return (
      <View style={styles.container}>
        <ScrollView contentInsetAdjustmentBehavior={"always"} style={styles.profileview}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15}}>
            <TouchableHighlight
              underlayColor={'#fff'}
              onPress={() => this.props.navigation.goBack(null)}>
              <Image
                source={require('../assets/back_icon.png')}
                style={{width: 9, height: 15}}
              />
            </TouchableHighlight>
            <Text style={{fontFamily: 'cubano-regular', fontSize: 16}}>Add Custom Workout</Text>
            <Text style={{fontFamily: 'quicksand-light', fontSize: 14}}></Text>
          </View>
          <Text style={{fontFamily: 'cubano-regular', fontSize: 16, marginBottom: 15}}>Custom Intervals</Text>
          <MenuItem
            title={"Name"}
            subtitle={this.state.name}
            callback={(text) => {
              this.setState({ name: text });
            }} />
          <MenuItem
            title={"Intervals"}
            subtitle={this.state.intervals}
            callback={(text) => {
              this.setState({ intervals: text });
            }} />
          {renderIntervals()}
        </ScrollView>
        <View style={styles.addworkoutbutton}>
          <TouchableHighlight
            onPress={() => {
              Alert.alert(
                'Add workout',
                'Would you like to add this to your workouts?',
                [
                  {text: 'OK', onPress: () => {
                    console.log('OK Pressed');
                    let workout = {
                      "name": this.state.name,
                      "total_length": this.state.total_length,
                      "total_intervals": this.state.intervals,
                      "intervals": this.state.workout
                    }
                    this.state.myWorkouts.push(workout);
                    try {
                      AsyncStorage.setItem('@MySuperStore:workouts', JSON.stringify(this.state.myWorkouts));
                    } catch (error) {
                      console.log(error);
                    }
                    this.props.navigation.navigate('Home');
                  }},
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

export default AddCustomIntervalsView;
