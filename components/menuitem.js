import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, AlertIOS } from 'react-native';
import { Font } from 'expo';

import styles from '../styles.js';

class MenuItem extends React.Component {
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
        <TouchableHighlight
          underlayColor={'#fff'}
          onPress={() => {
            const info = this.props.info;
            AlertIOS.prompt(
              'Enter a value',
              info,
              (text) => {
                console.log("You entered " + text);
                this.props.callback(text);
              }
            );
          }}>
          <View style={{flex: 1, flexDirection: 'row', padding: 15}}>
            <View>
              <Text style={{fontFamily: 'quicksand-light', fontSize: 16}}>{this.props.title}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={{fontFamily: 'quicksand-light', fontSize: 16}}>{this.props.subtitle}</Text>
              <Image
                source={require('../assets/arrow_icon.png')}
                style={{width: 9, height: 15, marginLeft: 10, marginTop: 3}}
              />
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default MenuItem;
