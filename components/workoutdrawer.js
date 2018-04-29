import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Animated, ScrollView, Platform, Dimensions, Easing, AsyncStorage } from 'react-native';
import { Font } from 'expo';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import styles from '../styles.js';
import ListItem from '../components/listitem.js';
import Data from '../data.json';

// https://goshakkk.name/react-native-animated-appearance-disappearance/

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class WorkoutDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      drawerOpen: false,
      animation: new Animated.Value(),
      fade: new Animated.Value(0),
      cardHeight: new Animated.Value(),
      myWorkouts: []
    };
  }

  async componentDidMount() {
    let data = null;
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:workouts');
      if (value !== null){
        data = JSON.parse(value);
        this.setState({ myWorkouts: data });
      }
    } catch (error) {
      console.log(error);
    }

    await Font.loadAsync({
      'cubano-regular': require('../assets/fonts/cubano-regular-webfont.ttf'),
      'quicksand-light': require('../assets/fonts/Quicksand-Light.ttf')
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

    renderList = () => {
      if (this.state.drawerOpen) {
        return (
          <View style={styles.drawercontents}>
            {this.state.myWorkouts.map((item, i) => (
              <ListItem key={i} title={item.name} subtitle={displayTime(item.total_length)} navigation={this.props.navigation} noshadow nextView={'Timer'} data={item} />
            ))}
          </View>
        );
      }

      return null;
    }

    if (!this.state.fontLoaded || this.state.myWorkouts === null) {
      return <Text>Loading</Text>
    }

    return (
      <Animated.View style={[styles.workoutdrawer, {height: this.state.animation}]}>
        <View style={{flex: 1, position: 'absolute', top: 10, left: '50%', justifyContent: 'center'}}>
          <TouchableHighlight
            underlayColor={'#262626'}
            style={{width: 39, height: 10}}
            onPress={() => {
              let flag = this.state.drawerOpen
              let initialValue = flag ? viewportHeight - 50 : 75;
              let finalValue = flag ? 75 : viewportHeight - 50;
              let cardInitialValue = flag ? 0 : 75;
              let cardFinalValue = flag ? 75 : 0;
              let fadeIn = flag ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 1)';

              this.setState({
                drawerOpen : !flag
              });

              this.state.animation.setValue(initialValue);
              Animated.spring(
                this.state.animation,
                {
                  toValue: finalValue,
                  duration: 400,
                  bounciness: 2
                }
              ).start();
            }}>
            <Image
              source={require('../assets/drawer_line.png')}
              style={{width: 39, height: 3}}
            />
          </TouchableHighlight>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View>
            <Text style={{fontFamily: 'cubano-regular', fontSize: 20, color: '#fff'}}>My Workouts</Text>
          </View>
          <View style={styles.badge}>
            <TouchableHighlight
              underlayColor={'#262626'}
              onPress={() => this.props.navigation.navigate('AddWorkout')}>
              <Image
                source={require('../assets/add_icon.png')}
                style={{width: 23, height: 23}}
              />
            </TouchableHighlight>
          </View>
        </View>
        {renderList()}
      </Animated.View>
    );
  }
}

export default WorkoutDrawer;
