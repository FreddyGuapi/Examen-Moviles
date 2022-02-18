import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getQuestionsByQuizId, getQuizById } from '../utils/database';
import { COLORS } from '../constants/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PlayQuizScreen = ({ navigation, route }) => {

    const [currentQuizId, setCurrentQuizId] = useState(route.params.quizId);
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([]);

    const [correctCount, setCorrectCount] = useState(0)
    const [incorrectCount, setIncorrectCount] = useState(0)



    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            //Generate randon number
            let j = Math.floor(Math.random() * (i + 1));

            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }


    const getQuizAndQuestionDetails = async () => {

        //Get Quiz
        let currentQuiz = await getQuizById(currentQuizId)
        currentQuiz = currentQuiz.data();
        setTitle(currentQuiz.title);


        //Get Questions for current quiz
        const questions = await getQuestionsByQuizId(currentQuizId)

        //Transform and shuffle options
        let tempQuestions = [];
        await questions.docs.forEach(async res => {
            let question = res.data();


            //Create Single array of all options and shuffle it
            question.allOptions = shuffleArray([
                ...question.incorrect_answers,
                question.correct_answer,
            ]);
            await tempQuestions.push(question);
        });
        setQuestions([...tempQuestions]);
    };

    useEffect(() => {
        getQuizAndQuestionDetails()
    }, [])

    return (
        <SafeAreaView style={styles.content}>

            <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />

            {/*Top Bar */}
            <View style={styles.styleTopBar}>

                {/*Back Icon */}
                <MaterialIcons name='arrow-back' size={24} onPress={() => navigation.goBack()} />

                {/*Title */}
                <Text style={{ fontSize: 16, marginLeft: 10 }}>{title}</Text>

                {/*Correct and incorrect count */}
                <View style={styles.styleCorrectAndIncorrect}>

                    {/*Correct */}
                    <View style={styles.styleCorrect}>
                        <MaterialIcons
                            name='check'
                            size={14}
                            style={{ color: COLORS.white }}
                        />
                        <Text style={{color:COLORS.white, marginLeft:6}}>
                            {correctCount}
                        </Text>
                    </View>

                    {/*Incorrect */}
                    <View style={styles.styleIncorrect}>
                        <MaterialIcons
                            name='close'
                            size={14}
                            style={{ color: COLORS.white }}
                        />
                        <Text style={{color:COLORS.white, marginLeft:6}}>
                            {incorrectCount}
                        </Text>
                    </View>


                </View>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        position: 'relative',
    },
    styleTopBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
        elevation: 4,
    },
    styleCorrectAndIncorrect: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    styleCorrect: {
        backgroundColor: COLORS.success,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    styleIncorrect: {
        backgroundColor: COLORS.error,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },

})

export default PlayQuizScreen