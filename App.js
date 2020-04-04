import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen  from "./screens/GameScreen";
import GameOver from "./screens/GameOver";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = numberOfRounds => {
    setGuessRounds(numberOfRounds);

  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;
  if(userNumber) {
    content= <GameScreen userChoice={userNumber} />;
  }

  return (
    <View style={styles.container}>
      <Header title={'Guess a number'} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      height: 500,
  },
});
