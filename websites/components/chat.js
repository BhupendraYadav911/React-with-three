import React from 'react'
import { AppRegistry,StyleSheet, View, VrButton, Text, Animated, Image, asset } from 'react-vr'
class Chat extends React.Component {
  constructor() {
    super()
    this.state = {
      showTooltip: false,
      translateY: new Animated.Value(0),
      opacity: new Animated.Value(0),
      rotateY: new Animated.Value(0),
      active: false
    }
    this.onButtonEnter = this.onButtonEnter.bind(this)
    this.onButtonExit = this.onButtonExit.bind(this)
  }
 
  onButtonEnter() {
    this.setState({ showTooltip: true })
  }

  onButtonExit() {
    this.setState({ showTooltip: false })
  }
  render() {
    return (
      <View >
       
        <Animated.View
          style={{
            backgroundColor: 'white',
             padding: 0.01,
            width:1.0,
            borderRadius:0.08,
            boxShadow: '0px 14px 24px rgba(0, 0, 0, 0.09)',
            layoutOrigin: [0.1, 0.01],

          }}>
            <Text>werty</Text>
           
     
          </Animated.View>
          
       </View>
       
    )
  }
  
 

 
};
const styles = StyleSheet.create({
  tooltip: {
   
    position: 'absolute',
    backgroundColor: 'white',
     padding: 0.02,
    borderRadius: 0.05,
    width:1,
    layoutOrigin: [-0.06, 0.26],
   
    

  },
  tooltipText: {
    color: 'black',
    fontSize: 0.1,
    textAlign: 'center',
  },
});

export default Chat;
