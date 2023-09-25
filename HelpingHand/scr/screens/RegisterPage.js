import { View, TextInput, StyleSheet, Button, Alert, Text, Image } from "react-native";
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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

   
        <Image source={logo} style={styles.logoStyle}></Image>


      <View style={styles.quoteStyle}>
        <Text style={{ textAlign: "center" }}>"The best way to find yourself is to lose yourself in the service of others." - Mahatma Gandhi</Text>
      </View>

      <TextInput style={styles.input} placeholder="Name" onChangeText={onChangeName} value={nameText} />
      <TextInput style={styles.input} placeholder="email" onChangeText={onChangeEmail} value={emailText} />
      <TextInput style={styles.input} onChangeText={onChangePass} value={pass} secureTextEntry={true} placeholder="password" />
      <Button title="Submit" onPress={toRegister}></Button>

      <Text style={{ marginTop: 10 }}>Or Continue With</Text>
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

  quoteStyle: {
    alignContent: "center",
    marginBottom: 10,
    marginTop: 10,
    padding: 5,
  },

  logoStyle: {
    width: 200,
    height: 200,
    borderRadius: 100, // Set borderRadius to half the width/height to make it circular
    borderWidth: 2, // Add a border width
    shadowColor: '#ff0000',
    // elevation: 20,
    shadowOffset: {
      height: 3,
      width: 3
    },
    // shadowRadius: 0.5,
    // shadowOpacity: 0.8
    // borderColor: "black", // Specify the border color
  },
});
