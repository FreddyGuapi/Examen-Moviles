import auth from '@react-native-firebase/auth';
import { ToastAndroid } from 'react-native';

export const signIn = (email, password) =>{
    auth()
    .signInWithEmailAndPassword(email, password)
    .then(()=>{
        ToastAndroid.show('Logeado', ToastAndroid.SHORT);
    })
    .catch(err =>{
        console.log(err);
    });
}

export const signUp = (email, password) =>{
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(()=>{
        ToastAndroid.show('Registrado', ToastAndroid.SHORT);
    })
    .catch(err =>{
        console.log(err);
    })
}

export const signOut = () =>{
    auth()
    .signOut()
    .then(()=>{
        ToastAndroid.show('Cerrar Seción', ToastAndroid.SHORT);
    })
}