import { View, Text, ScrollView } from "react-native";
import { Button, Divider } from "@rneui/base";
import CardComp from "../components/CardComp";
import { useNavigation } from "@react-navigation/native";


export default function MyRequest() {
  const navigation = useNavigation()
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
