import { View, TextInput, StyleSheet, Button, Alert, Text, Image, SafeAreaView } from "react-native";
// import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
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
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={logo}
        style={{
          width: 200,
          height: 200,
        }}
      ></Image>

      <View style={styles.quoteStyle}>
        <Text style={{ textAlign: "center" }}>"The best way to find yourself is to lose yourself in the service of others." - Mahatma Gandhi</Text>
      </View>

      <TextInput style={styles.input} placeholder="email" onChangeText={onChangeText} value={text} />

      <TextInput style={styles.input} placeholder="password" onChangeText={onChangePass} value={pass} secureTextEntry={true} />
      <Button title="Submit" onPress={toLogin} />

      <Text style={{ marginTop: 10 }}>Or Continue With</Text>

      {/* Google Login */}
      <View>
        {/* <GoogleSigninButton size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} onPress={this._signIn} disabled={this.state.isSigninInProgress} 
        />; */}
      </View>

      <Text style={{ marginTop: 10 }}>Dont have an account? click here to sign up!</Text>

      <Button
        title="Sign Up"
        onPress={() => {
          return navigation.navigate("Register");
        }}
      />
    </SafeAreaView>
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

  logo,
});
