import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../constants/theme';
import FormInput from '../components/shared/FormInput';
import FormButton from '../components/shared/FormButton';
import { signIn } from '../utils/auth';

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [showPasword, setShowPassword] = useState(false);

    const validar = () => {
        let error = false
        setErrorEmail('')
        setErrorPassword('')
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(String(email).toLowerCase())) {
          setErrorEmail("Ingrese un correo válido")
          error = true
        }
        if (password == '') {
          setErrorPassword("Ingrese una contraseña")
          error = true
        }
        return !error
      }

    const handleOnSubmit = () => {
        if (validar()) {
            if (email != '' && password != '') {
                signIn(email, password);
            }
        }
        
    };
    return (
        <SafeAreaView
            style={styles.content}
        >
            {/*Header */}
            {/*Logo */}
            <Image source={require('../components/img/Login.png')}
                style={{
                    alignItems: 'center',
                    width: '50%',
                    height: '25%',
                }} />

            {/*Email */}
            <FormInput labelText="Email" placeholderText="Ingrese su Email"
                onChangeText={value => {
                    setEmail(value)
                    setErrorEmail('')
                  }}
                value={email.trimStart()}
                keyboardType={'email-address'}
                errorMessage={errorEmail}
                />
                <Text style={styles.errorMessage}>{errorEmail}</Text>
            {/*Password */}
            <FormInput labelText="Password" placeholderText="Ingrese su Password"
                onChangeText={value => {
                    setPassword(value)
                    setErrorPassword('')
                  }}
                value={password.trimStart()}
                secureTextEntry={true}
                errorMessage={errorPassword}
            />
            <Text style={styles.errorMessage}>{errorPassword}</Text>
            {/*Button */}
            <FormButton
                labelText='Login'
                handleOnPress={handleOnSubmit}
                style={{ width: '100%' }}
            />
            {/*Footer */}
            <View style={styles.styleFooter}>
                <Text>No tiene una cuenta? </Text>
                <Text style={styles.styleFooterText}
                    onPress={() => navigation.navigate('SignUpScreen')}>Crear una cuenta</Text>
            </View>

            <View style={styles.styleFooter}>
                <Text>Olvido la contraseña? </Text>
                <Text style={styles.styleFooterText}
                    onPress={() => navigation.navigate('Reestablish')}>Recuperar</Text>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    gradient: {
        width: '100%',
        height: '30%',
    },
    content: {
        backgroundColor: COLORS.white,
        flex: 1,
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

export default SignInScreen

