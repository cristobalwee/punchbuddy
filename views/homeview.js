import React from 'react';
import { FlatList, Text, View, ScrollView, Image } from 'react-native';
import { Font } from 'expo';

import styles from '../styles.js';
import WorkoutCard from '../components/workoutcard.js';
import ListItem from '../components/listitem.js';
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
    const sports = ['boxing', 'running', 'cycling', 'tabata', 'sparring', 'weights'];
    if (!this.state.fontLoaded) {
      return <Text>Loading</Text>
    }

    return (
      <ScrollView contentInsetAdjustmentBehavior={"always"} style={styles.homeview}>
        <View style={{flex: 1, flexDirection: 'row', marginBottom: 20}}>
          <Text style={{fontFamily: 'cubano-regular', fontSize: 32}}>Home</Text>
          <View style={styles.badge}>
            <Image
              source={require('../assets/profile_icon.png')}
              style={{width: 32, height: 32}}
            />
          </View>
        </View>
        <WorkoutCard type={'boxing'}/>
        <Text style={{fontFamily: 'cubano-regular', fontSize: 20, marginTop: 25, marginBottom: 15}}>Popular Workouts</Text>
        <ListItem title={'Boxing - Intermediate'} subtitle={'48:20'} />
      </ScrollView>
    );
  }
}

export default HomeView;
