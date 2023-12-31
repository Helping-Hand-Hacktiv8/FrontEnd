import {
    ACTIVITIES_FETCH_SUCCESS,
    USER_EDIT_ON_CHANGE,
    USER_GET_ACCESS_TOKEN,
    REWARDS_FETCH_SUCCESS,
    AUTHOR_ACTIVITIES_FETCH_SUCCESS,
    PARTICIPANT_ACTIVITIES_FETCH_SUCCESS,
    ACTIVITY_FETCH_SUCCESS,
    USER_REWARDS_FETCH_SUCCESS,
    ACTIVITY_FETCH_AUTHOR,
} from "./actionType";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
const baseUrl = "https://helping-hand-server.blekzzz.com";

export const editUserOnChange = (data) => {
    return {
        type: USER_EDIT_ON_CHANGE,
        payload: data,
    };
};

export const editUserToken = (data) => {
    return {
        type: USER_GET_ACCESS_TOKEN,
        payload: data,
    };
};

export const fetchActivitiesSuccess = (data) => {
    return {
        type: ACTIVITIES_FETCH_SUCCESS,
        payload: data,
    };
};

export const fetchActivitySuccess = (data) => {
    return {
        type: ACTIVITY_FETCH_SUCCESS,
        payload: data,
    };
};

export const fetchAuthorActivitySuccess = (data) => {
    return {
        type: ACTIVITY_FETCH_AUTHOR,
        payload: data,
    };
};

export const fetchRewardsSuccess = (data) => {
    return {
        type: REWARDS_FETCH_SUCCESS,
        payload: data,
    };
};

export const fetchUserRewardsSuccess = (data) => {
    return {
        type: USER_REWARDS_FETCH_SUCCESS,
        payload: data,
    };
};

export const fetchAuthorActivitiesSuccess = (data) => {
    return {
        type: AUTHOR_ACTIVITIES_FETCH_SUCCESS,

        payload: data,
    };
};

export const fetchParticipantActivitiesSuccess = (data) => {
    return {
        type: PARTICIPANT_ACTIVITIES_FETCH_SUCCESS,
        payload: data,
    };
};

// ===================================AXIOS=====================================
export const registerUser = (registerForm) => {
    return async () => {
        try {
            // console.log(registerForm)
            const { data } = await axios({
                method: "post",
                url: baseUrl + "/register",
                data: registerForm,
            });
            return data;
        } catch (err) {
            throw err.response.data;
        }
    };
};

export const loginUser = (loginForm) => {
    return async (dispatch) => {
        try {
            console.log(loginForm);
            const { data } = await axios({
                method: "post",
                url: baseUrl + "/login",
                data: loginForm,
            });

            // console.log('GET>>',data)
            await SecureStore.setItemAsync("access_token", data.access_token);
            await SecureStore.setItemAsync("user_id", String(data.dataUser.id));
            // const token = await SecureStore.getItemAsync('access_token')
            // console.log("TOKEN>>>",token)
            dispatch(editUserToken(data.access_token));
            dispatch(editUserOnChange(data.dataUser));
            return data.dataUser;
        } catch (err) {
            console.log(err);
            throw err.response.data;
        }
    };
};

export const asyncFetchSingleUser = (id) => {
    return async (dispatch) => {
        try {
            const access_token = await SecureStore.getItemAsync("access_token");
            const { data } = await axios({
                method: "GET",
                url: baseUrl + "/users/profile/" + id,
                headers: { access_token },
            });
            dispatch(editUserOnChange(data));
            return data;
        } catch (error) {
            console.log(error);
            throw error.response.data;
        }
    };
};

export const asyncPutUserProfile = (form) => {
    return async () => {
        try {
            const getId = await SecureStore.getItemAsync("user_id");
            const access_token = await SecureStore.getItemAsync("access_token");
            const { data } = await axios({
                method: "PUT",
                url: baseUrl + "/users/profile/" + getId,
                headers: {
                    access_token,
                    "Content-Type": "multipart/form-data",
                },
                data: form,
            });
        } catch (error) {
            throw error.response.data;
        }
    };
};

// ===================================ACTIVITIES=====================================

