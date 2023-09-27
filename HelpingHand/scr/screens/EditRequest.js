import { useState } from "react";
import { View, TextInput, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; //https://github.com/react-native-datetimepicker/datetimepicker
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; //https://github.com/react-native-maps/react-native-maps
import {Marker, enableLatestRenderer} from 'react-native-maps';
import { Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native"
import searchIcon from "../../assets/search.png";
import * as ImagePicker from 'expo-image-picker';
import { asyncPutActivities } from "../store/actions/actionCreator";
import { useDispatch } from "react-redux";
import { StackActions, NavigationActions } from 'react-navigation';

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'MyRequest' })],
});

 



enableLatestRenderer();
export default function EditRequest({route}) {
  const data = route.params.data
  console.log(data)
const initialLat = data.coordinate.coordinates[1]
const initialLng = data.coordinate.coordinates[0]
  const dispatch =useDispatch()
  const navigation = useNavigation()
  const [FromDate, setFromDate] = useState(new Date ());
  const [ToDate, setToDate] = useState(new Date());

  const [FromMode, setFromMode] = useState("date");
  const [ToMode, setToMode] = useState("date");

  const [FromShow, setFromShow] = useState(false);
  const [ToShow, setToShow] = useState(false);

  const [search, setSearch] = useState("");
  const [result, setResult] = useState('')


  const [pin, setPin] = useState({
    latitude: initialLat,
    longitude: initialLng
  });

  const [formData, setFormData] = useState({
   newTitle: data.name,
    newDescription: data.description,
    newFromDate: data.fromDate,
    newToDate: data.toDate,
    newLocation:data.location,
    newLat:initialLat,
    newLon:initialLng,
    newRewardPoints: data.reward,
    newParticipants:data.participant,
    newImageUrl: data.photoAct
  });

  
  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
 
    if (!result.canceled) {
      setFormData({ ...formData, newImageUrl: result.assets[0].uri });
    }
  };

  const handlePostAct = () => {
    const data = new FormData();
    data.append('name',formData.newTitle)
    data.append('description',formData.newDescription)
    data.append('fromDate',new Date (formData.newFromDate).toISOString())
    data.append('toDate',new Date(formData.newToDate).toISOString())
    data.append('participant',formData.newParticipants)
    data.append('reward',formData.newRewardPoints)
    data.append('location',formData.newLocation)
    data.append('lat',formData.newLat)
    data.append('lon',formData.newLon)
    data.append('photoAct', {
      name:'image.jpg',
      type:'image/jpeg',
      uri: formData.newImageUrl
    })
    console.log("disini>>>",data)
    dispatch(asyncPutActivities(data))
    .then(()=>{
this.props.navigation.dispatch(resetAction);    })
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

  console.log(formData)

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
        Edit Request
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
          >{ data.name}</TextInput>
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
        >{ data.description}</TextInput>
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
              }}>{FromDate.toLocaleDateString('id-ID') ? FromDate.toLocaleDateString('id-ID'):data.FromDate} </TextInput>
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
          

          style={{
            height: 40,
            margin: 12, 
            borderWidth: 1,
            padding: 10,
            width: 100,
          }}
            >{data.reward}</TextInput>
           <TextInput 
          onChangeText={(text) => setFormData({ ...formData, newParticipants: text })}
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            width: 100,
          }}
          >{data.participant}</TextInput>
        </View>
      </View>
      <View style={{ alignItems: "center", marginVertical:5}}>
          <Text style={{ marginBottom: 5 }}>Image</Text>
          <Image source={{ uri:data.photoAct }} style={{width:100, height:100, marginBottom:10}} />
          <Button title={'Upload Another'} onPress={selectImage} buttonStyle={{borderRadius:10}} />
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
      <View style={{ alignItems: "center", justifyContent:'center' }}>
          <Text>Search Place</Text>
        <View style={{flexDirection:'row'}}>
        <TextInput
          onChangeText={(text) => setSearch(text)}
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            width: 220,
          }}
        />
        <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                backgroundColor: "#FF7754",
                justifyContent: "center",
                alignItems: "center",
                alignSelf:'center',
                borderRadius:10
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