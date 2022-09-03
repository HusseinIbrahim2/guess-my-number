import { useState, useEffect } from "react";
import { View, StyleSheet, Text, Alert,FlatList } from "react-native";
import Title from "../../components/Title";
import NumberContainer from "../../components/NumberContainer";
import PrimaryButton from '../../components/PrimaryButton';
import GameOverScreen from "./GameOverScreen";
import Colors from "../../constants/colors";
import Card from "../../constants/Card";
import CardTitle from "../../components/CardTitle";
import { Entypo } from '@expo/vector-icons'

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    }
    else {
        return rndNum;
    }
}
let min = 1;
let max = 100;

function GameScreen({ inputNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(1, 100, inputNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessedRounds, setGuessedRounds] = useState([initialGuess]);

    useEffect(() => {
        if (currentGuess == inputNumber) {
            onGameOver();
        }
    }, [currentGuess, inputNumber, onGameOver])

    function nextNumHandler(direction) {
        if ((direction === 'Lower' && currentGuess < inputNumber) || (direction === 'Greater' && currentGuess > inputNumber)) {
            Alert.alert('You are a liar !', 'You already know the number.');
            return;
        }

        if (direction === 'Lower') {
            max = currentGuess;
        } else {
            min = currentGuess + 1;
        }

        const newRndNum = generateRandomBetween(min, max, currentGuess);

        setCurrentGuess(newRndNum);
        setGuessedRounds(prevGuessRound => [...prevGuessRound, newRndNum]
        )
    };

    return (
        <View style={styles.screen} >
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <CardTitle>Lower or Greater?</CardTitle>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPressing={nextNumHandler.bind(this, 'Lower')} >
                            <Entypo name="minus" size={24} color={Colors.primary2} />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPressing={nextNumHandler.bind(this, 'Greater')} >
                            <Entypo name="plus" size={24} color={Colors.primary2} />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            <FlatList
                    data={guessedRounds}
                    renderItem={(itemData) =><Text>{itemData.item}</Text>} 
                    keyExtractor={(item) => item}
                    />
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        alignItems: 'center'
    },

    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    },
})

export default GameScreen;