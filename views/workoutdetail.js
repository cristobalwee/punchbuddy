import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, Alert, AsyncStorage } from 'react-native';
import { Font } from 'expo';

import styles from '../styles.js';
import WorkoutCard from '../components/workoutcard.js';
import MenuItem from '../components/menuitem.js';
import IntervalItem from '../components/intervalitem.js';
import WorkoutDrawer from '../components/workoutdrawer.js';
import Data from '../data.json';

// https://github.com/bamlab/react-native-image-header-scroll-view

class WorkoutDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      myWorkouts: []
    };
  }

  async componentDidMount() {
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
            <Text style={{fontFamily: 'cubano-regular', fontSize: 16}}>{params.workout.name}</Text>
            <Text style={{fontFamily: 'quicksand-light', fontSize: 14}}></Text>
          </View>
          {params.workout.intervals.map((item, i) => {
            return <IntervalItem key={i} title={i + 1 + '/' + params.workout.total_intervals} subtitle={item.name + ', ' + displayTime(item.length)} />
          })}
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
                    this.state.myWorkouts.push(params.workout);
                    try {
                      AsyncStorage.setItem('@MySuperStore:workouts', JSON.stringify(this.state.myWorkouts));
                    } catch (error) {
                      console.log(error);
                    }
                    this.props.navigation.navigate('Home');
                    // this.props.navigation.goBack(null);
                    // this.props.navigation.goBack(null);
                    // this.props.navigation.goBack(null);
                    // this.props.navigation.goBack(null);
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

export default WorkoutDetailView;
