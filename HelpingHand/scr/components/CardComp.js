import { View, Text, StyleSheet, TouchableOpacity} from "react-native"
import { Card, Button} from '@rneui/themed';

export default function CardComp(){
  return (
      <View>
       <Card containerStyle={{
        borderRadius:20,
        width:300,
        backgroundColor:'#ffffff',
        borderColor:'transparent',
        elevation:5
      }}>
       <Card.Title style={{fontSize:22}}>Activity Title</Card.Title>
          <Card.Divider/>
          <View style={{borderRadius:10, backgroundColor:'#cdd8ee', padding:10}}>
        <Text style={styles.cardText}>Activity ID : 1</Text>
        <Text style={styles.cardText}>Descriptions:</Text>
        <Text style={styles.cardText}>Help Paint My House</Text>
        <Text style={styles.cardText}>Location</Text>
          </View>

          <View style={{ flexDirection:'row'}}>
            <View style={{flexGrow:1}}/>

            

          <Button title="Join Activity" buttonStyle={{
            borderRadius:10,
            backgroundColor:'#175d8c'
          }} 
          containerStyle={{
            flexDirection:'row',
            width:100,
            justifyContent:'flex-end',
            marginTop:10
           
          }}
          />
           

          </View>

          
       </Card>

      </View>
  )
}

const styles = StyleSheet.create({
  cardText:{
    fontWeight:'bold',
    fontSize:16,
    marginVertical:6
  }
})