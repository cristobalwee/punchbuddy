import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    borderRadius: 12,
    backgroundColor: '#262626'
  }
});

export default styles;
