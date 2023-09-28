import { View, Text, Image, SafeAreaViewComponent } from "react-native";
import { Divider } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SafeAreaView, ActivityIndicator } from "react-native";

export default function RewardDetails({ route }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [reward, setReward] = useState("");
  const data = route.params.data;

  useEffect(() => {
    if (isLoading) {
      if (data) {
        setIsLoading(false);
      }
    }
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color={"#312651"} />
      </SafeAreaView>
    );
  } else
    return (
      <SafeAreaView style={{ backgroundColor: "transparent" }}>
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
            width: 380
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                justifyContent: "center",
                width: 130,
                backgroundColor: "#175D8C",
                height: 130,
                alignSelf: "center",
                borderRadius: 10,
                marginLeft: 10,
                marginTop: 10,
              }}
            >
              <Image
                source={{
                  uri: data.photoProduct,
                }}
                style={{ width: "100%", borderRadius: 10, height: "100%" }}
              />
            </View>
            <View style={{ flexGrow: 1, width: 10, justifyContent: "center", padding: 10 }}>
              <Text
                style={{
                  fontSize: 30,
                  textAlign: "center",
                  alignSelf: "center",
                  fontWeight: "bold",
                }}
              >
                {data.name}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                backgroundColor: "#175D8C",
                marginTop: 10,
                marginLeft: 10,
                padding: 10,
                alignSelf: "center",
                borderRadius: 10,
              }}
            >
              <Text style={{ textAlign: "center", color: "white" }}>Company: {data.companyName}</Text>
            </View>
          </View>

          {/* =============TOPSECTION======== */}
          <View style={{ justifyContent: "center" }}>
            <View style={{ padding: 10, justifyContent: "center" }}>
              <Text style={{}}>Description:</Text>
              <Text style={{ paddingTop: 10 }}>{data.description}</Text>
            </View>
            <Divider width={2} color="transparent" style={{ marginTop: 10 }} />
            <View style={{ flexDirection: "row", marginBottom: 15 }}>
              <View style={{ marginHorizontal: 5 }} />
              <View
                style={{
                  marginTop: 10,
                  alignSelf: "center",
                }}
              >
                <Text style={{ textAlign: "center" }}>Price:</Text>
              </View>
              <View style={{ marginTop: 10, alignSelf: "center", marginLeft: 8, flexDirection: "row", alignItems: "center" }}>
                <Text style={{ textAlign: "center" }}>{data.price}</Text>
                <FontAwesome name="star" size={24} color="yellow" style={{ marginLeft: 5 }} />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
}
