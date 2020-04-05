import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import DefaultStyles from '../constants/default-styles';
import MainButton from "../components/MainButton";
import { Ionicons } from '@expo/vector-icons';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = (Math.random() * (max - min)) + min;
  if (rndNum === exclude)
    return generateRandomBetween(min, max, exclude);
  else return Math.trunc(rndNum);
};

const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));
  const [rounds, setRounds] = useState(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGameHandler = direction => {
    if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
      Alert.alert('Don\'t lie!', 'You know that is wrong...', [{text: 'Sorry!', style: 'cancel'}]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else currentLow.current = currentGuess;

    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setRounds(curRounds => curRounds + 1);
  };

  return <View style={styles.screen}>
    <Text style={DefaultStyles.title }>Opponent's Guess:</Text>
    <NumberContainer>{currentGuess}</NumberContainer>
    <Card style={styles.buttonContainer}>
      <MainButton onPress={nextGameHandler.bind(this, 'lower')}><Ionicons name="md-remove" size={24} color="#fff" /></MainButton>
      <MainButton onPress={nextGameHandler.bind(this, 'greater')}><Ionicons name="md-add" size={24} color="#fff" /></MainButton>
    </Card>
  </View>;

};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 400,
    maxWidth: '90%',
  }
});

export default GameScreen;