import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, AsyncStorage } from 'react-native';
import { Font } from 'expo';

import styles from '../styles.js';
import WorkoutCard from '../components/workoutcard.js';
import MenuItem from '../components/menuitem.js';

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      name: 'Punchy McPunch'
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
          <Text style={{fontFamily: 'cubano-regular', fontSize: 16}}>Profile</Text>
          <Text style={{fontFamily: 'quicksand-light', fontSize: 14}}></Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../assets/profile_icon.png')}
            style={{width: 124, height: 124, marginBottom: 15}}
          />
          <Text style={{fontFamily: 'cubano-regular', fontSize: 20, marginBottom: 15}}>{this.state.name}</Text>
        </View>
        <MenuItem
          title={"Name"}
          subtitle={this.state.name}
          callback={(text) => {
            this.setState({ name: text });
          }} />
        <MenuItem title={"Workout time"} subtitle={"00:12:34:20"} />
        <MenuItem title={"Email"} subtitle={""} />
      </ScrollView>
    );
  }
}

export default ProfileView;
