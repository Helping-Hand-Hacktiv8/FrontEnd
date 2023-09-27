import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, TextInput, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useDispatch } from "react-redux";
import { asyncFetchSingleActivity } from "../store/actions/actionCreator";



const initialLat = -6.200000
const initialLng = 106.816666

export default function Monitor({route}) {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation()
  const id = route.params.id
 
  useEffect(async () => { 
    if (isLoading) { 
     const data = await dispatch(asyncFetchSingleActivity(id))
        
    }
  })


  return (
    <ScrollView>

    <View style={{ flex: 1 }}>
      <Text
        style={{
          textAlign: "center",
          fontStyle: "italic",
          fontWeight: "800",
          fontSize: 25,
          padding: 10,
        }}
      >
        Monitor Request
      </Text>
      
    </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 300,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding:10,
    alignSelf:'center'

  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });