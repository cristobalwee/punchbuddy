import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableHighlight, SafeAreaView, Alert } from 'react-native';
import { Font } from 'expo';

import styles from '../styles.js';
import WorkoutCard from '../components/workoutcard.js';
import IntervalBar from '../components/intervalbar.js';

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
};

class TimerView extends React.Component {
  constructor(props) {
    super(props);
    this.timer = 0;
    this.state = {
      fontLoaded: false,
      totalTime: 0,
      intervals: 0,
      currentInterval: 0,
      currentTime: 30,
      timeElapsed: 0,
      timeRemaining: 1440,
      locked: false,
      playing: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'cubano-regular': require('../assets/fonts/cubano-regular-webfont.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {
      return <Text>Loading</Text>
    }

    startTimer = () => {
      if (this.currentTime <= 0) {
        return;
      }
      this.timer = setInterval(countDown, 1000);
      this.setState({ playing: true });
    }

    countDown = () => {
      let seconds = this.state.currentTime - 1;
      let total = this.state.timeRemaining - 1;
      let elapsed = this.state.timeElapsed + 1;
      this.setState({
        currentTime: seconds,
        timeRemaining: total,
        timeElapsed: elapsed
      });

      if (seconds === 0) {
        clearInterval(this.timer);
        this.setState({ playing: false });
      }
    }

    stopTimer = () => {
      clearInterval(this.timer);
      this.setState({ playing: false });
    }

    renderLock = () => {
      if (this.state.locked) {
        return (
          <Image
            source={require('../assets/unlock_button.png')}
            style={{width: 24, height: 36, marginTop: 12}}
          />
        );
      }

      return (
        <Image
          source={require('../assets/lock_button.png')}
          style={{width: 24, height: 36, marginTop: 12}}
        />
      );
    }

    renderButton = () => {
      if (this.state.playing) {
        return (
          <Image
            source={require('../assets/pause_button.png')}
            style={{width: 64, height: 80, marginLeft: 12}}
          />
        );
      }

      return (
        <Image
          source={require('../assets/play_button.png')}
          style={{width: 66, height: 80, marginLeft: 12}}
        />
      );
    }

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
          return ("0" + Math.round(time/60) + ":" + diffMin);
        }
        return (Math.round(time/60) + ":" + diffMin);
      }
    }

    return (
      <View style={styles.container}>
        <ScrollView scrollEnabled={false} contentInsetAdjustmentBehavior={"always"} style={[styles.profileview, {position: 'relative', paddingLeft: 0, paddingRight: 0}]}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 25, paddingRight: 25}}>
            <TouchableHighlight
              underlayColor={'#fff'}
              onPress={() => {
                if (this.state.locked) {
                  return;
                }
                this.props.navigation.goBack(null)
              }}>
              <Image
                source={require('../assets/back_icon.png')}
                style={{width: 9, height: 15}}
              />
            </TouchableHighlight>
            <Text style={{fontFamily: 'cubano-regular', fontSize: 16}}>{workout.name}</Text>
            <Text style={{fontFamily: 'quicksand-light', fontSize: 14}}>Edit</Text>
          </View>
          <View style={styles.timercounter}>
            <Text style={{fontFamily: 'quicksand-light', fontSize: 108, textAlign: 'center'}}>{displayTime(this.state.currentTime)}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 25, paddingRight: 25}}>
            <TouchableHighlight
              underlayColor={'#fff'}
              onPress={() => {
                if (this.state.locked) {
                  return;
                }
                this.props.navigation.goBack(null);
              }}>
              <Image
                source={require('../assets/back_icon.png')}
                style={{width: 9, height: 15, marginTop: 6}}
              />
            </TouchableHighlight>
            <Text style={{fontFamily: 'quicksand-light', fontSize: 24}}>{workout.intervals[this.state.currentInterval].name}</Text>
            <TouchableHighlight
              underlayColor={'#fff'}
              onPress={() => {
                if (this.state.locked) {
                  return;
                }
                this.props.navigation.goBack(null);
              }}>
              <Image
                source={require('../assets/arrow_icon.png')}
                style={{width: 9, height: 15, marginTop: 6}}
              />
            </TouchableHighlight>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 25, paddingRight: 25}}>
            <Text style={{fontFamily: 'quicksand-light', fontSize: 16}}>00:{displayTime(this.state.timeElapsed)}</Text>
            <Text style={{fontFamily: 'quicksand-light', fontSize: 16}}>-00:{displayTime(this.state.timeRemaining)}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 35, paddingRight: 35, paddingTop: 100}}>
            <TouchableHighlight
              underlayColor={'#fff'}
              onPress={() => {
                let flag = this.state.locked;
                this.setState({ locked: !flag });
              }}>
              {renderLock()}
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={'#fff'}
              onPress={() => {
                if (this.state.locked) {
                  return;
                }
                if (this.state.playing) {
                  stopTimer();
                } else {
                  startTimer();
                }
              }}>
              {renderButton()}
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={'#fff'}
              onPress={() => {
                if (this.state.locked) {
                  return;
                }
                if (this.state.playing) {
                  stopTimer();
                }
                this.props.navigation.goBack(null);
              }}>
              <Image
                source={require('../assets/stop_button.png')}
                style={{width: 34, height: 34, marginTop: 14}}
              />
            </TouchableHighlight>
          </View>
        </ScrollView>
        <IntervalBar locked={this.state.locked} index={this.state.currentInterval} total={24} next={workout.intervals[this.state.currentInterval + 1].name} info={workout.intervals[0].description} />
      </View>
    );
  }
}

export default TimerView;
