import React from 'react'
import { View, Text, Platform, KeyboardAvoidingView, LogBox } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      messages: [],
      // name: '',
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      backColor: this.props.route.params.backColor,
    };

    if (!firebase.apps.length){
      firebase.initializeApp({
        apiKey: "AIzaSyC7PbBhWLjdf4AJ32NmP9wBmodufuXFphg",
        authDomain: "test-project-833d6.firebaseapp.com",
        projectId: "test-project-833d6",
        storageBucket: "test-project-833d6.appspot.com",
        messagingSenderId: "230622143660",
        appId: "1:230622143660:web:d453d8caee7863daf2eb09",
        measurementId: "G-VJBGHDTQRM",
      });
    }

    this.referenceChatMessages = firebase.firestore().collection('messages');

    // Ignores certain warning messages in console
    LogBox.ignoreLogs([
      'Setting a timer',
      'undefined',
      'Animated.event now requires a second argument for options',
    ]);
    

  }

  componentDidMount() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          name: name,
          avatar: 'https://placeimg.com/140/140/any',
        }
      });

      this.referenceChatMessages = firebase
        .firestore()
        .collection('messages');

      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);

      // this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate);
        
    });

  
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.authUnsubscribe();
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
      this.setState({
        messages
      })
    });
  }


  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
      () => {
        this.addMessages();
      }
    );
  }

  // implement function with button??
  addMessages() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      uid: this.state.uid,
      createdAt: message.createdAt,
      text: message.text || null,
      user: message.user,
    });
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
          user={this.state.user}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    )
  }
}
