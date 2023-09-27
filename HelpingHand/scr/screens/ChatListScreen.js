import * as Talkjs from '@talkjs/expo';
import { Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from 'react-redux';

export default function ChatListScreen({ navigation, route }) {
    const { user } = useSelector((state) => {
        return state.user
    })

    const me = {
        id: user.id,
        name: user.name,
        email: user.email,
        photoUrl: 'https://306b-182-253-163-163.ngrok-free.app' + '/static/' + user.profileImg,
        role: "default"
    }

    return (
        <View style={{ flex: 1, paddingTop: 20 }}>
            <Talkjs.Session appId="tAYLXWxv" me={me}>
                <Talkjs.ConversationList onSelectConversation={(e) => {
                    navigation.navigate("ChatScreen", {
                        conversationBuilder: e.conversation,
                        from: "ChatList",
                        UserId: me.id
                    });
                }} />
            </Talkjs.Session>
        </View>
    );
}