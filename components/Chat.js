import React from 'react'
import { View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      backColor: this.props.route.params.backColor,
      messages: [],
    };

    const firebaseConfig = {
      apiKey: "AIzaSyC7PbBhWLjdf4AJ32NmP9wBmodufuXFphg",
      authDomain: "test-project-833d6.firebaseapp.com",
      projectId: "test-project-833d6",
      storageBucket: "test-project-833d6.appspot.com",
      messagingSenderId: "230622143660",
      appId: "1:230622143660:web:d453d8caee7863daf2eb09",
      measurementId: "G-VJBGHDTQRM"
    };

    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }

    this.referenceChatMessages = firebase.firestore().collection('messages');

  }

  componentDidMount() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    this.referenceChatMessages = firebase.firestore().collection('messages');

    this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate);

    // this.setState({
    //   messages: [
    //     {
    //       _id: 1,
    //       text: "Hello developer",
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: "React Native",
    //         avatar: "https://placeimg.com/140/140/any",
    //       },
    //     },
    //     {
    //       _id: 2, 
    //       text: `${this.props.route.params.name} entered the chat`,
    //       createdAt: new Date(),
    //       system: true,
    //     },
    //   ],
    // });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
  }


  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  // implement function with button??
  addMessages() {
    this.referenceChatMessages.add({
      messages
    })
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#7A87DB'
          }
        }}
      />
    )
  }

  render() {
    return (
      <View style={{
        flex: 1, 
        backgroundColor: this.state.backColor
        }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    )
  }
}
