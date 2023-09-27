import { useState } from "react";
import { View, TextInput, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; //https://github.com/react-native-datetimepicker/datetimepicker
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; //https://github.com/react-native-maps/react-native-maps
import {Marker, enableLatestRenderer} from 'react-native-maps';
import { Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native"
import searchIcon from "../../assets/search.png";
import * as ImagePicker from 'expo-image-picker';
import { asyncPostActivities } from "../store/actions/actionCreator";
import { useDispatch } from "react-redux";




const initialLat = -6.200000
const initialLng = 106.816666

enableLatestRenderer();
export default function AddRequest() {
  const dispatch =useDispatch()
  const navigation = useNavigation()
  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date ());

  const [FromMode, setFromMode] = useState("date");
  const [ToMode, setToMode] = useState("date");

  const [FromShow, setFromShow] = useState(false);
  const [ToShow, setToShow] = useState(false);

  const [search, setSearch] = useState("");
  const [result, setResult] = useState('')


  const [pin, setPin] = useState({
    latitude: -6.200000,
    longitude: 106.816666
  });

  const [formData, setFormData] = useState({
    newTitle: "",
    newDescription: null,
    newFromDate: "",
    newToDate: "",
    newLocation:'',
    newLat:'',
    newLon:'',
    newRewardPoints: "",
    newParticipants:"",
    newImageUrl: null
  });

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
 
    if (!result.canceled) {
      setFormData({ ...formData, newImageUrl: result });
    }
  };

  const handlePostAct = () => {
    const data = new FormData();
    data.append('name',formData.newTitle)
    data.append('description',formData.newDescription)
    data.append('fromDate',formData.newFromDate)
    data.append('toDate',formData.newToDate)
    data.append('participant',formData.newParticipants)
    data.append('reward',formData.newRewardPoints)
    data.append('location',formData.newLocation)
    data.append('lat',formData.newLat)
    data.append('lon',formData.newLon)
    data.append('photoAct', {
      name:'image.jpg',
      type:'image/jpeg',
      uri:formData.newImageUrl.assets[0].uri
    })
    console.log("disini>>>",formData)
    dispatch(asyncPostActivities(data))
    .then(()=>{
      return navigation.goBack()
    })
    .catch(err=>{
      console.log(err)
    })
   
  }


  const googleAPIkey='AIzaSyBqS7sw4CfzV-dHLQRcNCu4qo3R3HBWAXs'
  const searchPlaces = async () => {
    if(!search.trim().length) return

    const googleApisUrl ='https://maps.googleapis.com/maps/api/place/textsearch/json'
    const input = search.trim()
    const location = `${initialLat},${initialLng}&radius=1000`
    const url = `${googleApisUrl}?query=${input}&location=${location}&key=${googleAPIkey}`
    try {
      const response = await fetch(url)
      const json = await response.json()
      if(json && json.results){
        const coords = []
        for (const item of json.results) {
          coords.push({
            name:item.name,
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng,
          })
        }
        setResult(coords)
        setPin({
          latitude: coords[0].latitude,
          longitude: coords[0].longitude
        })
        setFormData({
          ...formData,
          newLocation: coords[0].name,
          newLat:coords[0].latitude,
          newLon:coords[0].longitude
        })
      }

    } catch (error) {
      console.log(error)
      
    }
  }


  const onChangeFromDate = (event, selectedDate) => {
    const currentFromDate = selectedDate;
    setFromShow(false);
    setFromDate(currentFromDate);
    setFormData({
      ...formData,
      newFromDate: currentFromDate
    })
  };
  const onChangeToDate = (event, selectedDate) => {
    const currentToDate = selectedDate;
    setToShow(false);
    setToDate(currentToDate);
    setFormData({
      ...formData,
      newToDate: currentToDate
    })
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
          onChangeText={(text) => setFormData({ ...formData, newTitle: text })}
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
          onChangeText={(text) => setFormData({ ...formData, newDescription: text })}
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
          <Text style={{ paddingRight: 10 }}>Participants</Text>
        </View>

        <View style={{flexDirection:'row', alignItems: "center" }}>
          <TextInput 
          onChangeText={(text) => setFormData({ ...formData, newRewardPoints: text })}
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
          keyboardType='numeric'
          onChangeText={(text) => setFormData({ ...formData, newParticipants: text })}
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
      <View style={{ alignItems: "center", marginVertical:5}}>
        <Text style={{marginBottom:5}}>Image</Text>
        <Button title={'Upload'} onPress={selectImage}/>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text>Map</Text>

        <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: pin.latitude,
         longitude: pin.longitude,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
       }}
     >
      <Marker
        draggable
        coordinate={pin}
        
        onDragEnd={(e) => {
          setPin(e.nativeEvent.coordinate);
        }} />
     </MapView>
   </View>
      </View>
      <View style={{ alignItems: "center" }}>
          <Text>Search Place</Text>
        <View style={{flexDirection:'row'}}>
        <TextInput
          placeholder={"address"}
          onChangeText={(text) => setSearch(text)}
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            width: 200,
          }}
        />
        <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                backgroundColor: "#FF7754",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={searchPlaces}
            >
              <Image
                source={searchIcon}
                resizeMode="contain"
                style={{
                  width: "50%",
                  height: "50%",
                  tintColor: "#F3F4F8",
                }}
              />
            </TouchableOpacity>
        </View>
    
      </View>
      <View style={{flex:1,flexDirection:'row', justifyContent:'center', alignItems:'center', marginVertical:15}}>
      <Button title="Submit" buttonStyle={{borderRadius:10}}  onPress={handlePostAct}/>
      <View style={{width:80}}/>
      <Button title="Cancel" color={'maroon'} buttonStyle={{borderRadius:10}}
      onPress={()=>{
        navigation.goBack()
      }}/>

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