export const asyncFetchActSuccess = (lat, lon) => {
    return async (dispatch) => {
        try {
            console.log(lat, lon);
            const access_token = await SecureStore.getItemAsync("access_token");
            console.log(access_token);
            const { data } = await axios({
                method: "POST",
                url: baseUrl + "/activities/all",
                headers: { access_token },
                data: {
                    latitude: lat,
                    longitude: lon,
                },
            });

            const getId = await SecureStore.getItemAsync("user_id");
            let res = [];
            for (let arr of data) {
                // console.log("HASIL>>>",arr.UserActivities)
                let stat = arr.UserActivities.map((el) => {
                    if (el.UserId == +getId) {
                        return true;
                    } else {
                        return false;
                    }
                });
                // console.log(stat)
                if (!stat.includes(true)) res.push(arr);
            }
            // console.log("filter>>>",res)
            dispatch(fetchActivitiesSuccess(res));
        } catch (error) {
            throw error.response.data;
        }
    };
};

export const fetchAuthorActivity = (id) => {
    return async (dispatch) => {
        try {
            const access_token = await SecureStore.getItemAsync("access_token");
            const { data: activity } = await axios({
                method: "GET",
                url: baseUrl + "/activities/" + id,
                headers: { access_token },
            });

            const author = activity.UserActivities.find((el) => el.role == "Author");
            const { data: user } = await axios.get(baseUrl + '/users/profile/' + author.UserId, {
                headers: { access_token }
            })

            dispatch(fetchAuthorActivitySuccess(user));
            return author;
        } catch (error) {
            throw error.response.data;
        }
    };
};

export const asyncFetchActSingleParticipant = (id) => {
    return async (dispatch) => {
        try {
            const access_token = await SecureStore.getItemAsync("access_token");
            const { data } = await axios({
                method: "GET",
                url: baseUrl + "/activities/" + id,
                headers: { access_token },
            });

            let res = [];
            for (let arr of data.UserActivities) {
                // console.log("HASIL>>>",arr.UserActivities)
                if (arr.role !== "Author") {
                    res.push(arr);
                }
            }
            data.UserActivities = res;
            // console.log("filter>>>",data)

            dispatch(fetchActivitySuccess(data));
            return data;
        } catch (error) {
            throw error.response.data;
        }
    };
};

export const asyncPostActivities = (form) => {
    return async () => {
        try {
            const getId = await SecureStore.getItemAsync("user_id");
            const access_token = await SecureStore.getItemAsync("access_token");
            console.log(form);
            const { data } = await axios({
                method: "POST",
                url: baseUrl + "/activities",
                headers: {
                    access_token,
                    "Content-Type": "multipart/form-data",
                },
                data: form,
            });
        } catch (error) {
            console.log(error);
            throw error.response.data;
        }
    };
};

export const asyncPutActivities = (form, activityId) => {
  return async () => {
    try {
      const getId = await SecureStore.getItemAsync("user_id");
      const access_token = await SecureStore.getItemAsync("access_token");
      console.log(form);
      const { data } = await axios({
        method: "PUT",
        url: baseUrl + "/activities/" + activityId,
        headers: {
          access_token,
          "Content-Type": "multipart/form-data",
        },
        data: form,
      });
    } catch (error) {
      console.log(error);
      throw error.response.data;
    }
  };
};

export const asyncFinishActivity = (id) => {
    return async () => {
        try {
            const getId = await SecureStore.getItemAsync("user_id");
            console.log(getId);
            const access_token = await SecureStore.getItemAsync("access_token");
            const arrayUser = [
                {
                    UserId: getId,
                    ActivityId: id,
                    role: "Participant",
                },
            ];

            console.log(arrayUser);

            const { data } = await axios({
                method: "PUT",
                url: baseUrl + "/activities/finish/" + id,
                headers: {
                    access_token,
                },
                data: { arrayUser },
            });
        } catch (error) {
            throw error.response.data;
        }
    };
};

export const asyncCancelActivity = (id) => {
    return async () => {
        try {
            const getId = await SecureStore.getItemAsync("user_id");
            const access_token = await SecureStore.getItemAsync("access_token");
            const { data } = await axios({
                method: "PATCH",
                url: baseUrl + "/activities/cancel/" + id,
                headers: {
                    access_token,
                },
            });
        } catch (error) {
            throw error.response.data;
        }
    };
};

// ===================================USERACTIVITIES=====================================

