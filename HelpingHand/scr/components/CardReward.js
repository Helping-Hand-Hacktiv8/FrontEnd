import { View, Text, StyleSheet, Image, TouchableOpacity} from "react-native"
import { Card, Button} from '@rneui/themed';
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function CardReward({data}){
  const navigation = useNavigation()
  const { user } = useSelector((state) => {
    return state.user;
  });

  const handleClaimReward = async (price) => {
    console.log(price)
    if(user.token < price) {
      console.log('not enough token')
    }
  }

  console.log(user)

  return (
      <View>
       <Card containerStyle={{
        borderRadius:20,
        width:350,
        backgroundColor:'#DC6C3C',
        borderColor:'transparent',
        elevation:5,
      }}>
        <View style={{flexDirection:'row'}}>
            <View style={{justifyContent:'center', width:80, backgroundColor:'#175D8C', height:80, alignSelf:'center',
        borderRadius:10}}>
            <Image source={{uri:data.photoProduct}}
            resizeMode="contain"
            style={{width: "100%",
            borderRadius:10,
            height: "100%",}} />

            </View>

          <View style={{borderRadius:10,paddingHorizontal:15}}>
            <Text style={{fontSize:18, color:'white', marginBottom:5, fontWeight:'bold'}}>{data.name}</Text>
            <Text style={styles.cardText}>{data.description}</Text>
            <Text style={styles.cardText}>{data.companyName }</Text>
            <Text style={styles.cardText}>Price: {data.price} Points</Text>
  

          <View style={{ flexDirection:'row', alignItems:'center', width:80}}>
            <TouchableOpacity onPress={()=> {
              navigation.push('RewardDetails', {data:data})
            }} >
            <View>
                <Text 
                
                style={{fontSize:15, color:'white'}}>Click For Details</Text>
            </View>
            </TouchableOpacity>
            <View style={{flexGrow:1}}/>
          <Button title="Claim Reward" buttonStyle={{
            borderRadius:10,
            backgroundColor:'#175d8c'
          }}  
          containerStyle={{
            flexDirection:'row',
            width:150,
            justifyContent:'flex-end',
            marginTop:10 
          }}
          onPress={(data)=> {}}
          />
          </View>
          </View>

        </View>
       </Card>

      </View>
  )
}

const styles = StyleSheet.create({
  cardText:{
    fontSize:13,
    marginTop:5,
    color:'white'
  }
})