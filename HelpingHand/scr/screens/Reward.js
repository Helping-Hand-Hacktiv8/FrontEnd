import { View, Text, ScrollView ,SafeAreaView,ActivityIndicator } from "react-native";
import { Card, Button } from "@rneui/themed";
import CardReward from "../components/CardReward";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncFetchRewardsSuccess } from "../store/actions/actionCreator";

export default function Reward() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const {rewards}  = useSelector((state) => {
    return state.rewards;
  });
 
  useEffect(()=> {
    if(isLoading) {
      dispatch(asyncFetchRewardsSuccess())
      .then((data)=> {
        setIsLoading(false)
      })
      .catch((err)=> {
        console.log(err)
      })
    }
  }, []) 


  if(isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent:'center' }}>
        <ActivityIndicator size="large" color={"#312651"} />
      </SafeAreaView>
    );   
  } else return (
    <SafeAreaView>

    <ScrollView>
      <Text
        style={{
          textAlign: "center",
          fontStyle: "italic",
          fontWeight: "800",
          fontSize: 25,
          padding: 10,
        }}
      >
        Your Total Points
      </Text>

      <View
        style={{
          backgroundColor: "#dc6c3c",
          height: 70,
          alignSelf: "center",
          borderRadius: 10,
          elevation:5,
          justifyContent:'center', alignItems:'center',
          padding:10,
          marginTop:20
        }}
      >
        <Text
        style={{
          color:'white',
          fontSize:33,
          fontWeight:'bold'
        }}>450</Text>
      </View>
      <Text
        style={{
          textAlign: "center",
          fontWeight: "500",
          fontSize: 22,
          padding: 10,
          marginTop:20
        }}
      >
        Claim Your Reward Below
      </Text>
      <View style={{alignItems:'center', marginVertical:15}}>
      {rewards?.map((data)=> {
      return <CardReward data={data} key={`nearby-data-${data.id}`} handleNavigate={() => {}}/>
    })}

      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
