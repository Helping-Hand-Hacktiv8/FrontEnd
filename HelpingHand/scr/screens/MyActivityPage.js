import { View, Text, ScrollView, SafeAreaView, ActivityIndicator} from "react-native";
import { Button, Divider } from "@rneui/base";
import CardComp from "../components/CardComp";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { asyncFetchActAuthorParticipantSuccess,  } from "../store/actions/actionCreator";



export default function MyActivty() {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(true);

  
  const participantActivities  = useSelector((state) => {
    return state.activity.activitiesParticipant;

  });

  useEffect(()=> { 
    if(isLoading) {

      dispatch(asyncFetchActAuthorParticipantSuccess())
      .then((data)=> {
        console.log(data)

        setIsLoading(false)
      })
      .catch((err)=> {
        console.log(err)

      }) 
    }
  }, [isLoading])

  // console.log(participantActivities[0].Activity.photoAct,"diMyActivity")


  
  
  if(isLoading) { 
    return (
      <SafeAreaView style={{ flex: 1, justifyContent:'center' }}>
        <ActivityIndicator size="large" color={"#312651"} />
      </SafeAreaView>
    );   
  } else return (
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

      {participantActivities?.map((data) => (
                <CardComp data={data.Activity} key={`nearby-data-${data.Activity.id}`} handleNavigate={() => {}} />
              ))}
      </View>


    </ScrollView>
  );
}
