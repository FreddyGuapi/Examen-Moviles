import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../constants/theme';
import FormInput from '../components/shared/FormInput';
import FormButton from '../components/shared/FormButton';
import { signIn } from '../utils/auth';

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleOnSubmit = () => {
        if (email != '' && password != '') {
            signIn(email, password);
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
                onChangeText={value => setEmail(value)}
                value={email}
                keyboardType={'email-address'}
            />
            {/*Password */}
            <FormInput labelText="Password" placeholderText="Ingrese su Password"
                onChangeText={value => setPassword(value)}
                value={password}
                secureTextEntry={true}
            />
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
                    onPress={() => navigation.navigate('SignUpScreen')}>Recuperar</Text>
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