export const asyncFetchActAuthorParticipantSuccess = () => {
    return async (dispatch) => {
        try {
            const access_token = await SecureStore.getItemAsync("access_token");
            const { data } = await axios({
                method: "GET",
                url: baseUrl + "/user-activities",
                headers: { access_token },
            });

            const getId = await SecureStore.getItemAsync("user_id");
            let resAuthor = [];
            let resParticipant = [];
            // console.log(data, "diCreator")

            for (let arr of data) {
                if (arr.role === "Author") {
                    resAuthor.push(arr);
                } else resParticipant.push(arr);
            }

            dispatch(fetchAuthorActivitiesSuccess(resAuthor));
            dispatch(fetchParticipantActivitiesSuccess(resParticipant));
            return data;
        } catch (error) {
            throw error.response.data;
        }
    };
};

export const asyncParticipate = (ActivityId) => {
    return async () => {
        try {
            const access_token = await SecureStore.getItemAsync("access_token");
            const { data } = await axios({
                method: "post",
                url: baseUrl + "/user-activities",
                data: { ActivityId },
                headers: { access_token },
            });

            return data;
        } catch (err) {
            throw err.response.data;
        }
    };
};

export const asyncUnparticipate = (ActivityId) => {
    return async (dispatch) => {
        try {
            const access_token = await SecureStore.getItemAsync("access_token");
            const { data } = await axios({
                method: "DELETE",
                url: baseUrl + "/user-activities/" + ActivityId,
                headers: { access_token },
            });
            dispatch(asyncFetchActAuthorParticipantSuccess());
            return data;
        } catch (err) {
            throw err.response.data;
        }
    };
};

// ===================================REWARDS=====================================

export const asyncFetchRewardsSuccess = () => {
    return async (dispatch) => {
        try {
            const access_token = await SecureStore.getItemAsync("access_token");
            const { data } = await axios({
                method: "GET",
                url: baseUrl + "/rewards",
                headers: { access_token },
            });
            dispatch(fetchRewardsSuccess(data));
            return data;
        } catch (error) {
            throw error.response.data;
        }
    };
};

export const asyncClaimReward = (RewardId) => {
    return async (dispatch) => {
        try {
            const access_token = await SecureStore.getItemAsync("access_token");
            const { data } = await axios({
                method: "POST",
                url: baseUrl + "/user-rewards",
                headers: { access_token },
                data: { RewardId },
            });
        } catch (error) {
            throw error.response.data;
        }
    };
};

export const asyncFetchUserReward = () => {
    return async (dispatch) => {
        try {
            const getId = await SecureStore.getItemAsync("user_id");
            const access_token = await SecureStore.getItemAsync("access_token");
            const { data } = await axios({
                method: "GET",
                url: baseUrl + "/user-rewards",
                headers: { access_token },
            });
            dispatch(fetchUserRewardsSuccess(data));
        } catch (error) {
            throw error.response.data;
        }
    };
};

export const asyncFetchSingleActivity = (id) => {
    return async (dispatch) => {
        try {
            const getId = await SecureStore.getItemAsync("user_id");
            const access_token = await SecureStore.getItemAsync("access_token");
            const { data } = await axios({
                method: "GET",
                url: baseUrl + "/activities/" + id,
                headers: { access_token },
            });
            return data;
        } catch (error) {
            throw error.response.data;
        }
    };
};

export const handleMidtrans = (input) => {
    return async function (dispatch, getState) {
        try {
            const access_token = await SecureStore.getItemAsync("access_token");
            const { data } = await axios({
                url: baseUrl + "/users/generate-midtrans-token",
                method: "POST",
                data: {
                    amount: input * 20000,
                },
                headers: { access_token },
            });

            return data;
        } catch (error) {
            console.log(error);
        }
    };
};

export const submitEditProfile = (target, id, data) => {
    return () => {
        return fetch(baseUrl + "/" + target + "/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                access_token: localStorage.access_token,
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                return data;
            })
            .catch((err) => {
                throw err;
            });
    };
};

export const asyncFetchActSingleSuccess = (id) => {
    return async (dispatch) => {
        try {
            const access_token = await SecureStore.getItemAsync("access_token");
            const { data } = await axios({
                method: "GET",
                url: baseUrl + "/activities/" + id,
                headers: { access_token },
            });

            dispatch(fetchActivitySuccess(data));
            return data;
        } catch (error) {
            throw error.response.data;
        }
    };
};
