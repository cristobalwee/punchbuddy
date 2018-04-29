import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image } from 'react-native';
import { Font } from 'expo';

import styles from '../styles.js';
import WorkoutCard from '../components/workoutcard.js';
import MenuItem from '../components/menuitem.js';
import ListItem from '../components/listitem.js';

class AddCustomView extends React.Component {
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
          <Text style={{fontFamily: 'cubano-regular', fontSize: 16}}>Add Custom Workout</Text>
          <Text style={{fontFamily: 'quicksand-light', fontSize: 14}}></Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../assets/intervals_icon.png')}
            style={{width: 124, height: 124, marginBottom: 25}}
          />
        </View>
        <Text style={{fontFamily: 'cubano-regular', fontSize: 22, textAlign: 'center', marginBottom: 25}}>Interval Structure</Text>
        <ListItem title={'Standard'} subtitle={'All intervals are of same length'} navigation={this.props.navigation} nextView={'AddPreset'} />
        <ListItem title={'Custom'} subtitle={'Different lengths for certain intervals'} navigation={this.props.navigation} nextView={'AddCustom'} />
      </ScrollView>
    );
  }
}

export default AddCustomView;
