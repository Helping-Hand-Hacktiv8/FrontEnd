import { useState } from "react";
import { View, TextInput, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; //https://github.com/react-native-datetimepicker/datetimepicker
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; //https://github.com/react-native-maps/react-native-maps
import {enableLatestRenderer} from 'react-native-maps';
import { Button } from "@rneui/base";


enableLatestRenderer();
export default function AddRequest() {
  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date ());

  const [FromMode, setFromMode] = useState("date");
  const [ToMode, setToMode] = useState("date");

  const [FromShow, setFromShow] = useState(false);
  const [ToShow, setToShow] = useState(false);

  const onChangeFromDate = (event, selectedDate) => {
    const currentFromDate = selectedDate;
    setFromShow(false);
    setFromDate(currentFromDate);
  };
  const onChangeToDate = (event, selectedDate) => {
    const currentToDate = selectedDate;
    setToShow(false);
    setToDate(currentToDate);
  };

  const showFromMode = (currentMode) => {
    setFromShow(true);
    setFromMode(currentMode);
  };
  const showToMode = (currentMode) => {
    setToShow(true);
    setToMode(currentMode);
  };

  const showFromDatepicker = () => {
    showFromMode("date");
  };
  const showToDatepicker = () => {
    showToMode("date");
  };
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
        Add Request
      </Text>
      <View style={{ alignItems: "center" }}>
        <Text>Title</Text>
        <TextInput
          placeholder={"title"}
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            width: 200,
          }}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text>Descriptions</Text>
        <TextInput
          placeholder={"description"}
          multiline={true}
          style={{
            height: 70,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            width: 200,
          }}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row", width: 150 }}>
          <Text>From</Text>
          <View style={{ flexGrow: 1 }} />
          <Text style={{ paddingRight: 10 }}>To</Text>
        </View>

        <View style={{flexDirection:'row', alignItems: "center" }}>
          <TextInput onFocus={showFromDatepicker} 
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            width: 100,
          }}>{FromDate.toLocaleDateString('id-ID')} </TextInput>
           <TextInput onFocus={showToDatepicker} 
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            width: 100,
          }}>{ToDate.toLocaleDateString('id-ID')} </TextInput>
          {FromShow && (
            <DateTimePicker
              testID="FromDatePicker"
              value={FromDate}
              mode={FromMode}
              onChange={onChangeFromDate}
            />
          )}
          {ToShow && (
            <DateTimePicker
              testID="ToDatePicker"
              value={ToDate}
              mode={ToMode}
              onChange={onChangeToDate}
            />
          )}
        
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row", width: 180 }}>
          <Text>Rewards</Text>
          <View style={{ flexGrow: 1 }} />
          <Text style={{ paddingRight: 10 }}>Image</Text>
        </View>

        <View style={{flexDirection:'row', alignItems: "center" }}>
          <TextInput 
          placeholder={"ex: 50, 100"}
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            width: 100,
          }}
          keyboardType='numeric'
          ></TextInput>
           <TextInput 
          placeholder={"url"}
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            width: 100,
          }}
          ></TextInput>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text>Participants</Text>
        <TextInput
          placeholder={"participants"}
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            width: 200,
          }}
          keyboardType="numeric"
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text>Map</Text>
        <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: -6.200000,
         longitude: 106.816666,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
       }}
     >
     </MapView>
   </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text>Search Place</Text>
        <TextInput
          placeholder={"address"}
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            width: 200,
          }}
        />
        <TouchableOpacity>
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex:1, justifyContent:'center', alignItems:'center', marginVertical:15}}>
      <Button title="Submit" buttonStyle={{borderRadius:10}}/>

      </View>
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