import React from 'react'
import { View, Text } from 'react-native';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      backColor: this.props.route.params.backColor
    };
  }

  componentDidMount() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name })
  }

  render() {
    return (
      <View style={{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: this.state.backColor
        }}>
        <Text style={{
          color: '#FFFFFF',
          fontSize: 20,
          fontWeight: '600'
        }}
        >Hello {this.props.route.params.name}!</Text>
      </View>
    )
  }
}