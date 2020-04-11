import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  FlatList,
} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons';
import { ScreenOrientation } from 'expo/build/removed.web';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.random() * (max - min) + min;
  if (rndNum === exclude) return generateRandomBetween(min, max, exclude);
  else return Math.trunc(rndNum);
};

const renderListItems = (listLength, itemData) => (
  <View style={styles.listItem}>
    <Text>#{listLength - itemData.index}</Text>
    <Text>{itemData.item}</Text>
  </View>
);

const GameScreen = props => {
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess.toString());
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width,
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height,
  );

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get('window').height);
      setAvailableDeviceWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updateLayout);
    return Dimensions.removeEventListener('change', updateLayout);
  });

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGameHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = +currentGuess;
    } else currentLow.current = +currentGuess + 1;

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess,
    );
    setCurrentGuess(nextNumber);
    setPastGuesses(curPassGuesses => [
      nextNumber.toString(),
      ...curPassGuesses,
    ]);
  };

  let listContainerStyle = styles.listContainer;

  // if(availableDeviceWidth< 350) {
  //   listContainerStyle = styles.listContainerBig
  // }

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <Text style={DefaultStyles.title}>Opponent's Guess:</Text>
        <View style={styles.controls}>
          <MainButton onPress={nextGameHandler.bind(this, 'lower')}>
            <Ionicons name="md-remove" size={24} color="#fff" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={nextGameHandler.bind(this, 'greater')}>
            <Ionicons name="md-add" size={24} color="#fff" />
          </MainButton>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            keyExtactor={item => item}
            data={pastGuesses}
            renderItem={renderListItems.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>{`Opponent's Guess:`}</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGameHandler.bind(this, 'lower')}>
          <Ionicons name="md-remove" size={24} color="#fff" />
        </MainButton>
        <MainButton onPress={nextGameHandler.bind(this, 'greater')}>
          <Ionicons name="md-add" size={24} color="#fff" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/*<ScrollView contentContainerStyle={styles.list}>*/}
        {/*  {pastGuesses.map((guess, index)=> renderListItems(guess, pastGuesses.length - index))}*/}
        {/*</ScrollView>*/}
        <FlatList
          keyExtactor={item => item}
          data={pastGuesses}
          renderItem={renderListItems.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
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
  },
  listItem: {
    borderColor: '#ccc',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
  },
  listContainer: {
    flex: 1,
    width: '60%',
  },
});

export default GameScreen;
