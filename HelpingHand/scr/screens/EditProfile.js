import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { asyncPutUserProfile } from "../store/actions/actionCreator";

export default function EditProfile({ navigation }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return state.user;
  });

  const [formData, setFormData] = useState({
    newUsername: "",
    newProfileImage: null,
    newEmail: "",
    newPassword: "",
    newPhoneNumber: "",
  });

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, newProfileImage: result });
    }
  };

  const handleSaveProfile = () => {
    const data = new FormData();
    data.append("name", formData.newUsername);
    data.append("email", formData.newEmail);
    data.append("password", formData.newPassword);
    data.append("phoneNumber", formData.newPhoneNumber);
    data.append("profileImg", {
      name: "image.jpg",
      type: "image/jpeg",
      uri: formData.newProfileImage.uri,
    });
    console.log("disini>>>", formData);
    dispatch(asyncPutUserProfile(data))
      .then(() => {
        // return navigation.navigate("ProfileStack");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        return navigation.navigate("ProfileStack")
      })
  };

  useEffect(() => {
    setFormData({
      newUsername: user.name,
      newProfileImage: user.profileImg,
      newEmail: user.email,
      newPassword: user.password,
      newPhoneNumber: user.phoneNumber,
    });
  }, []);

  const deleteAccountHandler = () => {
    console.log(`akun kedelete hehe`);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Profile Image */}
        <TouchableOpacity>
          <Image
            source={user.profileImg} // Gunakan gambar profil baru jika ada, jika tidak gunakan yang lama
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
        </TouchableOpacity>

        {/* Edit Profile Image */}
        <Text style={styles.textTitle}>Profile Image</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={selectImage}>
          <Text style={{ textAlign: "center", color: "white" }}>Choose Image</Text>
        </TouchableOpacity>

        {/* Edit Username */}
        <Text style={styles.textTitle}>Username</Text>
        <TextInput style={styles.textContainer} onChangeText={(text) => setFormData({ ...formData, newUsername: text })} placeholder={user.name} value={formData.newUsername} />

        {/* Edit Email */}
        <Text style={styles.textTitle}>Email</Text>
        <TextInput style={styles.textContainer} onChangeText={(text) => setFormData({ ...formData, newEmail: text })} placeholder={user.email} value={formData.newEmail} />

        {/* Edit Phone Number */}
        <Text style={styles.textTitle}>Phone Number</Text>
        <TextInput style={styles.textContainer} onChangeText={(text) => setFormData({ ...formData, newPhoneNumber: text })} placeholder={user.phoneNumber} value={formData.newPhoneNumber} />

        {/* Save Button */}
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSaveProfile}>
          <Text style={{ textAlign: "center", color: 'white' }}>Save Changes</Text>
        </TouchableOpacity>

        {/* Delete My Account */}
        <TouchableOpacity style={styles.buttonDelete} onPress={deleteAccountHandler}>
          <Text style={{ textAlign: "center", color: "white" }}>Delete My Account</Text>
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
    backgroundColor: "white"
  },
  textContainer: {
    fontSize: 18,
    marginBottom: 10,
    borderRadius: 30,
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
    width: 300
  },
  textTitle: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    paddingTop: 10,
  },
  buttonContainer: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#3AAACF",
    marginTop: 10,
    padding: 15,
    borderRadius: 30,
  },
  buttonDelete: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "red",
    marginTop: 15,
    padding: 15,
    borderRadius: 30,
    marginBottom: 50
  },
});
