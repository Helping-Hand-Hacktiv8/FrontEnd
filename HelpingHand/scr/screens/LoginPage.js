import { View, TextInput, StyleSheet, Button } from "react-native";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { useDispatch } from "react-redux";
import { editUserToken } from "../store/actions/actionCreator";
const baseUrl = "https://31b7-114-122-110-8.ngrok-free.app";

export default function Login({ navigation }) {
  const dispatch = useDispatch();

  const [text, onChangeText] = useState("");
  const [pass, onChangePass] = useState("");

  const toLogin = async () => {
    try {
      console.log(text, pass);
      const { data } = await axios({
        method: "POST",
        url: baseUrl + "/login",
        data: {
          email: text,
          password: pass,
        },
      });
      const currToken = await SecureStore.getItemAsync("access_token");
      if (!currToken || currToken == "") await SecureStore.setItemAsync("access_token", data.access_token);
      dispatch(editUserToken(data.access_token));
    } catch (err) {
      console.log("toLogin", err);
    }
  };

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
