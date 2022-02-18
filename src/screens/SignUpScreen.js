import { View, Text, SafeAreaView, StyleSheet, ToastAndroid, Image } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../constants/theme';
import FormInput from '../components/shared/FormInput';
import FormButton from '../components/shared/FormButton';
import { signUp } from '../utils/auth';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOnSubmit = () => {
    if (email != '' && password != '' && confirmPassword != '') {
      if (password == confirmPassword) {
        signUp(email, password);
      } else {
        ToastAndroid.show('Las contraseñas no son las mismas', ToastAndroid.SHORT);
      }
    }
  };
  return (
    <SafeAreaView
      style={styles.content}>
      {/*Header */}
      {/*Logo */}
      <Image source={require('../components/img/Registro.png')}
        style={{
          alignItems: 'center',
          width: '50%',
          height: '25%',
        }} />
      {/*Email*/}
      <FormInput
        labelText='Email'
        placeholderText='Ingrese su Email'
        onchangeText={value => setEmail(value)}
        value={email}
        keyboardType={'email-address'}
      />
      {/*Password */}
      <FormInput
        labelText='Password'
        placeholderText='Ingrese su Password'
        onchangeText={value => setPassword(value)}
        value={password}
        secureTextEntry={true}
      />
      {/*ConfirmPassword */}
      <FormInput
        labelText='Confirmar Password'
        placeholderText='Ingrese su Password'
        onchangeText={value => setConfirmPassword(value)}
        value={confirmPassword}
        secureTextEntry={true}
      />
      {/*Submit */}
      <FormButton
        labelText='Registrar'
        handleOnPress={handleOnSubmit}
        style={{ width: '100%' }}
      />
      {/*Footer */}
      <View style={styles.styleFooter}>
        <Text>Ya tine una cuenta?</Text>
        <Text
          style={styles.styleFooterText}
          onPress={() => navigation.navigate('SignInScreen')}
        >Login</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  styleHeder: {
    fontSize: 24,
    color: COLORS.black,
    fontWeight: 'bold',
    marginVertical: 32,
  },
  styleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  styleFooterText: {
    marginLeft: 4,
    color: COLORS.primary,
  }
})

export default SignUpScreen