import React, { useState } from "react";
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function EditProfile({ navigation }) {
  const [newUsername, setNewUsername] = useState("");

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

  const handleSaveProfile = () => {
    console.log(formData)
  }
  
  const deleteAccountHandler = () => {
    console.log(`akun kedelete hehe`);
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Profile Image */}
        <TouchableOpacity >
          <Image
            source={user.profileImg } // Gunakan gambar profil baru jika ada, jika tidak gunakan yang lama
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
        <Text style={styles.textTitle}>Edit Profile Image</Text>
        <TouchableOpacity style={styles.buttonContainer} >
          <Text style={{ textAlign: "center" }}>Choose Image</Text>
        </TouchableOpacity>

        {/* Edit Username */}
        <Text style={styles.textTitle}>Edit Username</Text>
        <TextInput style={styles.textContainer} onChangeText={(text) => setFormData({ ...formData, newUsername: text })} placeholder={user.name} value={formData.newUsername} />

        {/* Edit Email */}
        <Text style={styles.textTitle}>Edit Email</Text>
        <TextInput style={styles.textContainer} onChangeText={(text) => setFormData({ ...formData, newEmail: text })} placeholder={user.email} value={formData.newEmail} />

        {/* Edit Pasword */}
        <Text style={styles.textTitle}>Edit Password</Text>
        <TextInput style={styles.textContainer} onChangeText={(text) => setFormData({ ...formData, newPassword: text })} placeholder="**********" value={formData.newPassword} secureTextEntry={true}/>

            {/* Edit Phone Number */}
        <Text style={styles.textTitle}>Edit Phone Number</Text>
        <TextInput style={styles.textContainer} onChangeText={(text) => setFormData({ ...formData, newPhoneNumber: text })} placeholder={user.phoneNumber} value={formData.newPhoneNumber} />

        {/* Save Button */}
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSaveProfile}>
          <Text style={{ textAlign: "center" }}>Save</Text>
        </TouchableOpacity>

         {/* Delete My Account */}
         <TouchableOpacity style={styles.buttonContainer} onPress={deleteAccountHandler}>
          <Text style={{ textAlign: "center" }}>Delete My Account</Text>
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
  textTitle: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
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
});
