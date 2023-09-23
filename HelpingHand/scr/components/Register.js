import * as React from "react";
import { SafeAreaView, TextInput, StyleSheet, Button} from "react-native";
import { useState } from "react";
export default function RegisterComp({  }) {
 

  return (
    <SafeAreaView>
    <TextInput
      style={styles.input}
      placeholder="email"
      onChangeText={onChangeText}
      value={text}
    />
    <TextInput
      style={styles.input}
      onChangeText={onChangeNumber}
      value={number}
      placeholder="password"
      keyboardType="numeric"
    />
    <Button title='submitRegister'></Button>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
});
