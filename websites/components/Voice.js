import React from 'react'
import { AppRegistry,StyleSheet, View, VrButton, Text, Animated, Image, asset } from 'react-vr'
class Voice extends React.Component {
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
        <Animated.View>
      <VrButton
            style={{
            //  borderColor: 'black',
            borderColor: '#E8352F',borderWidth: 0.004,
            borderRadius:50,
              marginTop: 0.39,
              marginBottom: 0.1,
              layoutOrigin: [1.0, -5.0],
              alignItems: 'right',
              padding: 0.02,
              // paddingLeft: 0.0,
            }}
          >
            <Image
              style={{
                width: 0.2,
                height: 0.2
              }}
              source={asset('noun-voice.png')}
              onEnter={this.onButtonEnter}
              onExit={this.onButtonExit}
            />
             {/* <Image
              style={{
                width: 0.2,
                height: 0.2
              }}
              source={asset('arrow.png')}
            /> */}
          </VrButton>
          {this.state.showTooltip &&
        
          <Animated.View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                // backgroundColor: 'pink',
                padding: 0.01,
                borderRadius: 0.11,
                AlignVertical: 'right',
                 marginTop: -0.03,
                // marginLeft: 0.2,
                layoutOrigin: [-0.1, -22.1],

              }}>
                  <Image
                style={{
                  width: 0.06,
                  height: 0.06,
                }}
                source={asset('arrow.png')}
              />

              <View style={styles.tooltip}>
           
            <Text style={styles.tooltipText}>Try to speak..</Text>
           </View>
            
            </Animated.View>
        }
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

export default Voice;
