import { Dimensions } from "react-native";
const {width, height} = Dimensions.get('window');

export const COLORS = { 
    primary: '#20948B',
    secondary: '#000020',

    success: '#00C851',
    error: '#ff4444',

    black: '#171717',
    white: '#ffffff',
    background: '#f4f4f4',
    border: '#f5f5f7'
};

export const SIZES ={
    base: 10,
    width,
    height,
};
