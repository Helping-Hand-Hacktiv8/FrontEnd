import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as TalkRn from '@talkjs/expo';
import * as SecureStore from "expo-secure-store";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from 'axios'
// const baseUrl = 'https://e04e-114-122-106-150.ngrok-free.app'
const baseUrl = 'https://306b-182-253-163-163.ngrok-free.app'

export default function ChatScreen(props) {
    const { UserId, AuthorId, from } = props.route.params
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState({
        id: "",
        name: "",
        email: "",
        photoUrl: "",
        role: "default"
    })
    const [author, setAuthor] = useState({
        id: "",
        name: "",
        email: "",
        photoUrl: "",
        role: "default"
    })

    useFocusEffect(
        useCallback(() => {
            async function getData() {
                try {
                    const access_token = await SecureStore.getItemAsync('access_token')

                    const { data: dataUser } = await axios({
                        method: 'GET',
                        url: baseUrl + '/users/profile/' + Number(UserId),
                        headers: { access_token }
                    })

                    setUser({
                        id: dataUser.id,
                        name: dataUser.name,
                        email: dataUser.email,
                        photoUrl: 'https://306b-182-253-163-163.ngrok-free.app' + '/static/' + dataUser.profileImg
                    })

                } catch (error) {
                    console.log(error)
                }
            }

            getData()
                .finally(() => {
                    setIsLoading(false)
                })
        }, [UserId])
    )

    let conversationBuilder;

    if (from == "ChatList") {
        const conversation = props?.route?.params?.conversationBuilder
        conversationBuilder = TalkRn.getConversationBuilder(conversation.id);
    } else if (from == "ActivityDetail") {
        useFocusEffect(
            useCallback(() => {
                async function getData() {
                    try {
                        const access_token = await SecureStore.getItemAsync('access_token')

                        const { data: dataAuthor } = await axios({
                            method: 'GET',
                            url: baseUrl + '/users/profile/' + Number(AuthorId),
                            headers: { access_token }
                        })

                        setAuthor({
                            id: dataAuthor.id,
                            name: dataAuthor.name,
                            email: dataAuthor.email,
                            photoUrl: 'https://306b-182-253-163-163.ngrok-free.app' + '/static/' + dataAuthor.profileImg
                        })

                    } catch (error) {
                        console.log(error)
                    }
                }

                getData()
                    .finally(() => {
                        setIsLoading(false)
                    })
            }, [AuthorId])
        )

        conversationBuilder = TalkRn.getConversationBuilder(
            TalkRn.oneOnOneId(user, author)
        );

        conversationBuilder.setParticipant(user);
        conversationBuilder.setParticipant(author);
    }

    if (isLoading) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ActivityIndicator size="large" color={"#312651"} />
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <TalkRn.Session appId='tAYLXWxv' me={user}>
                    <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
                </TalkRn.Session>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})