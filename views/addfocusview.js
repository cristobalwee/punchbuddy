import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, Dimensions } from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { Font } from 'expo';

import styles from '../styles.js';
import WorkoutCard from '../components/workoutcard.js';
import MenuItem from '../components/menuitem.js';
import ListItem from '../components/listitem.js';
import Data from '../data.json';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

// https://github.com/bamlab/react-native-image-header-scroll-view

class AddFocusView extends React.Component {
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
    let img = null;
    switch (params.type) {
      case 'boxing':
        img = require('../assets/boxing.png');
        break;
      case 'running':
        img = require('../assets/running.png')
        break;
      case 'cycling':
        img = require('../assets/cycling.png')
        break;
      case 'bodyweight':
        img = require('../assets/bodyweight.png')
        break;
      case 'sparring':
        img = require('../assets/sparring.png')
        break;
      case 'weights':
        img = require('../assets/weights.png')
        break;
      default:
        break;
    };

    return (
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
          <Text style={{fontFamily: 'cubano-regular', fontSize: 16}}>{params.workout}</Text>
          <Text style={{fontFamily: 'quicksand-light', fontSize: 14}}></Text>
        </View>
        {Data[params.idx].workouts.map((item, i) => (
          <ListItem key={i} title={item.name} subtitle={displayTime(item.total_length)} navigation={this.props.navigation} nextView={'Detail'} data={item} />
        ))}
      </ScrollView>
    );
  }
}

export default AddFocusView;
