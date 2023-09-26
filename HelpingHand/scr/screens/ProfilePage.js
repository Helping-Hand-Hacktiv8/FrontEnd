import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert, ScrollView, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { asyncFetchSingleUser, editUserToken } from "../store/actions/actionCreator";
import { useFocusEffect } from "@react-navigation/native";

export default function ProfilePage({ navigation }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return state.user;
  });

  const [editingPassword, setEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  let [userId, setUserId] = useState(0)

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
  }

  useFocusEffect(
    useCallback(() => {
      async function getUser() {
        let getId = await SecureStore.getItemAsync("user_id");
        setUserId(getId)
        dispatch(asyncFetchSingleUser(userId))
          .then(() => {
            setIsLoading(false)
          })
          .catch(err=>{
            console.log('ERR',err)
          })
      }

      getUser()
    }, [userId])
  )

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ActivityIndicator size="large" color={"#312651"} />
      </SafeAreaView>
    );
  } else {
    return (
      <ScrollView>
        <View style={styles.container}>
          {/* untuk profile photo */}
          <View style={{ flex: 1 }}>
            <Image
              source={{ uri:'https://e04e-114-122-106-150.ngrok-free.app'+'/static/'+ user.profileImg }}
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
          <TouchableOpacity style={styles.buttonContainer} onPress={() => {
            return navigation.navigate("EditProfile")
          }} >

            <Text style={{ textAlign: 'center' }}>Edit Profile</Text>
          </TouchableOpacity>

          {/* points group */}
          <View style={styles.pointsContainer}>

            <TouchableOpacity style={styles.pointsButtons} onPress={() => {
              return navigation.navigate("TopUpScreen")
            }}>
              <Text style={{ textAlign: 'center' }}>Add Points</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.pointsButtons}>
              <Text style={{ textAlign: 'center' }}>Points: {user.token}</Text>
            </TouchableOpacity>
          </View>


          <TouchableOpacity style={styles.chatButton} onPress={handleLogout}>
            <Text style={{ textAlign: 'center' }}>Logout</Text>
          </TouchableOpacity>



        </View>
      </ScrollView>
    );
  }
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