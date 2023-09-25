import { View, TextInput, StyleSheet, Button, Alert } from "react-native";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { editUserToken, loginUser } from "../store/actions/actionCreator";
const baseUrl = "https://31b7-114-122-110-8.ngrok-free.app";

export default function Login({ navigation }) {
  const dispatch = useDispatch();

  const [text, onChangeText] = useState("");
  const [pass, onChangePass] = useState("");

  const toLogin = () => {
    const loginForm = {
      email: text,
      password: pass
    }
    dispatch(loginUser(loginForm))
    .then(data=>{
      console.log(data)
      Alert.alert('Login Success',`Welcome ${data.name}`, [
        {
          text: 'OK',
          style:'OK'
        }
      ])
    })
    .catch(err=>{
      console.log(err)
      Alert.alert('Login Failed',err.message, [
        {
          text: 'OK',
          style:'cancel'
        }
      ])
      console.log(err)
    })
  };

  useEffect(()=>{
    const checkToken = async() =>{
      try {
        const currToken = await SecureStore.getItemAsync('access_token')
        console.log(currToken)
        if(currToken.length > 0 || !currToken===false){
          dispatch(editUserToken(currToken))
        }
      } catch (error) {
        console.log(error)
      }
    }
    checkToken()
  },[])

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput style={styles.input} placeholder="email" onChangeText={onChangeText} value={text} />

      <TextInput style={styles.input} placeholder="password" onChangeText={onChangePass} value={pass} secureTextEntry={true} />
      <Button title="submitLogin" onPress={toLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
});
