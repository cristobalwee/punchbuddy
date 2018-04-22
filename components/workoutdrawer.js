import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Animated, ScrollView, Platform, Dimensions, Easing } from 'react-native';
import { Font } from 'expo';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import styles from '../styles.js';
import ListItem from '../components/listitem.js';

// https://goshakkk.name/react-native-animated-appearance-disappearance/

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class WorkoutDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      drawerOpen: false,
      animation: new Animated.Value(),
      fade: new Animated.Value(0),
      cardHeight: new Animated.Value()
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'cubano-regular': require('../assets/fonts/cubano-regular-webfont.ttf'),
      'quicksand-light': require('../assets/fonts/Quicksand-Light.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  animateTo() {

  }

  render() {
    renderList = () => {
      if (this.state.drawerOpen) {
        return (
          <View style={styles.drawercontents}>
            <ListItem title={'Boxing - Intermediate'} subtitle={'48:20'} navigation={this.props.navigation} noshadow nextView={'Detail'} />
            <ListItem title={'Sparring - 3 minute rounds'} subtitle={'11:00'} navigation={this.props.navigation} noshadow nextView={'Detail'} />
          </View>
        );
      }

      return null;
    }

    if (!this.state.fontLoaded) {
      return <Text>Loading</Text>
    }

    return (
      <Animated.View style={[styles.workoutdrawer, {height: this.state.animation}]}>
        <View style={{flex: 1, position: 'absolute', top: 10, left: '50%', justifyContent: 'center'}}>
          <TouchableHighlight
            underlayColor={'#262626'}
            style={{width: 39, height: 10}}
            onPress={() => {
              let flag = this.state.drawerOpen
              let initialValue = flag ? viewportHeight - 50 : 75;
              let finalValue = flag ? 75 : viewportHeight - 50;
              let cardInitialValue = flag ? 0 : 75;
              let cardFinalValue = flag ? 75 : 0;
              let fadeIn = flag ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 1)';

              this.setState({
                drawerOpen : !flag
              });

              this.state.animation.setValue(initialValue);
              Animated.spring(
                this.state.animation,
                {
                  toValue: finalValue,
                  duration: 400,
                  bounciness: 2
                }
              ).start();
            }}>
            <Image
              source={require('../assets/drawer_line.png')}
              style={{width: 39, height: 3}}
            />
          </TouchableHighlight>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View>
            <Text style={{fontFamily: 'cubano-regular', fontSize: 20, color: '#fff'}}>My Workouts</Text>
          </View>
          <View style={styles.badge}>
            <TouchableHighlight
              underlayColor={'#262626'}
              onPress={() => this.props.navigation.navigate('AddWorkout')}>
              <Image
                source={require('../assets/add_icon.png')}
                style={{width: 23, height: 23}}
              />
            </TouchableHighlight>
          </View>
        </View>
        {renderList()}
        {
          // <Animated.View style={{height: this.state.cardHeight}}>
          //   <ScrollView style={{position: 'relative', left: 0, top: 0}}>
          //     <View style={{justifyContent: 'center', borderRadius: 8, flex: 1, backgroundColor: '#fff', padding: 10}}>
          //       <Text style={{fontFamily: 'cubano-regular', fontSize: 20}}>Let's Get Sweaty</Text>
          //       <Text style={{fontFamily: 'quicksand-light', fontSize: 16}}>Tap the add button to add a workout</Text>
          //     </View>
          //   </ScrollView>
          // </Animated.View>
        }
      </Animated.View>
    );
  }
}

export default WorkoutDrawer;
