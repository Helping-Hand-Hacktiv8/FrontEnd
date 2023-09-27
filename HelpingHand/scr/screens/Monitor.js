import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import {
  asyncFetchSingleActivity,
  asyncFinishActivity,
  asyncCancelActivity,
} from "../store/actions/actionCreator";
import { Button } from "@rneui/base";

const initialLat = -6.2;
const initialLng = 106.816666;

export default function Monitor({ route }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [singleActivity, setSingleActivity] = useState("");
  const id = route.params.id;

  useEffect(() => {
    if (isLoading) {
      dispatch(asyncFetchSingleActivity(id))
        .then((data) => {
          setSingleActivity(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  // console.log(singleActivity)

  const handleFinishActivity = () => {
    dispatch(asyncFinishActivity(id))
      .then((data) => {
        setIsLoading(false);
        return navigation.reset({
          index: 2,
          routes: [{ name: "MyActivity" }],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancelActivity = () => {
    dispatch(asyncCancelActivity(id))
      .then((data) => {
        setIsLoading(false);
        return navigation.reset({
          index: 2,
          routes: [{ name: "MyActivity" }],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(singleActivity);
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            textAlign: "center",
            fontStyle: "italic",
            fontWeight: "800",
            fontSize: 25,
            padding: 10,
          }}
        >
          Monitor Request
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontStyle: "italic",
            fontWeight: "800",
            fontSize: 25,
            padding: 10,
          }}
        >
          {singleActivity.name}
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontStyle: "italic",
            fontWeight: "800",
            fontSize: 25,
            padding: 10,
          }}
        >
          {singleActivity.location}
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontStyle: "italic",
            fontWeight: "800",
            fontSize: 25,
            padding: 10,
          }}
        >
          Participants: {singleActivity.participant}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={{ marginRight: 10 }}>
            <Button
              title="Cancel"
              buttonStyle={{
                borderRadius: 10,
                backgroundColor: "#175d8c",
              }}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
          <View>
            <Button
              title="Finish Activity"
              buttonStyle={{
                borderRadius: 10,
                backgroundColor: "green",
              }}
              onPress={() => {
                handleFinishActivity();
              }}
            />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Button
              title="Cancel Activity"
              buttonStyle={{
                borderRadius: 10,
                backgroundColor: "maroon",
              }}
              onPress={() => {
                handleCancelActivity();
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 300,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    alignSelf: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
