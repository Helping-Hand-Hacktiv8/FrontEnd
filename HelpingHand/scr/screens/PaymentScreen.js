import { WebView } from 'react-native-webview'
import { StyleSheet } from "react-native";

export default function PaymentScreen({ route, navigation }) {
    const { url, token } = route.params
    console.log(url, '-> ini url')

    return (
        <WebView
            style={styles.container}
            source={{ uri: url }}
            onNavigationStateChange={(navState) => {
                const status = navState.url.split("/").includes("success")
                console.log(status, '-> ini status');
                if (status == true) {
                    navigation.navigate("ProfileStack")
                }
            }}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});