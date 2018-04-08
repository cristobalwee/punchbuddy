import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Font } from 'expo';

import styles from '../styles.js';

class WorkoutCard extends React.Component {
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

    renderImage = () => {
      switch (this.props.type) {
        case 'boxing':
          return (
            <Image
              source={require('../assets/boxing.png')}
              style={{width: 303, height: 290, borderTopLeftRadius: 12, borderTopRightRadius: 12,}}
            />
          );
          break;
        case 'running':
          return (
            <Image
              source={require('../assets/running.png')}
              style={{width: 303, height: 290,}}
            />
          );
          break;
        case 'cycling':
          return (
            <Image
              source={require('../assets/cycling.png')}
              style={{width: 303, height: 290,}}
            />
          );
          break;
        case 'tabata':
          return (
            <Image
              source={require('../assets/tabata.png')}
              style={{width: 303, height: 290,}}
            />
          );
          break;
        case 'sparring':
          return (
            <Image
              source={require('../assets/sparring.png')}
              style={{width: 303, height: 290,}}
            />
          );
          break;
        case 'weights':
          return (
            <Image
              source={require('../assets/weights.png')}
              style={{width: 303, height: 290,}}
            />
          );
          break;
        default:
          return null;
          break;
      }
    }

    renderIcon = () => {
      switch (this.props.type) {
        case 'boxing':
          return (
            <Image
              source={require('../assets/boxing_icon.png')}
              style={{width: 17, height: 20, marginTop: 10, marginRight: 10}}
            />
          );
          break;
        case 'running':
          return (
            <Image
              source={require('../assets/running_icon.png')}
              style={{width: 19, height: 30, marginTop: 10, marginRight: 10}}
            />
          );
          break;
        case 'cycling':
          return (
            <Image
              source={require('../assets/cycling_icon.png')}
              style={{width: 25, height: 19, marginTop: 10, marginRight: 10}}
            />
          );
          break;
        case 'tabata':
          return (
            <Image
              source={require('../assets/tabata_icon.png')}
              style={{width: 18, height: 28, marginTop: 10, marginRight: 10}}
            />
          );
          break;
        case 'sparring':
          return (
            <Image
              source={require('../assets/sparring_icon.png')}
              style={{width: 48, height: 24, marginTop: 10, marginRight: 10}}
            />
          );
          break;
        case 'weights':
          return (
            <Image
              source={require('../assets/weights_icon.png')}
              style={{width: 28, height: 18, marginTop: 10, marginRight: 10}}
            />
          );
          break;
        default:
          return null;
          break;
      }
    }
    
    return (
      <View style={styles.workoutcard}>
        <View style={{width: 303, height: 290}}>
          {renderImage()}
        </View>
        <View style={{flex: 1, flexDirection: 'row', paddingTop: 20, paddingBottom: 20, paddingLeft: 15, paddingRight: 15}}>
          <View>
            <Text style={{fontFamily: 'cubano-regular', fontSize: 16}}>Boxing</Text>
            <Text style={{fontFamily: 'quicksand-light', fontSize: 16}}>10 Workouts</Text>
          </View>
          <View style={styles.badge}>
            {renderIcon()}
          </View>
        </View>
      </View>
    );
  }
}

export default WorkoutCard;
