import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, Image, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getQuizById } from '../utils/database';
import { COLORS } from '../constants/theme';
import FormButton from '../components/shared/FormButton';
import FormInput from '../components/shared/FormInput';
import firestore from '@react-native-firebase/firestore'

const DatailScreen = ({ navigation, route }) => {
    const [currentQuizId, setCurrentQuizId] = useState(route.params.quizId);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    const getQuizAndQuestionDetails = async () => {
        // Get Quiz
        let currentQuiz = await getQuizById(currentQuizId);
        currentQuiz = currentQuiz.data();
        setTitle(currentQuiz.title);
        setDescription(currentQuiz.description);

    };

    const deleteQuiz = () => {
        firestore().collection('Quizzes').doc(currentQuizId).delete().then(() => {
            firestore().collection('Quizzes').doc(currentQuizId).collection('QNA').doc().delete().then(() => {
                ToastAndroid.show('Quiz eliminado', ToastAndroid.SHORT);
                navigation.navigate('HomeScreen')
            })
        })
        
      };

      const updateQuiz = async  () => {

        try {
            firestore().collection('Quizzes').doc(currentQuizId).update({
               title:title,
               description:description,
            })

        } catch (e) {
            console.log(e)
        }
        finally {
            ToastAndroid.show('Quiz modificado', ToastAndroid.SHORT);
        }
        
      };


    useEffect(() => {
        getQuizAndQuestionDetails();
    }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                position: 'relative',
                backgroundColor:COLORS.white
            }}>
            <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
            {/* Top Bar */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    backgroundColor: COLORS.white,
                    elevation: 4,
                }}>
                {/* Back Icon */}
                <TouchableOpacity
                    onPress={() => { navigation.navigate('HomeScreen') }}>
                    <Image source={require('../components/img/arrow.png')}
                        style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 17, color: COLORS.black }}>Detalle del Quiz</Text>
            </View>
            <View style={{marginHorizontal:15, marginTop:10}}>

                {/*Quiz title */}
                <FormInput
                    labelText='Titulo'
                    placeholderText={title}
                    onchangeText={val => setTitle(val)}
                    value={title.trimStart()}
                />
                {/*Quiz Description */}
                <FormInput
                    labelText='Descripción'
                    placeholderText={description}
                    onchangeText={val => setDescription(val)}
                    value={description.trimStart()}
                />
            </View>
            <FormButton
                labelText='Editar'
                handleOnPress={updateQuiz}
                style={{ marginVertical: 5, marginHorizontal: 30 }}
            />
            <FormButton
                labelText='Eliminar'
                isPrimary={false}
                style={{ marginVertical: 5, marginHorizontal: 30 }}
                handleOnPress={deleteQuiz}
            />
        </SafeAreaView>

    )
}

export default DatailScreen