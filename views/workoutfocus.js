import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image } from 'react-native';
import { Font } from 'expo';

import styles from '../styles.js';
import WorkoutCard from '../components/workoutcard.js';
import MenuItem from '../components/menuitem.js';
import ListItem from '../components/listitem.js';

// https://github.com/bamlab/react-native-image-header-scroll-view

class WorkoutFocusView extends React.Component {
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
          <Text style={{fontFamily: 'cubano-regular', fontSize: 16}}>{params.type}</Text>
          <Text style={{fontFamily: 'quicksand-light', fontSize: 14}}></Text>
        </View>
        <ListItem title={params.type + ' - Beginner'} subtitle={'36:00'} navigation={this.props.navigation} nextView={'Timer'} />
        <ListItem title={params.type + ' - Intermediate'} subtitle={'48:20'} navigation={this.props.navigation} nextView={'Timer'} />
        <ListItem title={params.type + ' - Advanced'} subtitle={'56:00'} navigation={this.props.navigation} nextView={'Timer'} />
      </ScrollView>
    );
  }
}

export default WorkoutFocusView;
