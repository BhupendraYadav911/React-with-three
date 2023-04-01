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
          
        
        <Animated.View style={{ flexDirection: 'row',}}>
        <View
          style={{
            layoutOrigin: [1.2, -7.7],
            backgroundColor: 'white',
            borderRadius:0.1,
            flexDirection: 'row',
                position: 'absolute',
                padding:0.02,
            width:1.2
           

          }}>
            <Text  style={{    color: '#8B8B8B',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  paddingLeft: 0.04,
                  padding: 0.02,
                  marginLeft:0.120,
                  fontSize: 0.08,
                  layoutOrigin: [0.1, 0.1]}}>Type your query here...</Text>
                   <Image
                style={{
                  width: 0.07,
                  height: 0.07,
                  marginTop:0.04,
                  marginLeft:0.09
                }}
                source={asset('send.png')}
              />
           
     
          </View>
      <VrButton
            style={{
            //  borderColor: 'black',
            borderColor: '#E8352F',borderWidth: 0.004,
            borderRadius:50,
              marginTop: 0.39,
              marginBottom: 0.1,
              layoutOrigin: [0.7, -5.0],
              alignItems: 'right',
              padding: 0.02,
              // paddingLeft: 0.0,
            }}
          >
            <Image
              style={{
                width: 0.170,
                height: 0.170
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
                layoutOrigin: [-0.9, -19.6],

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
    fontSize:0.09,
    textAlign: 'center',
  },
});

export default Voice;
