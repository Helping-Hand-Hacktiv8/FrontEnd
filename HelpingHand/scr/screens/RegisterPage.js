import { View, TextInput, StyleSheet, Button, Alert} from "react-native"
import { useState } from "react";

import { useDispatch } from "react-redux";
import { registerUser } from "../store/actions/actionCreator";


export default function Register({navigation}){
    const dispatch = useDispatch()


    const [nameText, onChangeName] = useState('');
    const [emailText, onChangeEmail] = useState('');
    const [pass, onChangePass] = useState('');

    const toRegister =  () =>{
      const registerForm = {
        name:nameText,
        email:emailText,
        password:pass
      }
   
      dispatch(registerUser(registerForm))
      .then(data=>{
        console.log(data)
        Alert.alert('Success',data.message, [
          {
            text: 'OK',
            style:'OK'
          }
        ])
        return navigation.navigate('Login')
      })
      .catch(err=>{
        Alert.alert('Error',err.message, [
          {
            text: 'OK',
            style:'cancel'
          }
        ])
        console.log(err.message)
      })
    }
  return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={onChangeName}
        value={nameText}
      />
       <TextInput
        style={styles.input}
        placeholder="email"
        onChangeText={onChangeEmail}
        value={emailText}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePass}
        value={pass}
        secureTextEntry={true}
        placeholder="password"
      />
    <Button title='submitRegister' onPress={toRegister}></Button>
      </View>
  )
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width:200
      },
});