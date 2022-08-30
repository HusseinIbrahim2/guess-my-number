import { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import StartGameScreen from './assets/screens/StartGameScreen';
import GameScreen from './assets/screens/GameScreen';
import { LinearGradient } from 'expo-linear-gradient';



export default function App() {

const [inputNumber, setInputNumber] = useState();

function pickedNumber (inputNumber) {
  setInputNumber(inputNumber)
}
let screen = <StartGameScreen onConfirm={pickedNumber}/>
if(inputNumber) {
  screen = <GameScreen />
}

  return (
    <LinearGradient colors={['#792843', '#8d8d11']} style={styles.container}>
      <ImageBackground source={require('./assets/images/Dice1.jpg')} resizeMode="cover" style={styles.container} imageStyle={styles.imageBackgroud} >
        {screen}
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackgroud: {
    opacity: 0.2,
  }
});
