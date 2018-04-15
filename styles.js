import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(100);
const itemHorizontalMargin = wp(2);

const sliderWidth = viewportWidth - 50;
const itemWidth = viewportWidth - 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  homeview: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 8,
    backgroundColor: '#fff'
  },
  profileview: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 8,
    backgroundColor: '#fff'
  },
  badge: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  workoutcard: {
    flex: 1,
    flexDirection: 'column',
    shadowOffset: {width: 0, height: 3},
    shadowColor: '#a1a1a1',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    borderRadius: 12
  },
  imagecontainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden'
  },
  cardimage: {
    width: itemWidth,
    height: slideHeight
  },
  listitem: {
    shadowOffset: {width: 0, height: 3},
    shadowColor: '#a1a1a1',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    borderRadius: 12,
    marginBottom: 15,
  },
  workoutdrawer: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 0,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#262626',
    shadowOffset: {width: 0, height: 0},
    shadowColor: '#a1a1a1',
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  timercounter: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 75,
    paddingBottom: 75
  },
  intervalbar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 16,
    position: 'absolute',
    bottom: 30,
    left: 0,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#262626',
    shadowOffset: {width: 0, height: 5},
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 12,
    marginLeft: 10,
    marginRight: 10
  }
});

export default styles;
