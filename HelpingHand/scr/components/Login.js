import * as React from "react";
import { SafeAreaView, TextInput, StyleSheet, Button } from "react-native";
import { useState } from "react";

export default function LoginComp({}) {
  return (<SafeAreaView>
    <TextInput 
    style={styles.input}
    placeholder="email"
    onChangeText={onChangeText}
    value={text}
    />

    <TextInput 
    style={styles.input}
    onChange={onChangeText}
    value={text}
    placeholder="password"
    />

  </SafeAreaView>)
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10
    }
})