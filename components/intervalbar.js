import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Alert } from 'react-native';
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

    const info = this.props.info;

    return (
      <View style={styles.intervalbar}>
        <TouchableHighlight
          underlayColor={'#262626'}
          onPress={() => {
            if (this.props.locked) {
              return;
            }
            Alert.alert("Interval info", info)
          }}>
          <View style={{backgroundColor: '#fff', borderRadius: 24, padding: 5, paddingLeft: 20, paddingRight: 20, marginTop: 5, marginBottom: 5}}>
            <Text style={{fontFamily: 'cubano-regular', fontSize: 16, color: '#262626'}}>Info</Text>
          </View>
        </TouchableHighlight>
        <View style={{flex: 1, flexDirection: 'column', marginLeft: 40}}>
          <Text style={{fontFamily: 'cubano-regular', fontSize: 16, color: 'white', textAlign: 'center'}}>Interval</Text>
          <Text style={{fontFamily: 'quicksand-light', fontSize: 16, color: 'white', textAlign: 'center'}}>{this.props.index + 1}/{this.props.total}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'column', marginLeft: 40}}>
          <Text style={{fontFamily: 'cubano-regular', fontSize: 16, color: 'white', textAlign: 'center'}}>Up next</Text>
          <Text style={{fontFamily: 'quicksand-light', fontSize: 16, color: 'white', textAlign: 'center'}}>{this.props.next}</Text>
        </View>
      </View>
    );
  }
}

export default IntervalBar;
