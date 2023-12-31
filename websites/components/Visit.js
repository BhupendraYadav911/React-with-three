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
                layoutOrigin: [0.3, -2.0],
                // layoutOrigin: [0.1, -2.90],

              }}>
                     <Image
                style={{
                  layoutOrigin: [-6.1, -3.1],
                  width: 0.06,
                  height: 0.06,
                }}
                source={asset('down1.png')}
              />
                
              <View style={styles.tooltip}>
           
            <Text style={styles.tooltipText}>Visit Kiosk</Text>
           
           </View>
        
            </Animated.View>
            
       </View>
       
    )
  }
  
 

 
};
const styles = StyleSheet.create({
  tooltip: {
   
    position: 'absolute',
    backgroundColor: '#4092DF',
     padding: 0.01,
    borderRadius: 0.02,
    width:0.40,
    layoutOrigin: [-0.5, -0.80],
   
    

  },
  tooltipText: {
    color: 'white',
    fontSize: 0.08,
    fontWeight:'400',
    textAlign: 'center',
  },
});

export default Visit;
