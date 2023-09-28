import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Divider } from "@rneui/base";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import CardAuthor from "../components/CardAuthor";
import { asyncFetchActAuthorParticipantSuccess } from "../store/actions/actionCreator";
import { useIsFocused } from "@react-navigation/native";

export default function MyRequest() {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(true);
  const focus = useIsFocused()

  const authorActivities = useSelector((state) => {
    return state.activity.activitiesAuthor;
  });

  useFocusEffect(
    useCallback(() => {
      if (isLoading) {

        dispatch(asyncFetchActAuthorParticipantSuccess())
          .then((data) => {
            // console.log(data)
            setIsLoading(false)
          })
          .catch((err) => {
            console.log(err)

          })
      }
    }, [authorActivities])
  )

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          Style={styles.buttonStyle}
          onPress={() => {
            navigation.navigate("MyActivity");
          }}
        >
          <View style={styles.buttonStyle}>
            <Text style={{ fontSize: 24 }}>My Activity</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MyRequest");
          }}
        >
          <View style={styles.buttonStyle}>
            <Text style={{ fontSize: 24 }}>My Request</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, marginVertical: 15, alignItems: 'center', justifyContent: 'center' }}>

        {authorActivities?.map((data) => (
          <CardAuthor data={data.Activity} key={`nearby-data-${data.Activity.id}`} handleNavigate={() => { }} />
        ))}

      </View>
      <Divider width={3} color="#175d8c" inset={true} insetType="middle" style={{ marginTop: 20 }} />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginVertical: 20,
          justifyContent: "center",
        }}
      >
        <Button
          title="Add Request"
          containerStyle={{ borderRadius: 10 }}
          onPress={() => {
            navigation.navigate("AddRequest");
          }}
        />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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

  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  }
})