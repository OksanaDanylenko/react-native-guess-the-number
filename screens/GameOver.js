import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Text, View, Button, Alert } from 'react-native';

const GameOver = props  => {
  return <View style={styles.screen}>
    <Text> The Game is over</Text>
  </View>
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
     alignItems: 'center',
  }
});

export default GameOver;
