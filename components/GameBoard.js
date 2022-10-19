import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';
import { Pressable, View, Text } from 'react-native';
import styles from '../styles/style';

let board = [];
const NUMBER_OF_DICES = 5;
const NUMBER_OF_THROWS = 3;
const NUMBER_OF_POINT_BTNS = 6;
const ROUNDS = NUMBER_OF_POINT_BTNS;

export default function GameBoard() {
  const row = [];
  const pointButtons = [];

  const [throwsLeft, setthrowsLeft] = useState(NUMBER_OF_THROWS);
  const [status, setStatus] = useState('');
  const [selectedDices, setSelectedDices] = useState(new Array(NUMBER_OF_DICES).fill(false));
  const [selectedPoints, setSelectedPoints] = useState(new Array(NUMBER_OF_POINT_BTNS).fill(false));
  const [round, setRound] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [bonusCounter, setBonusCounter] = useState();

  function getDiceColor(i) {
    return selectedDices[i] ? 'black' : 'steelblue';
  }
  function getPointButtonColor(i) {
    return selectedPoints[i] !== false ? 'black' : 'steelblue';
  }

  function selectDice(i) {
    if (throwsLeft === NUMBER_OF_THROWS) {
      setStatus('Throw atleast 1 time to select dice');
      return;
    }
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
  }

  function throwDices() {
    if (round === ROUNDS && throwsLeft === NUMBER_OF_THROWS) {
      setSelectedDices(new Array(NUMBER_OF_DICES).fill(false));
      setSelectedPoints(new Array(NUMBER_OF_POINT_BTNS).fill(false));
      setthrowsLeft(NUMBER_OF_THROWS);
      setTotalPoints(0);
      setRound(0);
    }
    if (throwsLeft == 0 && selectedPoints.filter((val) => val !== false).length == round) {
      setStatus('Select your points before throw');
      return;
    }

    for (let i = 0; i < NUMBER_OF_DICES; i++) {
      if (!selectedDices[i]) {
        let randomNumber = Math.floor(Math.random() * 6 + 1);
        board[i] = `dice-${randomNumber}`;
      }
    }
    setthrowsLeft(throwsLeft - 1);
  }

  function selectPoints(i, spotNumber) {
    if (throwsLeft != 0) {
      setStatus('Throw 3 times before setting points');
      return;
    }

    if (selectedPoints[i] !== false) {
      setStatus(`You already selected point for ${spotNumber}`);
      return;
    }

    let diceCount = board.filter((val) => val == `dice-${spotNumber}`).length;

    console.log(diceCount);

    let temp = [...selectedPoints];
    temp[i] = diceCount * spotNumber;

    setSelectedPoints(temp);
    setTotalPoints(totalPoints + temp[i]);
    setRound(round + 1);
    setthrowsLeft(NUMBER_OF_THROWS);
    setSelectedDices(new Array(NUMBER_OF_DICES).fill(false));
  }

  function checkBonus() {
    if (totalPoints >= 63) {
      setBonusCounter('You got the bonus!');
    } else {
      setBonusCounter(`You are ${63 - totalPoints} points away from the bonus`);
    }
  }

  for (let i = 0; i < NUMBER_OF_DICES; i++) {
    row.push(
      <Pressable key={`row-${i}`} onPress={() => selectDice(i)}>
        <MaterialCommunityIcons name={board[i]} key={`row-${i}`} size={50} color={getDiceColor(i)}></MaterialCommunityIcons>
      </Pressable>
    );
  }

  for (let i = 0; i < NUMBER_OF_POINT_BTNS; i++) {
    let spotNumber = i + 1;
    pointButtons.push(
      <Pressable style={styles.points} key={`button-${i}`} onPress={() => selectPoints(i, spotNumber)}>
        <Text>{!selectedPoints[i] ? 0 : selectedPoints[i]}</Text>
        <MaterialCommunityIcons name={`numeric-${spotNumber}-circle`} key={`button-${i}`} size={50} color={getPointButtonColor(i)}></MaterialCommunityIcons>
      </Pressable>
    );
  }
  useEffect(() => {
    if (throwsLeft === NUMBER_OF_THROWS) {
      setStatus('Throw dices');
    }
    if (throwsLeft < NUMBER_OF_THROWS && throwsLeft > 0) {
      setStatus('Select dices and throw again');
    }
    if (throwsLeft === 0) {
      setStatus('Select dices');
    }
  }, [throwsLeft]);

  useEffect(() => {
    if (round === ROUNDS) {
      setStatus('Game over. All points selected');
    }
    checkBonus();
  }, [round]);

  return (
    <View style={styles.gameboard}>
      <View style={styles.flex}>{row}</View>
      <Text style={styles.gameinfo}>Throws left: {throwsLeft}</Text>
      <Text style={styles.gameinfo}>{status}</Text>
      <Pressable style={styles.button} onPress={() => throwDices()}>
        <Text style={styles.buttonText}>Throw dices</Text>
      </Pressable>
      <Text style={styles.gameinfo}>Total: {totalPoints}</Text>
      <Text>{bonusCounter}</Text>
      <View style={styles.flex}>{pointButtons}</View>
    </View>
  );
}
