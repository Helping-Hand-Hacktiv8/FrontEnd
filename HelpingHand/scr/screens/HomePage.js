import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from "react-native";
import { Button, SearchBar } from "@rneui/base";
import { useCallback, useEffect, useState } from "react";
import CardComp from "../components/CardComp";
import searchIcon from "../../assets/search.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { asyncFetchActSuccess, asyncFetchSingleUser } from "../store/actions/actionCreator";
import * as SecureStore from "expo-secure-store";
import CardCompHome from "../components/CardCompHome";

const initialLat = -6.2;
const initialLng = 106.816666;

export default function Home({ searchTerms, setSearchTerms, handleClick }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState("");
  const { user } = useSelector((state) => {
    return state.user;
  });

  const { activities } = useSelector((state) => {
    return state.activity;
  });

  const googleAPIkey = "AIzaSyBqS7sw4CfzV-dHLQRcNCu4qo3R3HBWAXs";
  const searchPlaces = async () => {
    if (!search.trim().length) return;

    const googleApisUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json";
    const input = search.trim();
    const location = `${initialLat},${initialLng}&radius=1000`;
    const url = `${googleApisUrl}?query=${input}&location=${location}&key=${googleAPIkey}`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      if (json && json.results) {
        const coords = [];
        for (const item of json.results) {
          coords.push({
            name: item.name,
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng,
          });
        }
        setResult(coords);
        dispatch(asyncFetchActSuccess(coords[0].latitude, coords[0].longitude));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchId = async () => {
        let getId = await SecureStore.getItemAsync("user_id");
        console.log(getId);
        return getId;
      };
      if (isLoading) {
        dispatch(asyncFetchActSuccess("all", "all"))
          .then(() => {
            return fetchId();
          })
          .then((data) => {
            console.log("DATA>>>", data);
            dispatch(asyncFetchSingleUser(data));
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, [activities])
  );

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ActivityIndicator size="large" color={"#312651"} />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View style={{ backgroundColor: "white", flex: 1, padding: 20 }}>
          <Text style={styles.containerUsername}>Welcome {user.name}</Text>
          <Text style={styles.goodDeedsContainer}>Which good deeds you want to do today?</Text>

          {/* search welcome container */}
          <View style={styles.searchContainer}>
            <View style={styles.searchIconContainer}>
              <TextInput style={{ flex: 1, height: "100%" }} value={searchTerms} onChangeText={(text) => setSearch(text)} placeholder="What kind of deeds you want to have?" />
            </View>

            <TouchableOpacity style={styles.searchIconStyle} onPress={searchPlaces}>
              <Image
                source={searchIcon}
                resizeMode="contain"
                style={{
                  width: "50%",
                  height: "50%",
                  tintColor: "#F3F4F8",
                }}
              />
            </TouchableOpacity>
          </View>

          {/* flat list */}
          <View>
            <TouchableOpacity style={{}}></TouchableOpacity>
          </View>

          <View style={styles.nearbyShowContainer}>
            <Text style={styles.nearbyAndShowText}>Nearby Helps</Text>
            <TouchableOpacity>
              <Text style={[{ marginRight: 7 }, styles.nearbyAndShowText]}>Show all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1 }}>
            <View style={styles.dataContainer}>
              {activities?.map((data) => (
                <CardCompHome data={data} key={`nearby-data-${data.id}`} handleNavigate={() => {}} />
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  containerUsername: {
    textAlign: "left",
    fontWeight: "600",
    marginBottom: 1,
    fontSize: 25,
    padding: 10,
    fontStyle: "italic",
    color: "#0084B0",
  },

  goodDeedsContainer: {
    textAlign: "left",
    fontWeight: "300",
    fontSize: 14,
    marginLeft: 10,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 16,
    overflow: "hidden",
    marginHorizontal: 10,
  },

  searchIconContainer: {
    flex: 1,
    backgroundColor: "white",
    marginRight: 2,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    height: "100%",
  },

  searchIconStyle: {
    width: 50,
    height: "100%",
    backgroundColor: "#0084B0",
    justifyContent: "center",
    alignItems: "center",
  },

  nearbyShowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 2,
  },

  nearbyAndShowText: {
    fontSize: 20,
    color: "#312651",
    marginLeft: 10,
    marginTop: 10,
  },

  dataContainer: {
    flex: 1,
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
});
