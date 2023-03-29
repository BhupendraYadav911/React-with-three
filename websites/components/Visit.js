import React from 'react'
import { AppRegistry,StyleSheet, View, VrButton, Text, Animated, Image, asset } from 'react-vr'
class Visit extends React.Component {
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
                // flexDirection: 'row',
                position: 'absolute',
                // backgroundColor: 'pink',
                padding: 0.01,
                borderRadius: 0.11,
               
                //  marginTop: -0.03,
                // marginLeft: 0.2,
                layoutOrigin: [0.1, -2.90],

              }}>
                  

              <View style={styles.tooltip}>
           
            <Text style={styles.tooltipText}>Visit Kiosk</Text>
           </View>
           {/* <Image
                style={{
                  width: 0.06,
                  height: 0.06,
                }}
                source={asset('arrow.png')}
              /> */}
            </Animated.View>
       </View>
       
    )
  }
  
 

 
};
const styles = StyleSheet.create({
  tooltip: {
   
    position: 'absolute',
    backgroundColor: '#4092DF',
     padding: 0.02,
    borderRadius: 0.05,
    width:0.60,
    layoutOrigin: [-0.20, -0.35],
   
    

  },
  tooltipText: {
    color: 'white',
    fontSize: 0.1,
    textAlign: 'center',
  },
});

export default Visit;
