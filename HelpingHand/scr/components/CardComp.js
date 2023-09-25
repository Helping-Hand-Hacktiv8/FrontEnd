import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function CardComp({ handleNavigation }) {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <TouchableOpacity style={styles.containerLogo}>
        <Image
          source={
            "" //ambil dari props
          }
          resizeMode="contain"
          style={{
            width: "100%",
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
          padding: 10,
        }}
      >
        <View style={styles.topRow}>
        {/* Title */}
        <Text style={styles.cardTittle} numberOfLines={3}>
          Tolong cari kucing saya yang hilang
        </Text>

        <View style={styles.rewardContainer}>
            <Text style={styles.rewardText}>reward:</Text>
            <Text style={styles.rewardValue}>200</Text>
            <FontAwesome name="star" size={16} color="gold" />
          </View>
        </View>

       

        {/* Description */}
        <Text style={styles.descriptionText} numberOfLines={3}>
          Saya butuh seorang untuk bantu saya mencari kucing saya yang hilang di sekitar rumah saya. kalau ketemu nanti saya kasih hadiah tanda tangan dari hatsune miku
        </Text>

        {/* Location */}
        <Text style={styles.locationText} numberOfLines={1}>
          Jl. Radio Dalam nomor 36B Gandaria Utara
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.clickForDetail}>Click For Details</Text>
           {/* Participant */}
        <View style={styles.participantRow}>
          <View style={styles.participantContainer}>
            <Text style={styles.participantText}>Participant</Text>
          </View>
          <Text style={styles.participantValue}>5/6</Text>
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
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
