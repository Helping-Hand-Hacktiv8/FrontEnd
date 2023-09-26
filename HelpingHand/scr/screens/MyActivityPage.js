import { View, Text, ScrollView, SafeAreaView, ActivityIndicator} from "react-native";
import { Button, Divider } from "@rneui/base";
import CardComp from "../components/CardComp";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { asyncFetchUserActivitiesSuccess } from "../store/actions/actionCreator";


export default function MyActivty() {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(true);
  const userActivities  = useSelector((state) => {
    return state.activity.userActivities;
  });

  useEffect(()=> { 
    if(isLoading) {
      dispatch(asyncFetchUserActivitiesSuccess())
      .then((data)=> {
        setIsLoading(false)
      })
      .catch((err)=> {
        console.log(err)
      })
    }
  }, [])
  
  console.log(userActivities[0])
  
  
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
          
      </View>


    </ScrollView>
  );
}
