import { View, Text, SafeAreaView, StyleSheet, StatusBar, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { signOut } from '../utils/auth'
import FormButton from '../components/shared/FormButton'
import { COLORS } from '../constants/theme'
import { getQuizzes } from '../utils/database'

const HomeScreen = ({navigation}) => {
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getAllQuizzes = async () =>{
    setRefreshing(true);
    const quizzes = await getQuizzes();

    //Transform quiz data
let tempQuizzes = [];
await quizzes.docs.forEach(async quiz => {
  await tempQuizzes.push({id: quiz.id, ...quiz.data()});
});
await setAllQuizzes([...tempQuizzes]);

setRefreshing(false);

  };

  useEffect(()=>{
    getAllQuizzes()
  },[])

  return (
    <SafeAreaView style={styles.content}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'}/>

<View style={styles.stylesStatusBar}>
<Text style={{fontSize: 20}}>Quiz App</Text>
<Text style={{fontSize:20, padding:10, color:COLORS.error}}
onPress={signOut}>Salir</Text>
</View>

{/*Quiz List */}
<FlatList
data={allQuizzes}
onRefresh={getAllQuizzes}
refreshing={refreshing}
showsVerticalScrollIndicator={false}
style={{paddingVertical:20,}}
renderItem={({item: quiz})=>(
  <View style={styles.styleList}>
    <View style={{flex:1, paddingRight:10}}>
      <TouchableOpacity
      onPress={()=>{
        navigation.navigate('DatailScreen',{
          quizId: quiz.id,
        })
      }}>
      <Text style={{fontSize:18, color:COLORS.black}}>{quiz.title}</Text>
      {
        quiz.description != '' ? (
          <Text style={{opacity:0.5}}>{quiz.description}</Text>
        ):null
      }
      </TouchableOpacity>
    </View>
<TouchableOpacity style={styles.stylePlay} 
onPress={()=>{
  navigation.navigate('PlayQuizScreen',{
    quizId: quiz.id,
  })
}}>
<Text style={{color:COLORS.primary}}>Play</Text>  
  </TouchableOpacity>    
  </View>
)}
/>
{/*Button */}
<FormButton
labelText='Create Quiz'
style={styles.styleButton}
handleOnPress={() => navigation.navigate('CreateQuizScreen')}
/>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  content:{
    flex:1,
    backgroundColor:COLORS.background,
    position:'relative',
  },
  stylesStatusBar:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
    backgroundColor:COLORS.white,
    elevation:4,
    paddingHorizontal: 20,
  },
  styleList:{
    padding:20,
    borderRadius:5,
    marginVertical:5,
    marginHorizontal: 10,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-between',
    backgroundColor:COLORS.white,
    elevation:2,
  },
  stylePlay:{
    paddingVertical:10,
    paddingHorizontal:30,
    borderRadius: 50,
    backgroundColor:COLORS.primary + '20',

  },
  styleButton:{
    position:'absolute',
    bottom:20,
    right: 20,
    borderRadius: 50,
    paddingHorizontal:30,
  }
})

export default HomeScreen