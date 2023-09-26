import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert, ScrollView, Image, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { editUserToken } from "../store/actions/actionCreator";

export default function ProfilePage({ navigation }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return state.user;
  });

  const [editingPassword, setEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const handleChat = () => {
    console.log("Chat button clicked");
  };

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("access_token");
      dispatch(editUserToken(""));
    } catch (err) {
      console.log(err);
    }
  };

  console.log(user);
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* untuk profile photo */}
        <View style={{flex: 1}}>
          <Image
            source={{uri: user.profileImg}}
            style={{
              width: 150,
              height: 150,
              paddingTop: 5,
              marginBottom: 5,
              marginTop: 10,
              borderRadius: 100,
              borderColor: "black",
            }}
          />
        </View>

        {/* username */}
        <Text style={styles.textTittle}>Username</Text>
        <Text style={styles.textContainer}>{user.name}</Text>

        {/* Email */}
        <Text style={styles.textTittle}>Email</Text>
        <Text style={styles.textContainer}>{user.email}</Text>

        {/* password */}
        <Text style={styles.textTittle}>Password</Text>
        <Text style={styles.textContainer}>*************</Text>

        {/* edit button */}
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={{textAlign: 'center'}}>Edit Profile</Text>
        </TouchableOpacity>

        {/* points group */}
        <View style={styles.pointsContainer}>
          
          <TouchableOpacity style={styles.pointsButtons}>
            <Text style={{textAlign: 'center'}}>Add Points</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.pointsButtons}>
            <Text style={{textAlign: 'center'}}>Points: {user.token}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.chatButton}>
          <Text style={{textAlign: 'center'}}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.chatButton} onPress={handleLogout}>
          <Text style={{textAlign: 'center'}}>Logout</Text>
        </TouchableOpacity>


      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  textContainer: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#9C8F8E",
    padding: 10,
    borderRadius: 30,
    width: 300,
  },

  textTittle: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },

  buttonContainer: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#DDA343",
    padding: 10,
    borderRadius: 30,
    width: 100,
  },

  pointsContainer: {
    flexDirection: "row", // Menjadikan dua kolom dengan mengatur arah flex menjadi 'row'
    justifyContent: "space-between", // kasih ruang diantara dua button
    alignItems: "center", // Menengahkan vertikal
  },

  pointsButtons: {
    marginTop: 20,
    backgroundColor: "#FADB5E",
    padding: 10,
    borderRadius: 20,
    width: 100,
  },

  chatButton: {
    marginTop: 20,
    backgroundColor: "#DC6C3C",
    padding: 10,
    borderRadius: 20,
    width: 100,
  }
});
