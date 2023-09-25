import { useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from "react-native";
import { Button, SearchBar } from "@rneui/base";
import { useState } from "react";
import CardComp from "../components/CardComp";
import searchIcon from "../../assets/search.png"

export default function Home({ searchTerms, setSearchTerms, handleClick }) {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  const isLoading = true
  let isLogin = true;
  if (isLogin) {
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <Text
          style={{
            textAlign: "left",
            fontWeight: "600",
            marginBottom: 1,
            fontSize: 25,
            padding: 10,
          }}
        >
          Welcome "User"
        </Text>
        <Text
          style={{
            textAlign: "left",
            fontWeight: "300",
            fontSize: 14,
            padding: 10,
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
              onChangeText={(text) => setSearchTerms(text)}
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
            onPress={handleClick}
            >
            <Image
            source={searchIcon}
            resizeMode='contain'
            style={{
              width: "50%",
              height: "50%",
              tintColor: "#F3F4F8"
            }}
          />
          </TouchableOpacity>
        </View>

        <View>
        <TouchableOpacity
        style={{
          
        }}
        >

        </TouchableOpacity>
        </View>

        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 2
        }}>

        <Text style={{
          fontSize: 20,
          color: "#312651",
        }}>Nearby Helps</Text>
        <TouchableOpacity>
          <Text style={{
          fontSize: 20,
          color: "#312651",
        }}>Show all</Text>
        </TouchableOpacity>
      </View>

        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, marginVertical: 15, alignItems: "center", justifyContent: "center", marginTop: 16 }}>
          {isLoading ? (
          <ActivityIndicator size="large" color={"#312651"} />
        ) : error ? (
          <Text>Something went wrong</Text>
          ) : (
            data?.map((data) => <CardComp data={data} key={`nearby-data-${data.id}`} handleNavigate={() => {}} />)
            )}
            <CardComp />
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginHorizontal: 10 }}>
            <Button
              title="Login"
              style={{ marginHorizontal: 10 }}
              onPress={() => {
                navigation.navigate("Login");
              }}
            />
          </View>
          <View style={{ marginHorizontal: 10 }}>
            <Button
              title="Register"
              onPress={() => {
                navigation.navigate("Register");
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

})