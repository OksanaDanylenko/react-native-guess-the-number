import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback, Button, Keyboard, Alert} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import Input from "../components/Input";
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';

const StartGameScreen = props => {

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(false);

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
  };

  const confirmInputHandler = () => {
    const chosenValue = parseInt(enteredValue);
    if (!chosenValue || chosenValue <= 0 || chosenValue > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99.',
        [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]);
      return;
    }
    setSelectedNumber(chosenValue);
    setConfirmed(true);
    setEnteredValue('');
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = <Card style={styles.summaryContainer}>
      <Text>You selected:</Text>
      <NumberContainer>{selectedNumber}</NumberContainer>
      <Button title="START GAME" onPress={()=>props.onStartGame(selectedNumber)}/>
    </Card>;
  }

  return <TouchableWithoutFeedback onPress={() => {
    Keyboard.dismiss();
  }}>
    <View style={styles.screen}>
      <TitleText style={styles.title}>Start a New Game!</TitleText>
      <Card style={styles.inputContainer}>
        <BodyText>Select a number</BodyText>
        <Input
          style={styles.input}
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="numeric"
          maxLength={2}
          onChangeText={numberInputHandler}
          value={enteredValue}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title={'Reset'} onPress={resetInputHandler} color={Colors.primary}/>
          </View>
          <View style={styles.button}>
            <Button title={'Confirm'} onPress={confirmInputHandler} color={Colors.accent}/>
          </View>
        </View>
      </Card>
      {confirmedOutput}
    </View>
  </TouchableWithoutFeedback>
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button: {
    width: 100,
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  }
});

export default StartGameScreen;