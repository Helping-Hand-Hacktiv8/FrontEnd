import { View, Text, Image, ActivityIndicator, Button, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { Divider } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { asyncFetchActSingleSuccess, asyncFetchActSuccess, asyncFetchSingleUser, asyncParticipate, fetchAuthorActivity } from "../store/actions/actionCreator";
import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeActivityDetails({ route, navigation }) {
  const dispatch = useDispatch();
  const { ActId, role } = route.params;
  const [authorId, setAuthorId] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [userId, setUserId] = useState(0);

  const { activity } = useSelector((state) => {
    return state.activity;
  });

  const { user } = useSelector((state) => {
    return state.user;
  });

  const { activityAuthor } = useSelector((state) => {
    return state.activity
  })

  useFocusEffect(
    useCallback(() => {
      async function getUser() {
        let getId = await SecureStore.getItemAsync("user_id");
        setUserId(getId);
        dispatch(asyncFetchActSingleSuccess(ActId))
          .then(() => {
            const author = activity.UserActivities.find((el) => el.role == "Author");
            setAuthorId(author.id);
            dispatch(asyncFetchSingleUser(userId));
          })
          .then(() => {
            dispatch(fetchAuthorActivity(ActId))
          })
          .catch((err) => {
            console.log("ERR", err);
          })
          .finally(() => {
            setLoading(false);
          });
      }

      getUser();
    }, [userId])
  );

  const toParticipate = () => {
    dispatch(asyncParticipate(ActId))
      .then(() => {
        dispatch(asyncFetchActSuccess("all", "all"));
      })
      .then(() => {
        return navigation.navigate("Home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(asyncFetchActSingleSuccess(ActId))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ActivityIndicator size="large" color={"#312651"} />
      </SafeAreaView>
    );
  } else {
    return (
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 15,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          The purpose of human life is to serve and to show compassion and the will to help others." - Albert Schweitzer
        </Text>
        <View
          style={{
            padding: 20,
            borderRadius: 10,
            backgroundColor: "white",
            alignSelf: "center",
            marginVertical: 15,
            elevation: 5,
            borderRadius: 10,
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            borderRadius: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                justifyContent: "center",
                width: 130,
                height: 130,
                alignSelf: "center",
                borderRadius: 10,
                padding: 10,
                marginLeft: 10,
                marginTop: 10,
              }}
            >
              <Image
                source={{
                  uri: "https://cdn.discordapp.com/attachments/1029609092358090842/1155684708328415262/worrysnore.png",
                }}
                width={120}
                height={120}
                style={{ alignSelf: "center", borderRadius: 10 }}
              />
            </View>
            <View style={{ flexGrow: 1, width: 10, justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 30,
                  textAlign: "center",
                  alignSelf: "center",
                  fontWeight: "bold",
                }}
              >
                {activity.name}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                backgroundColor: "#279EFF",
                marginTop: 10,
                marginLeft: 10,
                padding: 10,
                alignSelf: "center",
                borderRadius: 10,
              }}
            >
              <Text style={{ textAlign: "center", color: "white" }}>Author: {activityAuthor.name}</Text>
            </View>
            <View style={{ width: 80 }}></View>
          </View>

          {/* =============TOPSECTION======== */}
          <Divider width={2} color="black" style={{ marginTop: 10 }} />
          <View style={{ padding: 10 }}>
            <Text style={{ fontWeight: "bold" }}>Description:</Text>
            <Text style={{ paddingTop: 5, textAlign: 'justify' }}>{activity.description}</Text>
          </View>
          <Divider width={2} color="black" style={{ marginTop: 10 }} />
          <View style={{ padding: 10 }}>
            <Text style={{ fontWeight: "bold" }}>Place/Destination:</Text>
            <Text style={{ paddingTop: 5, textAlign: 'justify' }}>{activity.location}</Text>
          </View>
          {/* =============MIDSECTION======== */}
          <Divider width={2} color="black" style={{ marginTop: 10 }} />
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                backgroundColor: "#279EFF",
                marginTop: 10,
                marginLeft: 10,
                alignSelf: "center",
                borderRadius: 10,
                padding: 10,
              }}
            >
              <Text style={{ textAlign: "center", color: "white" }}>Participants: {activity.UserActivities.length}/{activity.participant}</Text>
            </View>
            <View style={{ width: 90, marginHorizontal: -20 }} />
            <View
              style={{
                marginTop: 10,
                alignSelf: "center",
                paddingLeft: 30,
              }}
            >
              <Text style={{ textAlign: "center" }}>Rewards:</Text>
            </View>
            <View style={{ marginTop: 10, alignSelf: "center", marginLeft: 8, flexDirection: "row", alignItems: "center" }}>
              <Text style={{ textAlign: "center" }}>{activity.reward}</Text>
              <FontAwesome name="star" size={24} color="yellow" style={{ marginLeft: 5 }} />
            </View>
          </View>

          <View style={styles.pointsContainer}>
            <TouchableOpacity style={styles.pointsButtonsGreen} onPress={toParticipate}>
              <Text style={{ textAlign: "center", color: 'white' }}>Participate </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    padding: 10,
  },
  pointsContainer: {
    flexDirection: "row", // Menjadikan dua kolom dengan mengatur arah flex menjadi 'row'
    justifyContent: "space-between", // kasih ruang diantara dua button
    alignItems: "center", // Menengahkan vertikal
    padding: 10,
  },

  pointsButtons: {
    marginTop: 20,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 20,
    width: 100,
  },
  pointsButtonsGreen: {
    marginTop: 20,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 20,
    width: 100,
  },
});
