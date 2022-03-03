import { View, Text, KeyboardAvoidingView, StyleSheet, ScrollView, ToastAndroid, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../constants/theme';
import FormInput from '../components/shared/FormInput';
import FormButton from '../components/shared/FormButton';
import { createQuestion } from '../utils/database';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const AddQuestionScreen = ({ navigation, route }) => {

  const [currentQuizId, setCurrentQuizId] = useState(
    route.params.currentQuizId,
  );
  const [currentQuisTitle, setCurrentQuizTitle] = useState(
    route.params.currentQuisTitle,
  );

  const [question, setQuestion] = useState('');
  const [imageUri, setImageUri] = useState('');

  const [correctAnswer, setCorrectAnswer] = useState('');
  const [optionTwo, setOptionsTwo] = useState('');
  const [optionThree, setOptionThree] = useState('');
  const [optionFour, setOptionFour] = useState('');

  const handleQuestionSave = async () => {
    if (
      question == '' ||
      correctAnswer == '' ||
      optionTwo == '' ||
      optionThree == '' ||
      optionFour == '' 
    ) {
      ToastAndroid.show('Es necesario llenar todos los campos', ToastAndroid.SHORT);
      return;
    }
    let currentQuestionId = Math.floor(
      100000 + Math.random() * 9000,
    ).toString();

    //Upload Image

    let imageUrl = ''

    if(imageUri!=''){
      const reference = storage().ref(`/images/questions/${currentQuizId}_${currentQuestionId}`);
      await reference.putFile(imageUri).then(()=>{
        console.log('Imagen Guardada');
      })
      imageUrl= await reference.getDownloadURL();
    }
    //Add question to db
    await createQuestion(currentQuizId, currentQuestionId, {
      question: question,
      correct_answer: correctAnswer,
      incorrect_answer: optionTwo,
      incorrect_answer1: optionThree,
      incorrect_answer2:  optionFour,
      imageUrl: imageUrl,
    });
    ToastAndroid.show('Pregunta Guardada', ToastAndroid.SHORT);

    //Reset
    setQuestion('');
    setCorrectAnswer('');
    setImageUri('');
    setOptionsTwo('');
    setOptionThree('');
    setOptionFour('');

  };

  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      ({assets}) =>{
        if(assets && assets.length > 0) {
          setImageUri(assets[0].uri);
        } 
      },
    );
  };

  return (
    <KeyboardAvoidingView style={styles.content}>
      <ScrollView style={styles.contentScroll}>
        <View style={styles.contentTitle}>
          <Text style={styles.titleText}>
            Agregar Pregunta
          </Text>
          <Text style={styles.titleForText}>
            de {currentQuisTitle}
          </Text>

          {/*Question */}
          <FormInput
            labelText='Pregunta'
            placeholderText='Ingrese una Pregunta'
            onchangeText={val => setQuestion(val)}
            value={question.trimStart()}
          />
          {/*Image upload */}
{
  imageUri == '' ?(
    <TouchableOpacity
    style={styles.styleImage}
    onPress={selectImage}
    >
<Text style={styles.styleImageText}>+ agregar imagen</Text>
    </TouchableOpacity>
  ):(
    <Image
    source={{
      uri: imageUri,
    }}
    resizeMode={'cover'}
    style={styles.styleImageImg}
    />
  )
}

          {/*Options */}
          <View style={{ marginTop: 30 }}>
            <FormInput
              labelText='Opción 1 Respuesta correcta'
              onchangeText={val => setCorrectAnswer(val)}
              value={correctAnswer.trimStart()}
            />
            <FormInput
              labelText='Opción 2'
              onchangeText={val => setOptionsTwo(val)}
              value={optionTwo.trimStart()}
            />
            <FormInput
              labelText='Opción 3'
              onchangeText={val => setOptionThree(val)}
              value={optionThree.trimStart()}
            />
            <FormInput
              labelText='Opción 4'
              onchangeText={val => setOptionFour(val)}
              value={optionFour.trimStart()}
            />

            {/*Buttons */}
            <FormButton
              labelText='Guardar Pregunta'
              handleOnPress={handleQuestionSave}
            />
            <FormButton
              labelText='Finalizar'
              isPrimary={false}
              handleOnPress={() => {
                setCurrentQuizId('');
                navigation.navigate('HomeScreen');
              }}
              style={{ marginVertical: 20, }}
            />
          </View>

        </View>

      </ScrollView>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  contentScroll: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentTitle: {
    padding: 20,
  },
  titleText: {
    fontSize: 17,
    textAlign: 'center',
    color: COLORS.black,
  },
  titleForText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  styleImage:{
    alignItems:'center',
    justifyContent: 'center',
    padding:28,
    backgroundColor: COLORS.primary + '20',
  },
  styleImageText:{
    opacity:0.5,
    color:COLORS.primary,
  },
  styleImageImg:{
    width:'100%',
    height: 200,
    borderRadius: 5,
  }
})

export default AddQuestionScreen