import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { Font } from 'expo';

import styles from '../styles.js';

class IntervalItem extends React.Component {
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
      <View style={styles.listitem}>
        <View style={{flex: 1, flexDirection: 'row', padding: 15}}>
          <View>
            <Text style={{fontFamily: 'cubano-regular', fontSize: 16}}>{this.props.title}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={{fontFamily: 'quicksand-light', fontSize: 16}}>{this.props.subtitle}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default IntervalItem;
