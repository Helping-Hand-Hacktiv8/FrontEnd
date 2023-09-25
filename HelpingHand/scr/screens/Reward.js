import { View, Text, ScrollView } from "react-native";
import { Card, Button } from "@rneui/themed";
import CardReward from "../components/CardReward";

export default function Reward() {
  return (
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
      <CardReward/>
      <CardReward/>
      <CardReward/>

      </View>
    </ScrollView>
  );
}
