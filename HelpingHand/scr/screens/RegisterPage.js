import { View, TextInput, StyleSheet, Button} from "react-native"
import { useState } from "react";



export default function Register(){
    const [text, onChangeText] = useState('');
    const [pass, onChangeNumber] = useState('');
  return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
       <TextInput
       
      style={styles.input}
      placeholder="email"
      onChangeText={onChangeText}
      value={text}
    />
    <TextInput
      style={styles.input}
      onChangeText={onChangeNumber}
      value={pass}
      secureTextEntry={true}
      placeholder="password"
    />
    <Button title='submitRegister'></Button>
      </View>
  )
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width:200
      },
});