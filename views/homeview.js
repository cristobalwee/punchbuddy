import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Font } from 'expo';

import styles from '../styles.js';
import WorkoutCard from '../components/workoutcard.js';
import Navigation from '../components/navigation.js';

// https://stackoverflow.com/questions/39849648/horizontal-scrollview-snapping-react-native

class HomeView extends React.Component {
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
      <ScrollView contentInsetAdjustmentBehavior={"always"} style={{backgroundColor: "white"}}>
        <Text style={{fontFamily: 'cubano-regular', fontSize: 24}}>Home view</Text>
        <Text style={{fontFamily: 'quicksand-light', fontSize: 18}}>Sub view</Text>
      </ScrollView>
    );
  }
}

export default HomeView;
