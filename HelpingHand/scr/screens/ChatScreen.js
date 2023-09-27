import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as TalkRn from '@talkjs/expo';
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { asyncFetchSingleUser } from "../store/actions/actionCreator";

export default function ChatScreen({ route }) {
    const { UserId, AuthorId } = route.params
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState({
        id: "",
        name: "",
        email: "",
        photoUrl: ""
    })
    const [author, setAuthor] = useState({
        id: "",
        name: "",
        email: "",
        photoUrl: ""
    })
    console.log(AuthorId, '-> ini author id');

    useEffect(() => {
        dispatch(asyncFetchSingleUser(UserId))
            .then(res => {
                setUser({
                    id: res.id,
                    name: res.name,
                    email: res.email,
                    photoUrl: 'https://e04e-114-122-106-150.ngrok-free.app' + '/static/' + res.profileImg
                })
                dispatch(asyncFetchSingleUser(AuthorId))
            })
            .then(res => {
                setAuthor({
                    id: res.id,
                    name: res.name,
                    email: res.email,
                    photoUrl: 'https://e04e-114-122-106-150.ngrok-free.app' + '/static/' + res.profileImg
                })
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    useEffect(() => {

    }, [])
    console.log(author, '-> ini author')
    console.log(user, '-> ini user')

    // const other = {
    //     id: '1234',
    //     name: 'Natanja gaurangga',
    //     email: 'natanjaja@mail.com',
    //     photoUrl: 'https://talkjs.com/images/avatar-1.jpg',
    //     role: 'default',
    // }

    // const me = {
    //     id: '12345',
    //     name: 'Siapa terserahmu',
    //     email: 'bapakmu@mail.com',
    //     photoUrl: 'https://talkjs.com/images/avatar-5.jpg',
    //     role: 'default',
    // }

    const conversationBuilder = TalkRn.getConversationBuilder(
        TalkRn.oneOnOneId(user, author)
    );

    conversationBuilder.setParticipant(user);
    conversationBuilder.setParticipant(author);

    if (isLoading) {
        return <ActivityIndicator />
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
        flex: 1
    }
})