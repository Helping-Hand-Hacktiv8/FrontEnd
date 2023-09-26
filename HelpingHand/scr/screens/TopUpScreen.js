import { useState } from "react";
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { handleMidtrans, topUpToken } from "../store/actions/actionCreator";

export default function TopUpScreen({ navigation }) {
  const dispatch = useDispatch()
  const [input, setInput] = useState(0)

  const submitToken = () => {
    dispatch(handleMidtrans(input))
      .then(data => {
        return navigation.navigate('PaymentScreen', {
          url: data.redirect_url,
          token: data.token
        })
      })
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={styles.textTittle}>
        <Text style={{ textAlign: "center" }}>Enter Amount</Text>
      </View>
      <View style={styles.textTittle}>
        <Text style={{ textAlign: "center" }}>1 token = Rp20,000</Text>
      </View>
      <View style={styles.textContainer}>
        <TextInput style={{ textAlign: "center" }} keyboardType="numeric" value={input} onChangeText={setInput} />
      </View>

      {/* Submit and Cancle */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={() => {
          submitToken()
        }}>
          <Text style={{textAlign: 'center'}}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.cancelButton, {marginLeft: 10}]}>
          <Text style={{textAlign: 'center'}}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    backgroundColor: "#9C8F8E",
    padding: 10,
    borderRadius: 30,
    width: 300,
  },

  textTittle: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    marginBottom: 10,
  },

  buttonContainer: {
    flexDirection: "row", // Menjadikan dua kolom dengan mengatur arah flex menjadi 'row'
    justifyContent: "space-between", // kasih ruang diantara dua button
    alignItems: "center", // Menengahkan vertikal
  },

  submitButton: {
    backgroundColor: "#3CA82E",
    padding: 10,
    borderRadius: 20,
    width: 100,
  },

  cancelButton: {
    backgroundColor: "#A5241F",
    padding: 10,
    borderRadius: 20,
    width: 100,
  },
});
