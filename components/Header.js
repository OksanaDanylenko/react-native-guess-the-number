import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TitleText from '../components/TitleText';

const Header = props => {
  return (
    <View style={styles.header}>
      <TitleText>{props.title}</TitleText>
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: '#ffcccc',
    alignItems: 'center',
    justifyContent: 'center'
  } 
});

export default Header;