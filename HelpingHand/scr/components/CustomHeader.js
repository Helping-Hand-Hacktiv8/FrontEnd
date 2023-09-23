import * as React from "react";
import { Image, Text, StyleSheet, View } from "react-native";

export default function CustomHeader({ props }) {
  console.log(props)
  return (
    <View style={{marginLeft:20, flex:1}}>
        <Text style={{fontWeight:'bold', fontSize:22, fontColor:'black'}}>
          {props.name}
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
