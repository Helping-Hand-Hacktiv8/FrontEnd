import { View, Text, ScrollView } from "react-native";
import { Button, Divider } from "@rneui/base";
import CardComp from "../components/CardComp";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CardAuthor from "../components/CardAuthor";


export default function MyRequest() {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(true);

  const authorActivities  = useSelector((state) => {
    return state.activity.activitiesAuthor;
  });

  console.log(authorActivities[0], "<<<MyRequest") 
  return (
    <ScrollView>
      <View  
        style={{
          flex: 1,
          flexDirection: "row",
          marginTop: 20,
          justifyContent: "center",
        }}
      >
        <Button
          title="My Activity"
          containerStyle={{ marginLeft: 40, borderRadius: 10 }}
          onPress={() => {
            navigation.navigate("MyActivity");
          }}
        />
        <View style={{ flexGrow: 1 }} />

        <Button
          title="My Request"
          containerStyle={{ marginRight: 40, borderRadius: 10 }}
          onPress={() => {
            navigation.navigate("MyRequest");
          }}
        />
      </View>
      <View style={{flex:1, marginVertical:15,alignItems:'center', justifyContent:'center'}}>

      {authorActivities?.map((data) => (
                <CardAuthor data={data.Activity} key={`nearby-data-${data.Activity.id}`} handleNavigate={() => {}} />
              ))}

      </View>
      <Divider width={3} color="#175d8c" inset={true} insetType="middle" style={{marginTop:20}}/>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginVertical: 20,
          justifyContent: "center",
        }}
      >
        <Button
          title="Add Request"
          containerStyle={{ borderRadius: 10 }}
          onPress={() => {
            navigation.navigate("AddRequest");
          }}
        />
        
      </View>
      


    </ScrollView>
  );
}
