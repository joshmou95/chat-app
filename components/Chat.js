import React from 'react'
import { View, Platform, KeyboardAvoidingView, LogBox, Animd } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      backColor: this.props.route.params.backColor,
      isConnected: false,
      image: null, 
      location: null
    };

    if (!firebase.apps.length){
      firebase.initializeApp({
        // Firestore database credentials
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
    // put user name on top of screen
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    // Check if user is online of offline
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        console.log('online');

        // authenticates user via Firebase
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            firebase.auth().signInAnonymously();
          }
          // Add user to state
          this.setState({
            uid: user.uid,
            messages: [],
            user: {
              _id: user.uid,
              name: name,
              avatar: 'https://placeimg.com/140/140/any',
            },
          });
          // create reference to messages collection
          this.referenceChatMessages = firebase
            .firestore()
            .collection('messages')
          // listen for collection changes
          this.unsubscribe = this.referenceChatMessages
            .orderBy("createdAt", "desc")
            .onSnapshot(this.onCollectionUpdate);
        });

      } else {
        console.log('offline');
        this.setState({ isConnected: false });
        // Gets messages from storage
        this.getMessages();
      }
    });
  }

  componentWillUnmount() {
    // stop listening for changes
    this.unsubscribe();
    // stop listening to authentication
    this.authUnsubscribe();
  }

  // get messages in storage, parse to object
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // delete messages in storage
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  addMessages() {
    // add new messages to firebase onSend
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      // uid: this.state.uid,
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || null,
      location: message.location || null,
    });
  }

  async saveMessages() {
    // save message to storage onSend and stringify
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  // update message state onSend
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), 
      () => {
        this.addMessages();
        this.saveMessages();
      }
    );
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      const data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text || "",
        createdAt: data.createdAt.toDate(),
        user: data.user,
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({
      messages,
    });
  };

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

  // hides inputbar when offline
  renderInputToolbar = (props) => {
    console.log("renderInputToolbar ---> props", props.isConnected);
    if (props.isConnected == false) {
      return <InputToolbar {...props} />;
    } else {
      return <InputToolbar {...props} />;
    }
  }
  
  // send image and location actions
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  }

  // render location map view in message
  renderCustomView (props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3}}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />  
      );
    }
    return null;
  }

  render() {
    return (
      <View style={{
        flex: 1, 
        backgroundColor: this.state.backColor
        }}>
        <GiftedChat
          messages={this.state.messages}
          isConnected={this.state.isConnected}
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          onSend={(messages) => this.onSend(messages)}
          user={this.state.user}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    )
  }
}