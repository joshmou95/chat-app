import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, ImageBackground  } from 'react-native';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  render() {
    return (
      <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Background_Image.png') }
        resizeMode='cover'
        style={styles.image}
        >
        <Text style={styles.title}>Chat App</Text>
        <View style={{
          width: '88%',
          height: '44%',
          backgroundColor: '#FFFFFF'
        }}> 
          <TextInput
            style={{
              height: 50, 
              borderColor: 'gray', 
              borderWidth: 1,
              margin: 15, 
              padding: 10,
              fontSize: 16,
              fontWeight: '300',
              color: '#757083',
              opacity: .5
              }}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            placeholder='Your name'
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '300',
              color: '#757083',
              opacity: 1,
              margin: 15
            }}
          >Choose Background Color:</Text>
          <View>
            <TouchableOpacity
              style={styles.button}
              title="Start Chatting"
              onPress={() => 
                this.props.navigation.navigate('Chat', { name: this.state.name })}
            >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#FFFFFF',
                alignSelf: 'center',
              }}
            >Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'steelblue',
    height: '100%'
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    height: 300
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#757083",
    color: '#FFFFFF',
    width: '88%',
    height: 50,
    padding: 10
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  }
});