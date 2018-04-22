import React from 'react';
import { FlatList, Text, View, ScrollView, Image, SafeAreaView, TouchableHighlight, Platform, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Font } from 'expo';

import styles from '../styles.js';
import WorkoutCard from '../components/workoutcard.js';
import ListItem from '../components/listitem.js';
import WorkoutDrawer from '../components/workoutdrawer.js';

// https://stackoverflow.com/questions/39849648/horizontal-scrollview-snapping-react-native
// React navigation has a bug that causes SafeAreaView to break https://github.com/infinitered/ignite/issues/1225#issuecomment-362800224
// https://github.com/archriss/react-native-snap-carousel

const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 0;
const types = ['boxing', 'running', 'cycling', 'bodyweight', 'sparring', 'weights'];
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(100);
const itemHorizontalMargin = wp(2);

const sliderWidth = viewportWidth;
const itemWidth = viewportWidth - 50;

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM
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
    renderItem = ({item, index}) => {
      return <WorkoutCard type={item} navigation={this.props.navigation} />
    }

    const { slider1ActiveSlide } = this.state;
    if (!this.state.fontLoaded) {
      return <Text>Loading</Text>
    }

    return (
      <View style={styles.container}>
        <ScrollView contentInsetAdjustmentBehavior={"always"} style={styles.homeview}>
          <View style={{flex: 1, flexDirection: 'row', marginBottom: 20}}>
            <Text style={{fontFamily: 'cubano-regular', fontSize: 32}}>Home</Text>
            <View style={styles.badge}>
              <TouchableHighlight
                underlayColor={'#fff'}
                onPress={() => this.props.navigation.navigate('Profile')}>
                <Image
                  source={require('../assets/profile_icon.png')}
                  style={{width: 32, height: 32}}
                />
              </TouchableHighlight>
            </View>
          </View>
          <View style={{width: slideWidth, marginLeft: -25}}>
            <Carousel
              ref={c => this._slider1Ref = c}
              data={types}
              renderItem={renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              hasParallaxImages={true}
              containerCustomStyle={{paddingBottom: 10}}
              firstItem={SLIDER_1_FIRST_ITEM}
              onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
              />
          </View>
          <Text style={{fontFamily: 'cubano-regular', fontSize: 20, marginTop: 25, marginBottom: 15}}>Popular Workouts</Text>
          <ListItem title={'Boxing - Intermediate'} subtitle={'48:20'} navigation={this.props.navigation} nextView={'Detail'} />
          <ListItem title={'Running - Intermediate'} subtitle={'24:00'} navigation={this.props.navigation} nextView={'Detail'} />
          <ListItem title={'Tabata - Beginner'} subtitle={'28:00'} navigation={this.props.navigation} nextView={'Detail'} />
        </ScrollView>
        <WorkoutDrawer navigation={this.props.navigation} />
      </View>
    );
  }
}

export default HomeView;
