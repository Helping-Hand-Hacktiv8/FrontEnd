import { View, Text, Image, ActivityIndicator } from "react-native";
import { Divider } from "@rneui/themed";
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { asyncFetchActSingleSuccess } from "../store/actions/actionCreator";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeActivityDetails({route, navigation}) {
    const dispatch = useDispatch()
    const { ActId, role} = route.params
    const [isLoading,setLoading] = useState(true)

    const { activity } = useSelector((state)=>{
      return state.activity
    })

    const { user } = useSelector((state)=>{
      return state.user
    })
    
    // console.log("ACTIVITY ",activity.UserActivities.length)
    useEffect(()=>{
      if (isLoading){
        dispatch(asyncFetchActSingleSuccess(ActId))
        setLoading(false)
      }
      
    },[])

    if(isLoading){
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <ActivityIndicator size="large" color={"#312651"} />
        </SafeAreaView>
      );
    } else{
      return (
        <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 15,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          The purpose of human life is to serve and to show compassion and the
          will to help others." - Albert Schweitzer
        </Text>
        <View
          style={{
            width: 350,
            height: 500,
            elevation: 5,
            borderRadius: 10,
            backgroundColor: "#dc6c3c",
            alignSelf: "center",
            marginVertical: 15,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                justifyContent: "center",
                width: 130,
                backgroundColor: "#175D8C",
                height: 130,
                alignSelf: "center",
                borderRadius: 10,
                padding: 10,
                marginLeft: 10,
                marginTop: 10,
              }}
            >
              <Image
                source={{
                  uri: "https://cdn.discordapp.com/attachments/1029609092358090842/1155684708328415262/worrysnore.png",
                }}
                width={120}
                height={120}
                style={{ alignSelf: "center", borderRadius: 10 }}
              />
            </View>
            <View style={{ flexGrow: 1, width: 10, justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 30,
                  textAlign: "center",
                  alignSelf: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {activity.name}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                backgroundColor: "#175D8C",
                marginTop: 10,
                marginLeft: 10,
                width: 80,
                alignSelf: "center",
                borderRadius: 10,
              }}
            >
              <Text style={{ textAlign: "center", color: "white" }}>Author:</Text>
            </View>
            <View style={{ marginTop: 10, width: 80, alignSelf: "center" }}>
              <Text style={{ textAlign: "center", color: "white" }}>{user.name}</Text>
            </View>
            <View style={{width:80}}></View>
            <View
              style={{
                backgroundColor: "green",
                marginTop: 10,
                marginLeft: 10,
                width: 80,
                alignSelf: "center",
                borderRadius: 10,
              }}
            >
              <Text style={{ textAlign: "center", color: "white" }}>Joined</Text>
            </View>
          </View>
  
          {/* =============TOPSECTION======== */}
          <Divider width={2} color="black" style={{ marginTop: 10 }} />
          <View style={{padding:10}}>
          <Text style={{color:'white', fontWeight:'bold'}}>Description:</Text>
          <Text style={{color:'white', fontWeight:'bold'}}>
            {activity.description}
          </Text>
          </View>
          <Divider width={2} color="black" style={{ marginTop: 10 }} />
          <View style={{padding:10}}>
          <Text style={{color:'white', fontWeight:'bold'}}>Place/Destination:</Text>
          <Text style={{color:'white', fontWeight:'bold'}}>
            {activity.location}
          </Text>
          </View>
          {/* =============MIDSECTION======== */}
          <Divider width={2} color="black" style={{ marginTop: 10 }} />
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                backgroundColor: "#175D8C",
                marginTop: 10,
                marginLeft: 10,
                alignSelf: "center",
                borderRadius: 10,
                padding:10
              }}
            >
              <Text style={{ textAlign: "center", color: "white" }}>Participants:</Text>
            </View>
            <View style={{ marginTop: 10, alignSelf: "center", marginLeft:8 }}>
              <Text style={{ textAlign: "center", color: "white" }}>{activity.UserActivities.length}/{activity.participant}</Text>
            </View>
            <View style={{width:90, marginHorizontal:-20}}/>
            <View
              style={{
                marginTop: 10,
                alignSelf: "center",
                paddingLeft:30
              }}
            >
              <Text style={{ textAlign: "center", color: "white" }}>Rewards:</Text>
            </View>
            <View style={{ marginTop: 10, alignSelf: "center", marginLeft:8, flexDirection:'row', alignItems:'center'}}>
              <Text style={{ textAlign: "center", color: "white" }}>{activity.reward}</Text>
              <FontAwesome name="star" size={24} color="yellow"  style={{marginLeft:5}}/>
            </View>
          </View>
        </View>
      </View>
    )
    }
       
    
}
