import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";


export default function CardAuthor({data, handleNavigation }) {
    const navigation = useNavigation()
    console.log(data)
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <TouchableOpacity style={styles.containerLogo}>
        <Image
          source={
            {uri:'https://e04e-114-122-106-150.ngrok-free.app'+'/static/'+ data.photoAct} 
          }
          resizeMode="contain"
          style={{
            width: "100%",
            borderRadius:10,
            height: "100%",
          }}
        />
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          marginHorizontal: 14,
          borderRadius: 10,
          backgroundColor: "#cdd8ee",
          padding: 5,
        }}
      >

      

        <View style={styles.topRow}>
        {/* Title */}
        <View
        style={{
          flex: 4,
          marginLeft:10
        }}
        >
        <Text style={styles.cardTittle} numberOfLines={1}>
          {data.name}
        </Text>
        </View>

        <View style={styles.statusContainer}>
            <Text style={styles.rewardText}>{data.status}</Text>
          </View>
        </View>
    
       

    

        {/* Location */}
        <Text style={styles.locationText} numberOfLines={1}>
         {data.location}
        </Text>

        {/* button */}
        <View style={{flexDirection:'row', marginBottom:10}}>
            <View style={{marginHorizontal:5}}>

        <Button title="Edit" buttonStyle={{
            borderRadius:10,
            backgroundColor:'#175d8c'
            
          }}
          onPress={()=> {
            navigation.push('EditRequest', {data:data})}}
          />
            </View>
           <View style={{marginHorizontal:5}}>
                
          <Button title="Monitor" buttonStyle={{
            borderRadius:10,
            backgroundColor:'#175d8c'
          }}
          onPress={()=> {
            navigation.push('Monitor', {id:data.id})}}
          />
            </View>
            <View style={styles.rewardContainer}>
            <Text style={styles.rewardText}>reward:</Text>
            <Text style={styles.rewardValue}>{data.reward}</Text>
            <FontAwesome name="star" size={16} color="gold" />
          </View>
        
            
        </View>

        <View style={styles.bottomRow}>

           {/* Participant */}
        <View style={styles.participantRow}>
         
        </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardTittle: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 6,
    
  },

  clickForDetail: {
    fontWeight: "light",
    fontSize: 10,
    marginVertical: 6,
  },

  locationText: {
    fontWeight: "normal",
    fontSize: 14,
    marginVertical: 6,
    marginLeft:10

  },

  cardContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
    shadowColor: "#F3F4F8",
  },

  containerLogo: {
    width: 50,
    height: 50,
    backgroundColor: "#F3F4F8",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  participantRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  rewardContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 2,
justifyContent:'flex-end'
  },

  statusContainer: {
    alignItems: "center",
    flex: 2,
justifyContent:'flex-end',
backgroundColor:'orange', 
borderRadius:10,


  },

  participantContainer: {
    backgroundColor: "#175D8C",
    borderRadius: 8,
    paddingHorizontal: 5,
    marginRight: 10,
  },

  participantText: {
    color: "white",
    fontWeight: "bold",
  },

  participantValue: {
    fontWeight: "bold",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});