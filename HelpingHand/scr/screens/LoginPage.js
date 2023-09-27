import { View, TextInput, StyleSheet, TouchableOpacity, Alert, Text, Image, SafeAreaView, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { editUserToken, loginUser } from "../store/actions/actionCreator";
const baseUrl = "https://31b7-114-122-110-8.ngrok-free.app";
import logo from "../../assets/cropped_logo.png";

export default function Login({ navigation }) {
  const dispatch = useDispatch();

  const [text, onChangeText] = useState("");
  const [pass, onChangePass] = useState("");

  const toLogin = () => {
    const loginForm = {
      email: text,
      password: pass,
    };
    dispatch(loginUser(loginForm))
      .then((data) => {
        console.log(data);
        Alert.alert("Login Success", `Welcome ${data.name}`, [
          {
            text: "OK",
            style: "OK",
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Login Failed", err.message, [
          {
            text: "OK",
            style: "cancel",
          },
        ]);
        console.log(err);
      });
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const currToken = await SecureStore.getItemAsync("access_token");
        console.log(currToken);
        if (currToken.length > 0 || !currToken === false) {
          dispatch(editUserToken(currToken));
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkToken();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* content */}
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logoStyle}></Image>
          </View>

          <View style={styles.quoteStyle}>
            <Text style={{ textAlign: "center" }}>"The best way to find yourself is to lose yourself in the service of others." - Mahatma Gandhi</Text>
          </View>

          {/* form login */}
          <View style={styles.formContainer}>
            <TextInput style={styles.input} placeholder="email" onChangeText={onChangeText} value={text} />

            <TextInput style={styles.input} placeholder="password" onChangeText={onChangePass} value={pass} secureTextEntry={true} />
            <TouchableOpacity style={styles.buttonStyle} onPress={toLogin}>
              <Text style={{ color: "#FFFFFF", textAlign: "center" }}>Submit</Text>
            </TouchableOpacity>
          </View>

          <Text style={{ marginBottom: 10 }}>Don't have an account? Click here to sign up!</Text>

          <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: "#FFFFFF", textAlign: "center" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  logoContainer: {
    flex: 1,
    width: 200,
    height: 200,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  logoStyle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: "contain",
  },

  formContainer: {
    marginTop: 20,
    marginBottom: 20,
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
