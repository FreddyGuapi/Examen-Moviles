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
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorConfirmarPassword, setErrorConfirmarPassword] = useState('')
  const [showPasword, setShowPassword] = useState(false);


  const validar = () => {
    let error = false
    setErrorEmail('')
    setErrorPassword('')
    setErrorConfirmarPassword(null)
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(email).toLowerCase())) {
      setErrorEmail("Ingrese un correo válido")
      error = true
    }
    if (password == '') {
      setErrorPassword("Ingrese una contraseña")
      error = true
    }
    if (confirmPassword == '') {
      setErrorConfirmarPassword("Confirme la contraseña")
      error = true
    }
    return !error
  }

  const handleOnSubmit = () => {
    if (validar()) {
      if (email != '' && password != '' && confirmPassword != '') {
        if (password == confirmPassword) {
          if (password.length >= 6) {
            signUp(email, password);
          } else {
            Alert.alert('La contraseña debe tener como mínimo 6 caracteres')
          }
        } else {
          Alert.alert('Las contraseñas ingresadas no coinciden vuelva a intentarlo');
        }
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
          marginTop:-30,
          alignItems: 'center',
          width: '50%',
          height: '25%',
        }} />
      {/*Email*/}
      <FormInput
        labelText='Email'
        placeholderText='Ingrese su Email'
        onchangeText={value => {setEmail(value)
          setErrorEmail('')}
        }
        value={email.trimStart()}
        keyboardType={'email-address'}
        errorMessage={errorEmail}
      />
      <Text style={styles.errorMessage}>{errorEmail}</Text>
      {/*Password */}
      <FormInput
        labelText='Password'
        placeholderText='Ingrese su Password'
        onchangeText={value => {
          setPassword(value)
          setErrorPassword('')
        }}
        value={password.trimStart()}
        secureTextEntry={true}
        errorMessage={errorPassword}
      />
      <Text style={styles.errorMessage}>{errorPassword}</Text>
      {/*ConfirmPassword */}
      <FormInput
        labelText='Confirmar Password'
        placeholderText='Ingrese su Password'
        onchangeText={value => {
          setConfirmPassword(value)
          setErrorConfirmarPassword('')
        }}
        value={confirmPassword.trimStart()}
        secureTextEntry={true}
        errorConfirmarPassword={errorConfirmarPassword}
      />
      <Text style={styles.errorMessage}>{errorConfirmarPassword}</Text>
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