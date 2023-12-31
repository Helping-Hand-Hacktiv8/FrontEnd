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

  const [isLoading, setIsLoading] = useState(true);
  let [userId, setUserId] = useState(0);

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("access_token");
      dispatch(editUserToken(""));
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      async function getUser() {
        let getId = await SecureStore.getItemAsync("user_id");
        setUserId(getId);
        dispatch(asyncFetchSingleUser(userId))
          .then(() => {
            setIsLoading(false);
          })
          .catch((err) => {
            console.log("ERR", err);
          });
      }

      getUser();
    }, [userId])
  );

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
          <View style={styles.containerInfoAndPoints}>
            {/* untuk profile photo */}
            <View style={{ flex: 1 }}>
              <Image
                source={{ uri: "https://helping-hand-server.blekzzz.com" + "/static/" + user.profileImg }}
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
            <View style={styles.nameContainer}>
              <Text>{user.name}</Text>
            </View>

            {/* Email */}
            <View style={styles.emailContainer}>
              <Text>{user.email}</Text>
            </View>

            {/* points */}
            <View style={styles.pointContainer}>
            <Text>{user.token} Point(s)</Text>
            </View>
          </View>

          <View style={styles.bracketContainer}>
            <Text>Feature</Text>
          </View>

          <View style={styles.contentContainer}>
            <TouchableOpacity
              onPress={() => {
                return navigation.navigate("TopUpScreen");
              }}
            >
              <Text style={styles.contentAndSettingsText}>🪙 Add Points</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bracketContainer}>
            <Text>Settings</Text>
          </View>

          <View style={styles.contentContainer}>
            {/* edit button */}
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                return navigation.navigate("EditProfile");
              }}>
              <Text style={styles.contentAndSettingsText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chatButton} onPress={handleLogout}>
              <Text style={styles.contentAndSettingsText}>Logout</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerInfoAndPoints: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDFDFD",
    paddingBottom: 20, // Add some padding to create a margin at the bottom
  },

  imageContainer: {
    width: 200,
    height: 200,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 100,
    borderColor: "black",
  },

  editContainer: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#0084B0",
    padding: 10,
    borderRadius: 30,
    width: 150,
    color: "#EFF4F5",
  },

  bracketContainer: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    fontStyle: "italic",
    fontWeight: "400",
  },

  contentContainer: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    paddingVertical: 20,
    flexDirection: "column",
    justifyContent: "center",
  },

  nameContainer: {
    fontSize: 18,
    marginLeft: 5,
    fontWeight: "500",
    color: "black",
    padding: 5,
    borderRadius: 20,
  },

  pointContainer: {
    fontSize: 18,
    marginLeft: 5,
    fontWeight: "500",
    color: "black",
    padding: 5,
    borderRadius: 20,
    marginTop: 10
  },

  emailContainer: {
    fontSize: 18,
    marginLeft: 5,
    fontWeight: "500",
    color: "black",
    padding: 5,
    borderRadius: 20,
    marginTop: 10
  },

  contentAndSettingsText: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    fontWeight: "400",
    color: "black",
  }


});
