import React from 'react';
import { View, Text, Button, Platform, TextInput, StyleSheet, TouchableOpacity, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react/cjs/react.development';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      backColor: '#757083'
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require('../assets/Background_Image.png') }
          resizeMode='cover'
        >
          <Text style={styles.title}>Chat App</Text>
          <View style={styles.options}> 
            <TextInput
              style={styles.input}
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
              placeholder='Your name'
            />
            <Text
              style={styles.colorText}
              >Choose Background Color:
            </Text>
            <View style={styles.colorRow}>              
              <TouchableOpacity style={[
                styles.background,
                {backgroundColor: '#090C08'}
              ]}
              onPress={() => this.setState({ backColor: '#090C08'})}
              />
              <TouchableOpacity style={[
                styles.background,
                {backgroundColor: '#474056'}
              ]}
                onPress={() => this.setState({ backColor: '#474056'})}
              />
              <TouchableOpacity style={[
                styles.background,
                {backgroundColor: '#8A95A5'}
              ]}
                onPress={() => this.setState({ backColor: '#8A95A5'})}
              />
              <TouchableOpacity style={[
                styles.background,
                {backgroundColor: '#B9C6AE'}
              ]}
                onPress={() => this.setState({ backColor: '#B9C6AE'})}
              />
            </View>
              <TouchableOpacity
                style={styles.button}
                title="Start Chatting"
                accessible={true}
                accessibilityLabel="Start Chatting"
                accessibilityHint="Opens the chat window"
                accessibilityRole="button"
                onPress={() => 
                  this.props.navigation.navigate('Chat', { name: this.state.name, backColor: this.state.backColor })}
              >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#FFFFFF',
                }}
              >Start Chatting</Text>
              </TouchableOpacity>
          </View>
        </ImageBackground>
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 50,
    marginBottom: 'auto'
  },
  options: {
    height: '44%',
    width: '88%',
    minHeight: 260,
    backgroundColor: '#FFFFFF',
    marginBottom: 40,
    padding: 5
  },
  input: {
    height: 60, 
    alignSelf: 'center',
    borderColor: 'gray', 
    borderWidth: 2,
    width: '88%',
    marginTop: 15, 
    padding: 15,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: .5
  },
  colorText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 1,
    marginTop: 'auto',
    marginLeft: 20
  },
  colorRow: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  background: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 15,
    marginRight: 25,
    
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#757083",
    color: '#FFFFFF',
    width: '88%',
    height: 60,
    padding: 20,
    alignItems: 'center',
    marginTop: 'auto', 
    marginBottom: 20
  },
});

