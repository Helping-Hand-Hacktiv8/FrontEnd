import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function CardCompHome({ data }) {
  const navigation = useNavigation();
  const toDetails = () => {
    return navigation.navigate("HomeActivityDetail", { ActId: data.id, role: "Participant" });
  };
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={toDetails}>
        <TouchableOpacity style={styles.containerLogo} onPress={toDetails}>
          <Image
            source={{ uri: data.photoAct }}
            resizeMode="contain"
            style={{
              width: "100%",
              borderRadius: 10,
              height: "100%",
            }}
          />
        </TouchableOpacity>

        <View style={styles.viewCardContainer}>
          <View style={styles.topRow}>
            {/* Title */}
            <View
              style={{
                flex: 4,
              }}
            >
              <Text style={styles.cardTittle} numberOfLines={1}>
                {data.name}
              </Text>
            </View>

            <View style={styles.rewardContainer}>
              <Text style={styles.rewardText}>reward:</Text>
              <Text style={styles.rewardValue}>{data.reward}</Text>
              <FontAwesome name="star" size={16} color="gold" />
            </View>
          </View>

          {/* Description */}
          <Text style={styles.descriptionText} numberOfLines={3}>
            {data.description}
          </Text>

          {/* Location */}
          <Text style={styles.locationText} numberOfLines={1}>
            {data.location}
          </Text>

          <View style={styles.bottomRow}>
            <Text style={styles.clickForDetail}>Click For Details</Text>
            {/* Participant */}
            <View style={styles.participantRow}>
              <View style={styles.participantContainer}>
                <Text style={styles.participantText}>Participant</Text>
              </View>
              <Text style={styles.participantValue}>{data.participant}/6</Text>
            </View>
          </View>
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  viewCardContainer: {
    flex: 1,
    marginHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#E9F2F3",
    padding: 20,
  },

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

  descriptionText: {
    fontWeight: "normal",
    fontSize: 12,
    marginVertical: 6,
  },

  locationText: {
    fontWeight: "normal",
    fontSize: 14,
    marginVertical: 6,
  },

  cardContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 16,
    // borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 4,
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
    flex: 1,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
