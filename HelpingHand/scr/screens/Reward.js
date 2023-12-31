import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import CardReward from "../components/CardReward";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncFetchRewardsSuccess,
  asyncFetchUserReward,
} from "../store/actions/actionCreator";

export default function Reward() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { userRewards } = useSelector((state) => {
    return state.rewards;
  });
  const { rewards } = useSelector((state) => {
    return state.rewards;
  });

  const { user } = useSelector((state) => {
    return state.user;
  });

  let claimed = []

  useEffect(() => {
    if (isLoading) {
      dispatch(asyncFetchRewardsSuccess())
        .then((data) => {
          dispatch(asyncFetchUserReward())
        })
        .then((e) => {
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoading]);


  userRewards.map((e) => {
    claimed.push(e.RewardId)
  })


  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color={"#312651"} />
      </SafeAreaView>
    );
  } else
    return (
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView>
          <Text style={styles.totalPoints}>Total Points</Text>

          <View style={styles.pointsContainer}>
            <Text
              style={{
                color: "white",
                fontSize: 33,
                fontWeight: "bold",
              }}
            >
              {user.token}
            </Text>
          </View>
          <Text style={styles.claimReward}>Claim Reward</Text>
          <View style={{ alignItems: "center" }}>
            {rewards?.map((data) => {
              return (
                <CardReward
                  data={data}
                  claimed={claimed}
                  key={`nearby-data-${data.id}`}
                  handleNavigate={() => { }}
                />
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  },

  totalPoints: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 25,
    padding: 10,
  },

  pointsContainer: {
    backgroundColor: "#3AAACF",
    height: 60,
    alignSelf: "center",
    borderRadius: 50,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: 250,
  },

  claimReward: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 22,
    padding: 10,
    marginTop: 20,
  },
});
