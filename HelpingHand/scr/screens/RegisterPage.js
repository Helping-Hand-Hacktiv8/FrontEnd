import { View, TextInput, StyleSheet, TouchableOpacity, Button, Alert, Text, Image, ScrollView } from "react-native";
import { useState } from "react";
import logo from "../../assets/cropped_logo.png";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/actions/actionCreator";

export default function Register({ navigation }) {
  const dispatch = useDispatch();

  const [nameText, onChangeName] = useState("");
  const [emailText, onChangeEmail] = useState("");
  const [pass, onChangePass] = useState("");

  const toRegister = () => {
    const registerForm = {
      name: nameText,
      email: emailText,
      password: pass,
    };

    dispatch(registerUser(registerForm))
      .then((data) => {
        console.log(data);
        Alert.alert("Success", data.message, [
          {
            text: "OK",
            style: "OK",
          },
        ]);
        return navigation.navigate("Login");
      })
      .catch((err) => {
        Alert.alert("Error", err.message, [
          {
            text: "OK",
            style: "cancel",
          },
        ]);
        console.log(err.message);
      });
  };
  return (

      <View style={styles.container}>
        <Image source={logo} style={styles.logoStyle}></Image>

        <View style={styles.quoteStyle}>
          <Text style={{ textAlign: "center" }}>"The best way to find yourself is to lose yourself in the service of others." - Mahatma Gandhi</Text>
        </View>

        <TextInput style={styles.input} placeholder="Name" onChangeText={onChangeName} value={nameText} />
        <TextInput style={styles.input} placeholder="email" onChangeText={onChangeEmail} value={emailText} />
        <TextInput style={styles.input} onChangeText={onChangePass} value={pass} secureTextEntry={true} placeholder="password" />
        <TouchableOpacity style={styles.buttonStyle} onPress={toRegister}>
          <Text style={{ color: "#FFFFFF", textAlign: "center" }}>Submit</Text>
        </TouchableOpacity>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",

  },

  logoStyle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: "contain",
  },

  input: {
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    width: 200,
    borderRadius: 100,
    justifyContent: "center",
  },

  quoteStyle: {
    alignContent: "center",
    marginBottom: 10,
    marginTop: 10,
    padding: 5,
  },

  buttonStyle: {
    backgroundColor: "#1C95BD",
    borderRadius: 50,
    padding: 10,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});
