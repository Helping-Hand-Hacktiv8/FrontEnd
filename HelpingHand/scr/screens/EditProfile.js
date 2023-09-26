import React, { useState } from "react";
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from "react-native";

export default function EditProfile({ navigation }) {
  const [newUsername, setNewUsername] = useState("");
  const [newProfileImage, setNewProfileImage] = useState(null); // Gunakan null atau URL gambar profil yang ada

  // Fungsi untuk mengganti gambar profil
  const handleChooseProfileImage = () => {
    // Implementasikan logika pemilihan gambar profil di sini
    // Anda dapat menggunakan library seperti 'react-native-image-picker' atau lainnya
  };

  // Fungsi untuk menyimpan perubahan profil
  const handleSaveProfile = () => {
    // Implementasikan logika penyimpanan perubahan profil di sini
    // Misalnya, mengirim data perubahan ke server atau penyimpanan lokal
    // Setelah berhasil disimpan, Anda dapat mengubah state dan kembali ke halaman profil
    // navigation.navigate("ProfilePage");
  };

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <TouchableOpacity onPress={handleChooseProfileImage}>
        <Image
          source={{ uri: newProfileImage || user.profileImg }} // Gunakan gambar profil baru jika ada, jika tidak gunakan yang lama
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

      {/* Edit Username */}
      <Text style={styles.textTitle}>Edit Username</Text>
      <TextInput
        style={styles.textContainer}
        onChangeText={setNewUsername}
        placeholder="New Username"
        value={newUsername}
      />

      {/* Edit Profile Image */}
      <Text style={styles.textTitle}>Edit Profile Image</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleChooseProfileImage}
      >
        <Text style={{ textAlign: "center" }}>Choose Image</Text>
      </TouchableOpacity>

      {/* Save Button */}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleSaveProfile}
      >
        <Text style={{ textAlign: "center" }}>Save</Text>
      </TouchableOpacity>
    </View>
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
