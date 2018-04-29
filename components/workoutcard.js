import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
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
    let index = 0;
    if (!this.state.fontLoaded) {
      return <Text>Loading</Text>
    }

    renderImage = () => {
      switch (this.props.type) {
        case 'boxing':
          index = 1;
          return (
            <Image
              source={require('../assets/boxing.png')}
              style={styles.cardimage}
            />
          );
          break;
        case 'running':
          return (
            <Image
              source={require('../assets/running.png')}
              style={styles.cardimage}
            />
          );
          break;
        case 'cycling':
          index = 4;
          return (
            <Image
              source={require('../assets/cycling.png')}
              style={styles.cardimage}
            />
          );
          break;
        case 'bodyweight':
          index = 2;
          return (
            <Image
              source={require('../assets/bodyweight.png')}
              style={styles.cardimage}
            />
          );
          break;
        case 'sparring':
          index = 3;
          return (
            <Image
              source={require('../assets/sparring.png')}
              style={styles.cardimage}
            />
          );
          break;
        case 'weights':
          index = 5;
          return (
            <Image
              source={require('../assets/weights.png')}
              style={styles.cardimage}
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
        case 'bodyweight':
          return (
            <Image
              source={require('../assets/bodyweight_icon.png')}
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
        <TouchableHighlight
          underlayColor={'#fff'}
          onPress={() => this.props.navigation.navigate('Focus', {type: this.props.type, idx: index})}>
          <View>
            <View style={styles.imagecontainer}>
              {renderImage()}
            </View>
            <View style={{flex: 1, flexDirection: 'row', paddingTop: 20, paddingBottom: 20, paddingLeft: 15, paddingRight: 15}}>
              <View>
                <Text style={{fontFamily: 'cubano-regular', fontSize: 16}}>{this.props.type}</Text>
                <Text style={{fontFamily: 'quicksand-light', fontSize: 16}}>10 Workouts</Text>
              </View>
              <View style={styles.badge}>
                {renderIcon()}
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default WorkoutCard;
