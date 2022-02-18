import { View, Text, SafeAreaView, StyleSheet, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../constants/theme'
import FormInput from '../components/shared/FormInput'
import FormButton from '../components/shared/FormButton'
import { createQuiz } from '../utils/database'

const CreateQuizScreen = ({navigation}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleQuizSave = async () => {
        const currentQuizId = Math.floor(100000 + Math.random()* 9000).toString();
        //Save Firestore
        await createQuiz(currentQuizId, title, description);

        //Navigation to Add Question String
        navigation.navigate('AddQuestionScreen',{
            currentQuizId: currentQuizId,
            currentQuisTitle: title,
        });

        //Reset
        setTitle('');
        setDescription('');
        ToastAndroid.show('Guardado Quiz', ToastAndroid.SHORT);
    };

    return (
        <SafeAreaView style={styles.content}>

            {/*Title*/}
            <Text style={styles.titel}>Crear Quiz</Text>

            {/*Quiz title */}
            <FormInput
                labelText='Titulo'
                placeholderText='Ingrese el titulo del Quiz'
                onchangeText={val => setTitle(val)}
                value={title}
            />

            {/*Quiz Description */}
            <FormInput
                labelText='Descripción'
                placeholderText='Ingrese una descripción'
                onchangeText={val => setDescription(val)}
                value={description}
            />

            {/*Buton Save Quiz */}
            <FormButton
                labelText='Guardar Quiz'
                handleOnPress={handleQuizSave}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 20,
    },
    titel: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 20,
        fontWeight: 'bold',
        color: COLORS.black,
    },
})

export default CreateQuizScreen