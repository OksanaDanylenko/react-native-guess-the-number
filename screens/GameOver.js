import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Success from '../assets/images/jude-beck-mU08JKimqbM-unsplash.jpg';
import Colors from '../constants/Colors';
import MainButton from '../components/MainButton';

const GameOver = props => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText> The Game is over</TitleText>
        <View style={styles.imageContainer}>
          <Image source={Success} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>
            You phone need
            <Text style={styles.highlight}> {props.roundsNumber} </Text>
            rounds to guess the number
            <Text style={styles.highlight}> {props.userNumber}.</Text>
          </BodyText>
        </View>
        <MainButton onPress={props.onRestart}> New Game</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: '#ccffcc',
    overflow: 'hidden',
    marginVertical: 30,
    backgroundColor: '#ccff66',
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15,
  },
  resultText: {
    textAlign: 'center',
    // fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
  },
});

export default GameOver;
