import { View, Text, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator, TouchableOpacity } from "react-native";
import { Button, Divider } from "@rneui/base";
import CardComp from "../components/CardComp";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";

import { asyncFetchActAuthorParticipantSuccess } from "../store/actions/actionCreator";

export default function MyActivty() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const participantActivities = useSelector((state) => {
    return state.activity.activitiesParticipant;
  });

  useFocusEffect(
    useCallback(() => {
      if (isLoading) {
        dispatch(asyncFetchActAuthorParticipantSuccess())
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }, [participantActivities])
  );

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color={"#312651"} />
      </SafeAreaView>
    );
  } else
    return (
      <ScrollView style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              Style={styles.buttonStyle}
              onPress={() => {
                navigation.navigate("MyActivity");
              }}
            >
              <View style={styles.buttonStyle}>
                <Text style={{fontSize: 24}}>My Activity</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("MyRequest");
              }}
            >
              <View style={styles.buttonStyle}>
                <Text style={{fontSize: 24}}>My Request</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, marginVertical: 15, alignItems: "center", justifyContent: "center" }}>
            {participantActivities?.map((data) => (
              <CardComp data={data.Activity} UserActId={data} key={`nearby-data-${data.Activity.id}`} handleNavigate={() => {}} />
            ))}
          </View>
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "white"
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },

  buttonStyle: {
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
});
