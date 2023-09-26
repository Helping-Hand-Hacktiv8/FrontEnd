import { View, Text, StyleSheet, Image} from "react-native"
import { Card, Button} from '@rneui/themed';

export default function CardReward(){
  return (
      <View>
       <Card containerStyle={{
        borderRadius:20,
        width:350,
        height:160,
        backgroundColor:'#DC6C3C',
        borderColor:'transparent',
        elevation:5,
      }}>
        <View style={{flexDirection:'row'}}>
            <View style={{justifyContent:'center', width:80, backgroundColor:'#175D8C', height:80, alignSelf:'center',
        borderRadius:10, padding:10}}>
            <Image source={{uri:'https://cdn.discordapp.com/attachments/1029609092358090842/1155684708328415262/worrysnore.png'}}
            width={70}
            height={70}
            style={{alignSelf:'center'}} />

            </View>

          <View style={{borderRadius:10,paddingHorizontal:15}}>
            <Text style={styles.cardText}>Nescafe</Text>
            <Text style={styles.cardText}>Nescafe</Text>

          <View style={{ flexDirection:'row', alignItems:'center', width:80}}>
            <View>
                <Text style={{fontSize:15, color:'white'}}>Click For Details</Text>
            </View>
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
    fontWeight:'bold',
    fontSize:16,
    marginVertical:6,
    color:'white'
  }
})