import { View, Text, ScrollView } from "react-native";
import { Button, Divider } from "@rneui/base";
import CardComp from "../components/CardComp";
import { useNavigation } from "@react-navigation/native";


export default function MyActivty() {
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
        <CardComp/>
        <CardComp/>
        <CardComp/>
        <CardComp/>
      </View>


    </ScrollView>
  );
}
