import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Animated, ScrollView } from 'react-native';
import { Font } from 'expo';

import styles from '../styles.js';

class WorkoutDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      drawerOpen: false,
      animation: new Animated.Value()
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'cubano-regular': require('../assets/fonts/cubano-regular-webfont.ttf'),
      'quicksand-light': require('../assets/fonts/Quicksand-Light.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  animateTo() {

  }

  render() {
    if (!this.state.fontLoaded) {
      return <Text>Loading</Text>
    }

    // if (this.state.drawerOpen) {
    //   drawerStyle = {
    //     height: this.state.animation,
    //     position: 'absolute',
    //     left: 10,
    //     right: 10,
    //     top: 40,
    //     padding: 20,
    //     borderRadius: 12,
    //     backgroundColor: '#262626'
    //   }
    // }

    return (
      <Animated.View style={[styles.workoutdrawer, {height: this.state.animation}]}>
        <View style={{flex: 1, position: 'absolute', top: 10, left: '50%', justifyContent: 'center'}}>
          <TouchableHighlight
            style={{width: 39, height: 10}}
            onPress={() => {
              console.log("pressed");
              let flag = this.state.drawerOpen
              let initialValue = flag ? 200 : 75;
              let finalValue = flag ? 75 : 200;

              this.setState({
                drawerOpen : !flag
              });

              this.state.animation.setValue(initialValue);
              Animated.spring(
                this.state.animation,
                {
                  toValue: finalValue
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
            <Image
              source={require('../assets/add_icon.png')}
              style={{width: 23, height: 23}}
            />
          </View>
        </View>
        {
          // <ScrollView>
          //   <View style={{justifyContent: 'center', borderRadius: 8, backgroundColor: '#fff', flex: 1}}>
          //     <Text style={{fontFamily: 'cubano-regular', fontSize: 20}}>Let's Get Sweaty</Text>
          //     <Text style={{fontFamily: 'quicksand-light', fontSize: 16}}>Tap the add button to add a workout</Text>
          //   </View>
          // </ScrollView>
        }
      </Animated.View>
    );
  }
}

export default WorkoutDrawer;
