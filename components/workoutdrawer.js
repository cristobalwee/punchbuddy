import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Font } from 'expo';

import styles from '../styles.js';

class WorkoutDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'cubano-regular': require('../assets/fonts/cubano-regular-webfont.ttf'),
      'quicksand-light': require('../assets/fonts/Quicksand-Light.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {
      return <Text>Loading</Text>
    }

    return (
      <View style={styles.workoutdrawer}>
        <View style={{flex: 1, position: 'absolute', top: 10, left: '50%', justifyContent: 'center'}}>
          <Image
            source={require('../assets/drawer_line.png')}
            style={{width: 39, height: 3}}
          />
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
      </View>
    );
  }
}

export default WorkoutDrawer;
