import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { Font } from 'expo';

import styles from '../styles.js';

class IntervalBar extends React.Component {
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
      <View style={styles.intervalbar}>
        <View style={{backgroundColor: '#fff', borderRadius: 24, padding: 5, paddingLeft: 20, paddingRight: 20}}>
          <Text style={{fontFamily: 'cubano-regular', fontSize: 16, color: '#262626'}}>Info</Text>
        </View>
        <Text style={{fontFamily: 'cubano-regular', fontSize: 16, color: 'white'}}>Interval</Text>
        <Text style={{fontFamily: 'quicksand-light', fontSize: 14, color: 'white', paddingLeft: 20}}>Edit</Text>
      </View>
    );
  }
}

export default IntervalBar;
