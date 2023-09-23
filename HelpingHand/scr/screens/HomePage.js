import { useNavigation } from "@react-navigation/native";
import { View, Text, Button} from "react-native";
import Register from "../components/Register";

export default function Home({}) {
  const navigation = useNavigation();
  let isLogin = false;
  if (isLogin) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>Logged In</Text>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{flexDirection:'row', }}>
        <View style={{marginHorizontal:10}}>
        <Button title='Login' style={{marginHorizontal:10}}
       
        /> 
        </View>   
        <View style={{marginHorizontal:10}}>
        <Button title='Register'
         onPress={()=> {
            navigation.navigate('Register')
        }}/> 
        </View>

      
       
        </View>
      </View>
    );
  }
}
