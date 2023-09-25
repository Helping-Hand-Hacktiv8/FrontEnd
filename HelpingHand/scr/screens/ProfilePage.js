import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { editUserToken } from "../store/actions/actionCreator";

export default function ProfilePage({navigation}) {
  const dispatch = useDispatch()
  const { user } = useSelector((state)=>{
    return state.user
  })

  const [editingPassword, setEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");


  const togglePasswordEditing = () => {
    setEditingPassword(!editingPassword);
  };

  const handleChangePassword = () => {

    if (newPassword) {

      console.log("Password updated");
      setEditingPassword(false);
    } else {
      console.log("New password cannot be empty");
    }
  };

  const handleChat = () => {

    console.log("Chat button clicked");
  };

  const handleLogout = async () => {
    try{
      await SecureStore.deleteItemAsync('access_token')
      dispatch(editUserToken(''))

    } catch(err){
      console.log(err)
    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Page</Text>
      <Text>Username: {user.name}</Text>
      <Text>Email: {user.email}</Text>

      {editingPassword ? (
        <View>
          <Text>New Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            secureTextEntry={true}
            onChangeText={(text) => setNewPassword(text)}
            value={newPassword}
          />
          <Button title="Save Password" onPress={handleChangePassword} />
        </View>
      ) : (
        <Button title="Change Password" onPress={togglePasswordEditing} />
      )}

      <Text>Your Points: {user.token}</Text>
      <Text>Contribution History: {user.contributionHistory}</Text>

      <Button title="Chat" onPress={handleChat} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
});
