import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableHighlight, SafeAreaView } from 'react-native';
import { Font } from 'expo';

import styles from '../styles.js';
import WorkoutCard from '../components/workoutcard.js';
import IntervalBar from '../components/intervalbar.js';

class TimerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      totalTime: 0,
      intervals: 0,
      currentInterval: 0,
      locked: false,
      playing: false
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

    renderLock = () => {
      if (this.state.locked) {
        return (
          <Image
            source={require('../assets/unlock_button.png')}
            style={{width: 23, height: 36, marginTop: 12}}
          />
        );
      }

      return (
        <Image
          source={require('../assets/lock_button.png')}
          style={{width: 23, height: 36, marginTop: 12}}
        />
      );
    }

    renderButton = () => {
      if (this.state.playing) {
        return (
          <Image
            source={require('../assets/pause_button.png')}
            style={{width: 64, height: 80}}
          />
        );
      }

      return (
        <Image
          source={require('../assets/play_button.png')}
          style={{width: 64, height: 80}}
        />
      );
    }

    return (
      <ScrollView contentInsetAdjustmentBehavior={"always"} style={[styles.profileview, {position: 'relative'}]}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableHighlight
            onPress={() => this.props.navigation.goBack(null)}>
            <Image
              source={require('../assets/back_icon.png')}
              style={{width: 9, height: 15}}
            />
          </TouchableHighlight>
          <Text style={{fontFamily: 'cubano-regular', fontSize: 16}}>Timer view</Text>
          <Text style={{fontFamily: 'quicksand-light', fontSize: 14}}>Edit</Text>
        </View>
        <View style={styles.timercounter}>
          <Text style={{fontFamily: 'quicksand-light', fontSize: 108, textAlign: 'center'}}>01:00</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableHighlight
            onPress={() => {
              if (this.state.locked) {
                return;
              }
              this.props.navigation.goBack(null);
            }}>
            <Image
              source={require('../assets/back_icon.png')}
              style={{width: 9, height: 15, marginTop: 6}}
            />
          </TouchableHighlight>
          <Text style={{fontFamily: 'quicksand-light', fontSize: 24}}>Sprint</Text>
          <TouchableHighlight
            onPress={() => {
              if (this.state.locked) {
                return;
              }
              this.props.navigation.goBack(null);
            }}>
            <Image
              source={require('../assets/arrow_icon.png')}
              style={{width: 9, height: 15, marginTop: 6}}
            />
          </TouchableHighlight>
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontFamily: 'quicksand-light', fontSize: 16}}>00:00:00</Text>
          <Text style={{fontFamily: 'quicksand-light', fontSize: 16}}>-01:03:20</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, paddingTop: 75}}>
          <TouchableHighlight
            onPress={() => {
              let flag = this.state.locked;
              this.setState({ locked: !flag });
            }}>
            {renderLock()}
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              if (this.state.locked) {
                return;
              }
              let flag = this.state.playing;
              this.setState({ playing: !flag });
            }}>
            {renderButton()}
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => console.log("Stop")}>
            <Image
              source={require('../assets/stop_button.png')}
              style={{width: 34, height: 34, marginTop: 14}}
            />
          </TouchableHighlight>
        </View>
        <IntervalBar />
      </ScrollView>
    );
  }
}

export default TimerView;
