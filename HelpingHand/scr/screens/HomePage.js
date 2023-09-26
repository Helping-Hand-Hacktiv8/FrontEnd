import { useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from "react-native";
import { Button, SearchBar } from "@rneui/base";
import { useEffect, useState } from "react";
import CardComp from "../components/CardComp";
import searchIcon from "../../assets/search.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { asyncFetchActSuccess, asyncFetchSingleUser } from "../store/actions/actionCreator";
import * as SecureStore from "expo-secure-store";

const initialLat = -6.200000
const initialLng = 106.816666

export default function Home({ searchTerms, setSearchTerms, handleClick }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState('')
  const { user } = useSelector((state) => {
    return state.user;
  });

  const { activities } = useSelector((state) => {
    return state.activity;
  });

  const googleAPIkey='AIzaSyBqS7sw4CfzV-dHLQRcNCu4qo3R3HBWAXs'
  const searchPlaces = async () => {
    if(!search.trim().length) return

    const googleApisUrl ='https://maps.googleapis.com/maps/api/place/textsearch/json'
    const input = search.trim()
    const location = `${initialLat},${initialLng}&radius=1000`
    const url = `${googleApisUrl}?query=${input}&location=${location}&key=${googleAPIkey}`
    try {
      const response = await fetch(url)
      const json = await response.json()
      if(json && json.results){
        const coords = []
        for (const item of json.results) {
          coords.push({
            name:item.name,
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng,
          })
        }
        setResult(coords)
        dispatch(asyncFetchActSuccess(coords[0].latitude,coords[0].longitude))
      }

    } catch (error) {
      console.log(error)
      
    }
  }
  useEffect(() => {
    const fetchId = async () => {
      let getId = await SecureStore.getItemAsync("user_id");
      return getId;
    };
    if (isLoading) {
      dispatch(asyncFetchActSuccess('all','all'))
        .then((data) => {
          return fetchId();
        })
        .then((data) => {
          dispatch(asyncFetchSingleUser(data));
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // console.log(search, '<<<<ini searchText')
  // console.log(result, '<<<<<<<ini hasil search')

  
  


  // const data = [ 
  //   {
  //     id: 1,
  //     name: "Mencuri hatinya",
  //     description: "biasalah cinta itu buta",
  //     fromDate: "2023-10-29",
  //     toDate: "2023-12-25",
  //     participant: 2,
  //     reward: 5,
  //     location: "none",
  //     lat: 0,
  //     status: "Pending",
  //     lon: 0,
  //     photoAct: "https://thumbs.dreamstime.com/z/beautiful-exterior-home-pictures-new-home-design-images-modern-best-house-design-images-best-house-images-images-latest-172194515.jpg",
  //     UserActivity: [
  //       {
  //         id: 1,
  //         UserId: 1,
  //         ActivityId: 1,
  //         role: "Author",
  //       },
  //     ],
  //   },
  // ];

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
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <Text
            style={{
              textAlign: "left",
              fontWeight: "600",
              marginBottom: 1,
              fontSize: 25,
              padding: 10,
              fontStyle:'italic',
              color:'#dc6c3c'
            }}
          >
            Welcome {user.name}
          </Text>
          <Text
            style={{
              textAlign: "left",
              fontWeight: "300",
              fontSize: 14,
              marginLeft:10
            }}
          >
            Which good deeds you want to do today?
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
              height: 50,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 16,
              overflow: "hidden",
              marginHorizontal:10
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                marginRight: 2,
                borderRadius: 16,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                height: "100%",
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  height: "100%",
                }}
                value={searchTerms}
                onChangeText={(text) => setSearch(text)}
                placeholder="What kind of deeds you want to have?"
              />
            </View>

            <TouchableOpacity
              style={{
                width: 50,
                height: "100%",
                backgroundColor: "#FF7754",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={searchPlaces}
            >
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

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#312651",
                marginLeft:10,
                marginTop:10
              }}
            >
              Nearby Helps
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  color: "#312651",
                marginRight:10,
                marginTop:10
              }}
              >
                Show all
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1, marginVertical: 15, alignItems: "center", justifyContent: "center", marginTop: 16 }}>
            
              {activities?.map((data) => (
                <CardComp data={data} key={`nearby-data-${data.id}`} handleNavigate={() => {}} />
              ))}

            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  // if (isLogin) {
  //   return (
  //     <SafeAreaView
  //       style={{
  //         flex: 1,
  //       }}
  //     >
  //       <View style={{ backgroundColor: "white", flex: 1 }}>
  //         <Text
  //           style={{
  //             textAlign: "left",
  //             fontWeight: "600",
  //             marginBottom: 1,
  //             fontSize: 25,
  //             padding: 10,
  //           }}
  //         >
  //           Welcome {user.name}
  //         </Text>
  //         <Text
  //           style={{
  //             textAlign: "left",
  //             fontWeight: "300",
  //             fontSize: 14,
  //             padding: 10,
  //           }}
  //         >
  //           Which good deeds you want to do today?
  //         </Text>

  //         <View
  //           style={{
  //             flexDirection: "row",
  //             alignItems: "center",
  //             marginTop: 20,
  //             height: 50,
  //             borderColor: "gray",
  //             borderWidth: 1,
  //             borderRadius: 16,
  //             overflow: "hidden",
  //           }}
  //         >
  //           <View
  //             style={{
  //               flex: 1,
  //               backgroundColor: "white",
  //               marginRight: 2,
  //               borderRadius: 16,
  //               flexDirection: "row",
  //               alignItems: "center",
  //               paddingHorizontal: 10,
  //               height: "100%",
  //             }}
  //           >
  //             <TextInput
  //               style={{
  //                 flex: 1,
  //                 height: "100%",
  //               }}
  //               value={searchTerms}
  //               onChangeText={(text) => setSearchTerms(text)}
  //               placeholder="What kind of deeds you want to have?"
  //             />
  //           </View>

  //           <TouchableOpacity
  //             style={{
  //               width: 50,
  //               height: "100%",
  //               backgroundColor: "#FF7754",
  //               justifyContent: "center",
  //               alignItems: "center",
  //             }}
  //             onPress={handleClick}
  //           >
  //             <Image
  //               source={searchIcon}
  //               resizeMode="contain"
  //               style={{
  //                 width: "50%",
  //                 height: "50%",
  //                 tintColor: "#F3F4F8",
  //               }}
  //             />
  //           </TouchableOpacity>
  //         </View>

  //         <View>
  //           <TouchableOpacity style={{}}></TouchableOpacity>
  //         </View>

  //         <View
  //           style={{
  //             flexDirection: "row",
  //             justifyContent: "space-between",
  //             alignItems: "center",
  //             marginTop: 2,
  //           }}
  //         >
  //           <Text
  //             style={{
  //               fontSize: 20,
  //               color: "#312651",
  //             }}
  //           >
  //             Nearby Helps
  //           </Text>
  //           <TouchableOpacity>
  //             <Text
  //               style={{
  //                 fontSize: 20,
  //                 color: "#312651",
  //               }}
  //             >
  //               Show all
  //             </Text>
  //           </TouchableOpacity>
  //         </View>

  //         <ScrollView style={{ flex: 1 }}>
  //           <View style={{ flex: 1, marginVertical: 15, alignItems: "center", justifyContent: "center", marginTop: 16 }}>
  //             {/* {isLoading ? (
  //         <ActivityIndicator size="large" color={"#312651"} />
  //       ) : error ? (
  //         <Text>Something went wrong</Text> */}
  //             {/* ) : ( */}
  //             {activities?.map((data) => (
  //               <CardComp data={data} key={`nearby-data-${data.id}`} handleNavigate={() => {}} />
  //             ))}
  //             {/* )} */}
  //           </View>
  //         </ScrollView>
  //       </View>
  //     </SafeAreaView>
  //   );
  // } else {
  //   return (
  //     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
  //       <View style={{ flexDirection: "row" }}>
  //         <View style={{ marginHorizontal: 10 }}>
  //           <Button
  //             title="Login"
  //             style={{ marginHorizontal: 10 }}
  //             onPress={() => {
  //               navigation.navigate("Login");
  //             }}
  //           />
  //         </View>
  //         <View style={{ marginHorizontal: 10 }}>
  //           <Button
  //             title="Register"
  //             onPress={() => {
  //               navigation.navigate("Register");
  //             }}
  //           />
  //         </View>
  //       </View>
  //     </View>
  //   );
  // }
}

const styles = StyleSheet.create({});
