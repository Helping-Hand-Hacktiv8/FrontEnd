import { COMPANIES_EDIT_ON_CHANGE, COMPANIES_FETCH_SUCCESS, COMPANIES_SET_EMPTY_DATA, COMPANIES_SINGLE_FETCH_SUCCESS, JOBS_EDIT_ON_CHANGE, JOBS_FETCH_SUCCESS, JOBS_SET_EMPTY_DATA, JOBS_SINGLE_FETCH_SUCCESS, USER_EDIT_ON_CHANGE, USER_SET_EMPTY_DATA, USER_GET_ACCESS_TOKEN } from "./actionType"
const baseUrl = 'https://31b7-114-122-110-8.ngrok-free.app'


export const setEmptyDataUserSuccess = (data) =>{
    return{
        type:USER_SET_EMPTY_DATA,
        payload:data
    }
}

export const editUserOnChange = (data) =>{
    return{
        type:USER_EDIT_ON_CHANGE,
        payload:data
    }
}

export const editUserToken = (data) =>{
    return{
        type:USER_GET_ACCESS_TOKEN,
        payload:data
    }
}

export const fetchJobSuccess = (data) =>{
    return{
        type:JOBS_FETCH_SUCCESS,
        payload:data
    }
}



export const fetchSingleJobSuccess = (data) =>{
    return{
        type:JOBS_SINGLE_FETCH_SUCCESS,
        payload:data
    }
}

export const setEmptyDataJobSuccess = (data) =>{
    return{
        type:JOBS_SET_EMPTY_DATA,
        payload:data
    }
}

export const editJobsOnChange = (data) =>{
    return{
        type:JOBS_EDIT_ON_CHANGE,
        payload:data
    }
}

export const editCompaniesOnChange = (data) =>{
    return{
        type:COMPANIES_EDIT_ON_CHANGE,
        payload:data
    }
}


export const fetchCompanySuccess = (data) =>{
    return{
        type:COMPANIES_FETCH_SUCCESS,
        payload:data
    }
}

export const fetchSingleCompanySuccess = (data) =>{
    return{
        type:COMPANIES_SINGLE_FETCH_SUCCESS,
        payload:data
    }
}

export const setEmptyDataCompanySuccess = (data) =>{
    return{
        type:COMPANIES_SET_EMPTY_DATA,
        payload:data
    }
}

export const companyDelete = (id) =>{
    return (dispatch) =>{
       return fetch(baseUrl+'/companies/'+id,{
            method:'DELETE',
            headers:{
                "access_token":localStorage.access_token
            }
        })
        .then((res)=>{
            dispatch(asyncFetchCompaniesSuccess())
            return res.json()
        })
        .then(data =>{
            return data
        })
        .catch(err=>{
            throw err
        })
    }
}

export const jobDelete = (id) =>{
    return (dispatch)=>{
       return fetch(baseUrl+'/jobs/'+id,{
            method:'DELETE',
            headers:{
                "access_token":localStorage.access_token
            }
        })
        .then((res)=>{
            if(!res.ok){
                throw{name:'Delete failed'}
            }
            dispatch(asyncFetchJobSuccess())
            return res.json()
        })
        .then(data =>{
            return data
        })
        .catch(err=>{
            throw err
            console.log(err)
        })
    }
}

export const submitEdit = (target,id, data) =>{
    return () =>{
        return fetch(baseUrl+'/'+target+'/'+id,
            {
                method:'PUT',
                headers:{
                    "Content-Type": "application/json",
                    "access_token":localStorage.access_token
                },
                body: JSON.stringify(data)
            }
        )
        .then(res=>{
            if(res.ok){
                return res.json()
            }
        })
        .then(data=>{
            return data
        })
        .catch(err=>{
            throw err
        })
    }
}

export const submitNew = (target, data) =>{
    return () =>{
       return fetch(baseUrl+'/'+target,
            {
                method:'POST',
                headers:{
                    "Content-Type": "application/json",
                    "access_token":localStorage.access_token
                },
                body: JSON.stringify(data)
            }
        ) 
        .then(res=>{
            if(res.ok){
                return res.json()
            }
        })
        .then(data=>{
            return data
        })
        .catch(err=>{
            throw err
            
        })
    }
}

export const asyncFetchJobSuccess = () =>{
    return (dispatch) =>{
       return fetch(baseUrl+'/jobs',{
        headers:{
            "access_token":localStorage.access_token
        }
       })
            .then(response=>{
                if(!response.ok) throw{name:'fetching gagal'}
                return response.json()
            })
            .then(res=>{
                const action = fetchJobSuccess(res)
                dispatch(action)
            })
            .catch(err=>{
                throw err
                console.log(err)
            })
    }
}

export const asyncFetchCompaniesSuccess = () =>{
    return (dispatch) =>{
        return fetch(baseUrl+'/companies',{
            headers:{
                "access_token":localStorage.access_token
            }
         })
        .then(res=>{
            if(!res.ok) throw{name:'fetching gagal'}
            return res.json()})
        .then(data=>{
            const action = fetchCompanySuccess(data)
            dispatch(action)
        })
        .catch(err=>{
            throw err

        })
    }
}

export const asyncFetchSingleJobSuccess = (id) =>{
    return  (dispatch) =>{
       return fetch(baseUrl+'/jobs/'+id,{
            headers:{
                "access_token":localStorage.access_token
            }
         })
        .then(res=>{
            if(!res.ok) throw{name:'fetching gagal'}
            return res.json()
        })
        .then(data=>{
            console.log('ada data',data)
            const action = fetchSingleJobSuccess(data)
            dispatch(action)
            return data
        })
        .catch(err=>{
            throw err
        })
    }
}

export const asyncFetchSingleCompSuccess = (id) =>{
    return (dispatch) =>{
     return fetch(baseUrl+'/companies/'+id,{
            headers:{
                "access_token":localStorage.access_token
            }
        })
        .then(res=>{
            if(!res.ok) throw{name:'fetching gagal'}
            return res.json()})
        .then(data=>{
            console.log('data',data)
            const action = fetchSingleCompanySuccess(data)
            dispatch(action)
            return data
        })
        .catch(err=>{
            throw err

        })
    }
}
