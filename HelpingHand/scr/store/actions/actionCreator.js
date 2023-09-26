
import {  ACTIVITIES_FETCH_SUCCESS, USER_EDIT_ON_CHANGE, USER_SET_EMPTY_DATA, USER_GET_ACCESS_TOKEN, REWARDS_FETCH_SUCCESS, USERACTIVITIES_FETCH_SUCCESS } from "./actionType"
import axios from 'axios'
import * as SecureStore from "expo-secure-store";
// const baseUrl = 'https://34ae-114-122-107-88.ngrok-free.app'
// masukin punya sendiri
const baseUrl = 'https://4a26-180-252-171-208.ngrok-free.app'
const baseUrlMid = 'https://19a6-182-253-163-163.ngrok-free.app'


// export const setEmptyDataUserSuccess = (data) =>{
//     return{
//         type:USER_SET_EMPTY_DATA,
//         payload:data
//     }
// }

export const editUserOnChange = (data) => {
    return {
        type: USER_EDIT_ON_CHANGE,
        payload: data
    }
}

export const editUserToken = (data) => {
    return {
        type: USER_GET_ACCESS_TOKEN,
        payload: data
    }
}

export const fetchActivitiesSuccess = (data) => {
    return {
        type: ACTIVITIES_FETCH_SUCCESS,
        payload: data
    }
}

export const fetchRewardsSuccess = (data) =>{
    return{
        type:REWARDS_FETCH_SUCCESS,
        payload:data
    }
}

export const fetchUserActivitiesSuccess = (data) =>{
    return{
        type:USERACTIVITIES_FETCH_SUCCESS,
        payload:data
    }
}

// export const fetchJobSuccess = (data) =>{
//     return{
//         type:JOBS_FETCH_SUCCESS,
//         payload:data
//     }
// }



// export const fetchSingleJobSuccess = (data) =>{
//     return{
//         type:JOBS_SINGLE_FETCH_SUCCESS,
//         payload:data
//     }
// }

// export const setEmptyDataJobSuccess = (data) =>{
//     return{
//         type:JOBS_SET_EMPTY_DATA,
//         payload:data
//     }
// }

// export const editJobsOnChange = (data) =>{
//     return{
//         type:JOBS_EDIT_ON_CHANGE,
//         payload:data
//     }
// }

// export const editCompaniesOnChange = (data) =>{
//     return{
//         type:COMPANIES_EDIT_ON_CHANGE,
//         payload:data
//     }
// }


// export const fetchCompanySuccess = (data) =>{
//     return{
//         type:COMPANIES_FETCH_SUCCESS,
//         payload:data
//     }
// }

// export const fetchSingleCompanySuccess = (data) =>{
//     return{
//         type:COMPANIES_SINGLE_FETCH_SUCCESS,
//         payload:data
//     } 
// }

// export const setEmptyDataCompanySuccess = (data) =>{
//     return{
//         type:COMPANIES_SET_EMPTY_DATA,
//         payload:data
//     }
// }


// ===================================AXIOS=====================================
export const registerUser = (registerForm) => {
    return async () => {
        try {
            // console.log(registerForm)
            const { data } = await axios({
                method: 'post',
                url: baseUrl + '/register',
                data: registerForm
            })
            return data
        }
        catch (err) {
            throw err.response.data
        }
    }
}

export const loginUser = (loginForm) => {
    return async (dispatch) => {
        try {
            console.log(loginForm)
            const { data } = await axios({
                method: 'post',
                url: baseUrl + '/login',
                data: loginForm
            })
            dispatch(editUserToken(data.access_token))
            await SecureStore.setItemAsync('access_token', data.access_token)
            await SecureStore.setItemAsync('user_id', String(data.dataUser.id))
            dispatch(editUserOnChange(data.dataUser))
            return data.dataUser
        }
        catch (err) {
            console.log(err)
            throw err.response.data
        }
    }
}

export const asyncFetchSingleUser = (id) => {
    return async (dispatch) => {
        try {
            const access_token = await SecureStore.getItemAsync('access_token')
            const { data } = await axios({
                method: 'GET',
                url: baseUrl + '/users/profile/' + id,
                headers: { access_token }
            })
            dispatch(editUserOnChange(data))
            console.log(data)
            return data
        } catch (error) {
            throw error.response.data
        }
    }
}


// ===================================ACTIVITIES=====================================

