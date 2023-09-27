import { View, Text, StyleSheet, Image, TouchableOpacity,Alert } from "react-native";
import { Card, Button } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { asyncClaimReward } from "../store/actions/actionCreator";

export default function CardReward({ data, claimed }) {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const { user } = useSelector((state) => {
    return state.user;
  });

  const handleClaimReward = () => {
    console.log(data.price);
    console.log(data.id)
    if (user.token > data.price) {
     console.log('gakcukup')
    } else {
      dispatch(asyncClaimReward(data.id))
        .then((data) => { 
         console.log(data, 'berhasil')
        })
    }
  };

  let status = 'unclaim'

  claimed.map((e) => { 
    if (e === data.id) {
      status = 'claimed'
    }
  })
  
  console.log(status)

  return (
    <View>
      <Card containerStyle={styles.cardContainer}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: data.photoProduct }} resizeMode="contain" style={styles.image} />
          </View>

          <View style={{ borderRadius: 10, paddingHorizontal: 15 }}>
            <Text style={styles.titleContainer}>{data.name}</Text>
            <Text style={styles.cardDescription}>{data.description}</Text>
            <Text style={styles.companyContainer}>{data.companyName}</Text>
            <Text style={[styles.priceContainer, { textAlign: "left" }]}>{data.price} Points</Text>

            <View style={styles.detailsAndClaim}>
              <TouchableOpacity
                onPress={() => {
                  navigation.push("RewardDetails", { data: data });
                }}
              >
                <View>
                  <Text style={{ fontSize: 15, color: "white" }}>Click For Details</Text>
                </View>
              </TouchableOpacity>
              {status != 'claimed' ? <>
              <TouchableOpacity onPress={handleClaimReward}>
                <View style={[styles.claimContainer, { marginLeft: 7 }]}>
                  <Text style={[styles.buttonText]}>Claim</Text>
                </View>
              </TouchableOpacity>
              </> : <>
              <View >
                <View style={[styles.claimContainer, { marginLeft: 7 }]}>
                  <Text style={[styles.buttonText]}>Claimed</Text>
                </View>
              </View>
              </>}
              
              
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  cardDescription: {
    fontSize: 14,
    marginTop: 5,
    color: "white",
    fontFamily: "GlacialIndifference", // Add this line
  },

  companyContainer: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: "800",
    color: "white",
    fontFamily: "GlacialIndifference", // Add this line
  },

  priceContainer: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: "600",
    color: "white",
    fontFamily: "GlacialIndifference", // Add this line
  },

  cardContainer: {
    borderRadius: 20,
    width: 350,
    backgroundColor: "#7CB7CB",
    borderColor: "transparent",
    elevation: 5,
  },

  imageContainer: {
    justifyContent: "center",
    width: 80,
    backgroundColor: "#175D8C",
    height: 80,
    alignSelf: "center",
    borderRadius: 10,
  },

  image: {
    width: "100%",
    borderRadius: 10,
    height: "100%",
  },

  titleContainer: {
    fontSize: 18,
    color: "white",
    marginBottom: 5,
    fontWeight: "bold",
    fontFamily: "GlacialIndifference", // Add this line
  },

  detailsAndClaim: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  claimContainer: {
    borderRadius: 10,
    backgroundColor: "#3AAACF",
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    fontFamily: "GlacialIndifference", // Add this line
  },
});
