import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image } from 'react-native';
import { Font } from 'expo';

import styles from '../styles.js';
import WorkoutCard from '../components/workoutcard.js';
import MenuItem from '../components/menuitem.js';
import ListItem from '../components/listitem.js';

const types = ['running', 'boxing', 'bodyweight', 'sparring', 'cycling', 'weights'];

class AddPresetView extends React.Component {
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
    const { params } = this.props.navigation.state;
    if (!this.state.fontLoaded) {
      return <Text>Loading</Text>
    }

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
          <Text style={{fontFamily: 'cubano-regular', fontSize: 16}}>Add Preset Workout</Text>
          <Text style={{fontFamily: 'quicksand-light', fontSize: 14}}></Text>
        </View>
        {types.map((item, i) => (
          <ListItem key={i} title={item} subtitle={'Pick from a variety of preset workouts'} navigation={this.props.navigation} nextView={'AddFocus'} data={item} index={i} />
        ))}
      </ScrollView>
    );
  }
}

export default AddPresetView;
