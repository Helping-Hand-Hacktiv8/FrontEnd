import { useSelector } from "react-redux";
import FrontStack from "./FrontStack";
import MainStack from "./MainStack";
import { NavigationContainer } from "@react-navigation/native";

export default function ControlNav(){
    const {access_token:authData} = useSelector((state)=>{
        // console.log(state.user.access_token)
        return state.user
      })
    
    return(
        <NavigationContainer>
            {authData.length > 0 ? <MainStack/> : <FrontStack />}
        </NavigationContainer>
    )
}