export const asyncFetchActSuccess = (lat, lon) =>{
    return async (dispatch) =>{
       try {
        console.log(lat, lon)
        const access_token = await SecureStore.getItemAsync('access_token')
        const { data } = await axios({
            method:'POST',
            url:baseUrl+'/activities/all',
            headers:{access_token},
            data:{
                latitude:lat,
                longitude:lon
            }
        })
        
        const getId = await SecureStore.getItemAsync('user_id')
        let res = []
        for(let arr of data){
            // console.log("HASIL>>>",arr.UserActivities)
            let stat = arr.UserActivities.map(el=>{
                if(el.UserId == +getId ){
                    return true
                } else{return false}
            })
            // console.log(stat)
            if (!stat.includes(true)) res.push(arr)
        }
        // console.log("filter>>>",res)
        dispatch(fetchActivitiesSuccess(res))
        return data
       } catch (error) {
            throw error.response.data
       }
    }
}
export const asyncFetchUserActivitiesSuccess = () =>{
    return async (dispatch) =>{
       try {
        const access_token = await SecureStore.getItemAsync('access_token')
        const { data } = await axios({
            method:'GET',
            url:baseUrl+'/user-activities',
            headers:{access_token}
        })
        dispatch(fetchUserActivitiesSuccess(data))
        return data
       } catch (error) {
            throw error.response.data
       }
    }
}


export const companyDelete = (id) => {
    return (dispatch) => {
        return fetch(baseUrl + '/companies/' + id, {
            method: 'DELETE',
            headers: {
                "access_token": localStorage.access_token
            }
        })
            .then((res) => {
                dispatch(asyncFetchCompaniesSuccess())
                return res.json()
            })
            .then(data => {
                return data
            })
            .catch(err => {
                throw err
            })
    }
}

export const jobDelete = (id) => {
    return (dispatch) => {
        return fetch(baseUrl + '/jobs/' + id, {
            method: 'DELETE',
            headers: {
                "access_token": localStorage.access_token
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw { name: 'Delete failed' }
                }
                dispatch(asyncFetchJobSuccess())
                return res.json()
            })
            .then(data => {
                return data
            })
            .catch(err => {
                throw err
                console.log(err)
            })
    }
}

export const submitEdit = (target, id, data) => {
    return () => {
        return fetch(baseUrl + '/' + target + '/' + id,
            {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "access_token": localStorage.access_token
                },
                body: JSON.stringify(data)
            }
        )
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(data => {
                return data
            })
            .catch(err => {
                throw err
            })
    }
}


//tes aja
export const submitNew = (target, data) => {
    return () => {
        return fetch(baseUrl + '/' + target,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "access_token": localStorage.access_token
                },
                body: JSON.stringify(data)
            }
        )
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(data => {
                return data
            })
            .catch(err => {
                throw err

            })
    }
}

export const asyncFetchJobSuccess = () => {
    return (dispatch) => {
        return fetch(baseUrl + '/jobs', {
            headers: {
                "access_token": localStorage.access_token
            }
        })
            .then(response => {
                if (!response.ok) throw { name: 'fetching gagal' }
                return response.json()
            })
            .then(res => {
                const action = fetchJobSuccess(res)
                dispatch(action)
            })
            .catch(err => {
                throw err
                console.log(err)
            })
    }
}

export const asyncFetchCompaniesSuccess = () => {
    return (dispatch) => {
        return fetch(baseUrl + '/companies', {
            headers: {
                "access_token": localStorage.access_token
            }
        })
            .then(res => {
                if (!res.ok) throw { name: 'fetching gagal' }
                return res.json()
            })
            .then(data => {
                const action = fetchCompanySuccess(data)
                dispatch(action)
            })
            .catch(err => {
                throw err

            })
    }
}

export const asyncFetchSingleJobSuccess = (id) => {
    return (dispatch) => {
        return fetch(baseUrl + '/jobs/' + id, {
            headers: {
                "access_token": localStorage.access_token
            }
        })
            .then(res => {
                if (!res.ok) throw { name: 'fetching gagal' }
                return res.json()
            })
            .then(data => {
                console.log('ada data', data)
                const action = fetchSingleJobSuccess(data)
                dispatch(action)
                return data
            })
            .catch(err => {
                throw err
            })
    }
}

export const asyncFetchSingleCompSuccess = (id) => {
    return (dispatch) => {
        return fetch(baseUrl + '/companies/' + id, {
            headers: {
                "access_token": localStorage.access_token
            }
        })
            .then(res => {
                if (!res.ok) throw { name: 'fetching gagal' }
                return res.json()
            })
            .then(data => {
                console.log('data', data)
                const action = fetchSingleCompanySuccess(data)
                dispatch(action)
                return data
            })
            .catch(err => {
                throw err

            })
    }
}

export const handleMidtrans = (input) => {
    return async function (dispatch, getState) {
        try {
            const access_token = await SecureStore.getItemAsync('access_token')
            const { data } = await axios({
                url: baseUrlMid + '/users/generate-midtrans-token',
                method: 'POST',
                data: {
                    amount: input * 20000
                },
                headers: { access_token }
            })

            return data
        } catch (error) {
            console.log(error);
        }
    }
}

export const submitEditProfile = (target, id, data) => {
    return () => {
        return fetch(baseUrl + '/' + target + '/' + id,
            {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "access_token": localStorage.access_token
                },
                body: JSON.stringify(data)
            }
        )
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(data => {
                return data
            })
            .catch(err => {
                throw err
            })
    }
}