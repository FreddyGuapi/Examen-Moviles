import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert, ToastAndroid } from 'react-native'
import { firebase } from '@react-native-firebase/auth';
import FormButton from '../components/shared/FormButton';
import FormInput from '../components/shared/FormInput';
import { COLORS } from '../constants/theme';

const Reestablish = ({navigation}) => {
    const [email, setEmail] = useState('')

    const [errorEmail, setErrorEmail] = useState('')

    const validar = () => {
        let error = false
        setErrorEmail('')
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(String(email).toLowerCase())) {
            setErrorEmail("Ingrese un correo valido")
            error = true
        }
        return !error
    }

    const enviar = () => {
        if (validar()) {
            if (email === '') {
                Alert.alert('!ADVERTENCIA¡', 'No ha ingresado ningun correo electronico')
            } else {
                firebase.auth().sendPasswordResetEmail(email)
                    .then(() => {
                        // Password reset email sent!
                        // ..
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                    });
                    setEmail('')
                    ToastAndroid.show('Revisé su correo electrónico', ToastAndroid.SHORT);
            }
        }
    }


    return (
        <View style={{
            flex: 1,
            position: 'relative',
            backgroundColor: COLORS.white,
        }}>
            <View style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: COLORS.white,
                elevation: 4,
            }}>
                <Text style={{ textTransform: 'uppercase', color: COLORS.black, fontSize: 15 }}>Recuperar tu cuenta</Text>
            </View>

            <View style={{ padding: 20 }}>
                <FormInput
                    labelText="Introduce tu correo electrónico para recuperar tu cuenta."
                    placeholderText="Ingrese su correo electrónico"
                    onChangeText={value => {
                        setEmail(value)
                        setErrorEmail('')
                    }}
                    value={email}
                    keyboardType={'email-address'}
                    errorMessage={errorEmail}
                />
                <Text style={styles.errorMessage}>{errorEmail}</Text>
                {/* Submit button */}
                <FormButton
                    labelText="Enviar"
                    handleOnPress={enviar}
                    style={{ width: '100%' }}
                />
                <View style={{ width: '100%', marginVertical: 10 }}>
                    <FormButton
                        labelText='Cancelar'
                        isPrimary={false}
                        handleOnPress={() => {
                            navigation.navigate('SignInScreen');
                        }} />
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    errorMessage: {
        color: 'red',
        marginTop: -20,
    }
});


export default Reestablish