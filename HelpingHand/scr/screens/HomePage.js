import { useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView} from "react-native";
import { Button, SearchBar } from "@rneui/base";
import { useState } from "react";
import CardComp from "../components/CardComp";



export default function Home({}) {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  let isLogin = true;
  if (isLogin) {
    return (
      <View style={{ backgroundColor: "white", flex:1 }}>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          placeholder="Search Activity.."
          value={search}
          containerStyle={{
            backgroundColor: "transparent",
            borderColor: "transparent",
            marginTop:5
          }}
          inputContainerStyle={{
            backgroundColor:'white',
            elevation:5
          }}
        />
        <ScrollView style={{flex:1}}>
            <View style={{flex:1, marginVertical:15,alignItems:'center', justifyContent:'center'}}>
        <Text style={{
             textAlign: "left",
             fontStyle: "italic",
             fontWeight: "800",
             fontSize: 25,
             padding:10
        }}>
            Available Task
        </Text>
            <CardComp/>
            <CardComp/>
            <CardComp/>
            <CardComp/>

            </View>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginHorizontal: 10 }}>
            <Button
              title="Login"
              style={{ marginHorizontal: 10 }}
              onPress={() => {
                navigation.navigate("Login");
              }}
            />
          </View>
          <View style={{ marginHorizontal: 10 }}>
            <Button
              title="Register"
              onPress={() => {
                navigation.navigate("Register");
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}
