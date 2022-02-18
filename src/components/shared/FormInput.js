import { View, Text,StyleSheet  } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { COLORS } from '../../constants/theme'

const FormInput = ({
    labelText = '',
    placeholderText = '',
    onchangeText = null,
    value = null,
    ...more
}  
) => {
  return (
    <View style={styles.content}>
        <Text>{labelText}</Text>
        <TextInput style={styles.buton}
        placeholder={placeholderText}
        onChangeText={onchangeText}
        value={value}
        {...more}
        />
      
    </View>
  );
};

const styles = StyleSheet.create({
    content:{
        width: '100%',
        marginBottom: 20
    },

    buton:{
        padding: 10,
        borderColor:COLORS.black+'20',
        borderWidth: 1,
        width: '100%',
        borderRadius:5,
        marginTop:10,
    }
})

export default FormInput;