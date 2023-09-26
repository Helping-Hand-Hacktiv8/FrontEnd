import { View, Text, Image } from "react-native";
import { Divider } from "@rneui/themed";
import { FontAwesome } from '@expo/vector-icons';

export default function ActivityDetails({route}) {
    const Participant = true
    const Author = false

    if(Author) {
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

            </Text>
            <View
              style={{
                width: 350,
                height: 500,
                elevation: 5,
                borderRadius: 10,
                backgroundColor: "#dc6c3c",
                alignSelf: "center",
                marginVertical: 15,
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
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Help Me Paint My House
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: "#175D8C",
                    marginTop: 10,
                    marginLeft: 10,
                    width: 80,
                    alignSelf: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ textAlign: "center", color: "white" }}>Author:</Text>
                </View>
                <View style={{ marginTop: 10, width: 80, alignSelf: "center" }}>
                  <Text style={{ textAlign: "center", color: "white" }}>Damara</Text>
                </View>
              </View>
      
              {/* =============TOPSECTION======== */}
              <Divider width={2} color="black" style={{ marginTop: 10 }} />
              <View style={{padding:10}}>
              <Text style={{color:'white', fontWeight:'bold'}}>Description:</Text>
              <Text style={{color:'white', fontWeight:'bold'}}>
                I'm looking for some helping hands to paint my house. This project
                involves revitalizing the look and feel of our home by giving it a new
                paint job, both inside and outside. It's a task that's too big for one
                person to handle alone, so I'm reaching out for support.
              </Text>
              </View>
              <Divider width={2} color="black" style={{ marginTop: 10 }} />
              <View style={{padding:10}}>
              <Text style={{color:'white', fontWeight:'bold'}}>Place/Destination:</Text>
              <Text style={{color:'white', fontWeight:'bold'}}>
              South Jakarta, Radio Dalam. Antena 6. RT RW 03/02.(Near Masjid Nurul Iman)
              </Text>
              </View>
              {/* =============MIDSECTION======== */}
              <Divider width={2} color="black" style={{ marginTop: 10 }} />
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: "#175D8C",
                    marginTop: 10,
                    marginLeft: 10,
                    alignSelf: "center",
                    borderRadius: 10,
                    padding:10
                  }}
                >
                  <Text style={{ textAlign: "center", color: "white" }}>Participants:</Text>
                </View>
                <View style={{ marginTop: 10, alignSelf: "center", marginLeft:8 }}>
                  <Text style={{ textAlign: "center", color: "white" }}>5/6</Text>
                </View>
                <View style={{width:90, marginHorizontal:-20}}/>
                <View
                  style={{
                    marginTop: 10,
                    alignSelf: "center",
                    paddingLeft:30
                  }}
                >
                  <Text style={{ textAlign: "center", color: "white" }}>Rewards:</Text>
                </View>
                <View style={{ marginTop: 10, alignSelf: "center", marginLeft:8, flexDirection:'row', alignItems:'center'}}>
                  <Text style={{ textAlign: "center", color: "white" }}>200</Text>
                  <FontAwesome name="star" size={24} color="yellow"  style={{marginLeft:5}}/>
      
                </View>
              </View>
      
            </View>
          </View>
        );
    } else if (Participant) {
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
              The purpose of human life is to serve and to show compassion and the
              will to help others." - Albert Schweitzer
            </Text>
            <View
              style={{
                width: 350,
                height: 500,
                elevation: 5,
                borderRadius: 10,
                backgroundColor: "#dc6c3c",
                alignSelf: "center",
                marginVertical: 15,
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
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Help Me Paint My House
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: "#175D8C",
                    marginTop: 10,
                    marginLeft: 10,
                    width: 80,
                    alignSelf: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ textAlign: "center", color: "white" }}>Author:</Text>
                </View>
                <View style={{ marginTop: 10, width: 80, alignSelf: "center" }}>
                  <Text style={{ textAlign: "center", color: "white" }}>Damara</Text>
                </View>
                <View style={{width:80}}></View>
                <View
                  style={{
                    backgroundColor: "green",
                    marginTop: 10,
                    marginLeft: 10,
                    width: 80,
                    alignSelf: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ textAlign: "center", color: "white" }}>Joined</Text>
                </View>
              </View>
      
              {/* =============TOPSECTION======== */}
              <Divider width={2} color="black" style={{ marginTop: 10 }} />
              <View style={{padding:10}}>
              <Text style={{color:'white', fontWeight:'bold'}}>Description:</Text>
              <Text style={{color:'white', fontWeight:'bold'}}>
                I'm looking for some helping hands to paint my house. This project
                involves revitalizing the look and feel of our home by giving it a new
                paint job, both inside and outside. It's a task that's too big for one
                person to handle alone, so I'm reaching out for support.
              </Text>
              </View>
              <Divider width={2} color="black" style={{ marginTop: 10 }} />
              <View style={{padding:10}}>
              <Text style={{color:'white', fontWeight:'bold'}}>Place/Destination:</Text>
              <Text style={{color:'white', fontWeight:'bold'}}>
              South Jakarta, Radio Dalam. Antena 6. RT RW 03/02.(Near Masjid Nurul Iman)
              </Text>
              </View>
              {/* =============MIDSECTION======== */}
              <Divider width={2} color="black" style={{ marginTop: 10 }} />
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: "#175D8C",
                    marginTop: 10,
                    marginLeft: 10,
                    alignSelf: "center",
                    borderRadius: 10,
                    padding:10
                  }}
                >
                  <Text style={{ textAlign: "center", color: "white" }}>Participants:</Text>
                </View>
                <View style={{ marginTop: 10, alignSelf: "center", marginLeft:8 }}>
                  <Text style={{ textAlign: "center", color: "white" }}>5/6</Text>
                </View>
                <View style={{width:90, marginHorizontal:-20}}/>
                <View
                  style={{
                    marginTop: 10,
                    alignSelf: "center",
                    paddingLeft:30
                  }}
                >
                  <Text style={{ textAlign: "center", color: "white" }}>Rewards:</Text>
                </View>
                <View style={{ marginTop: 10, alignSelf: "center", marginLeft:8, flexDirection:'row', alignItems:'center'}}>
                  <Text style={{ textAlign: "center", color: "white" }}>200</Text>
                  <FontAwesome name="star" size={24} color="yellow"  style={{marginLeft:5}}/>
                </View>
              </View>
            </View>
          </View>
        )
    } else {
        return <Text>Neither</Text>
    }
}
