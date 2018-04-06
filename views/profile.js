import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Font } from 'expo';

import styles from '../styles.js';
import WorkoutCard from '../components/workoutcard.js';
import Navigation from '../components/navigation.js';

class ProfileView extends React.Component {
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
    if (!this.state.fontLoaded) {
      return <Text>Loading</Text>
    }

    return (
      <View>
        <Text style={{fontFamily: 'cubano-regular', fontSize: 24}}>Profile view</Text>
      </View>
    );
  }
}

export default ProfileView;
