import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, ImageBackground  } from 'react-native';
import { useState } from 'react/cjs/react.development';

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
            backgroundColor: '#FFFFFF',
            marginBottom: 20
            }}> 
            <TextInput
              style={styles.input}
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
                marginTop: 10,
                marginLeft: 20
              }}
              >Choose Background Color:</Text>
              <View style={{
                flexDirection: 'row',
                marginTop: 10,
                marginLeft: 20
              }}>              
              <TouchableOpacity style={[
                styles.background,
                {backgroundColor: '#090C08'}
              ]}
              />
              <TouchableOpacity style={[
                styles.background,
                {backgroundColor: '#474056'}
              ]}
              />
              <TouchableOpacity style={[
                styles.background,
                {backgroundColor: '#8A95A5'}
              ]}
              />
              <TouchableOpacity style={[
                styles.background,
                {backgroundColor: '#B9C6AE'}
              ]}
              />
              </View>
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
                }}
              >Start Chatting</Text>
              </TouchableOpacity>
          </View>
        </ImageBackground>
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
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 'auto',
    marginTop: 75
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#757083",
    color: '#FFFFFF',
    width: '88%',
    height: 60,
    padding: 20,
    alignItems: 'center',
    marginTop: 30
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 60, 
    borderColor: 'gray', 
    borderWidth: 2,
    margin: 20, 
    padding: 15,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: .5
  },
  background: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 25
}
});

// const Start = (props) => {
//   const [ name, setText ] = useState('');

//     return (
//       <View style={styles.container}>
//       <ImageBackground
//         source={require('../assets/Background_Image.png') }
//         resizeMode='cover'
//         style={styles.image}
//         >
//         <Text style={styles.title}>Chat App</Text>
//         <View style={{
//           width: '88%',
//           height: '44%',
//           backgroundColor: '#FFFFFF'
//         }}> 
//           <TextInput
//             style={styles.input}
//             placeholder='Your name'
//             onChangeText={name => setText(name)}
//             defaultValue={name}
//           />
//           <Text
//             style={{
//               fontSize: 16,
//               fontWeight: '300',
//               color: '#757083',
//               opacity: 1,
//               margin: 15
//             }}
//           >Choose Background Color:</Text>
//           <View>
//             <TouchableOpacity
//               style={styles.button}
//               title="Start Chatting"
//               onPress={() => 
//                 this.props.navigation.navigate('Chat', { name: this.state.name })}
//             >
//             <Text
//               style={{
//                 fontSize: 16,
//                 fontWeight: '600',
//                 color: '#FFFFFF',
//                 alignSelf: 'center',
//               }}
//             >Start Chatting</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         </ImageBackground>
//       </View>
//     )
// }

// export default Start;