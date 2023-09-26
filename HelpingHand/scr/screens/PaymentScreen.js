import { WebView } from 'react-native-webview'
import { StyleSheet } from "react-native";

export default function PaymentScreen({ route }) {
    const { url, token } = route.params
    
    return (
        <WebView
            style={styles.container}
            source={{ uri: url }}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
