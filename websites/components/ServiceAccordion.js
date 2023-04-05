import React from 'react'
import { AppRegistry, View, VrButton, Text, Animated, Image, asset } from 'react-vr'

class ServiceAccordion extends React.Component {
  constructor() {

 
    super()
    this.state = {
      isHovering: false, nested:false,
      translateZ: new Animated.Value(0),
      opacity: new Animated.Value(0),
      rotateX: new Animated.Value(0),
      active: false,
    }
    this.onButtonEnter1 = this.onButtonEnter1.bind(this)
  }
  onButtonEnter1() {
    this.setState({ isHovering: true })
  }


  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({ isHovering: true })
  //   }, 5000)
  // }
  render() {
    return (
      <View>
      <Animated.View
      style={{
        flexDirection: 'row',
        position: 'absolute',
        padding: 0.01,
        borderRadius: 0.11,
        layoutOrigin: [-40.1, -2.9],
        transform: [
          { rotateY: -90 },  
      ],

      }}>
          {/* <Image
        style={{
          width: 0.06,
          height: 0.06,
        }}
        source={asset('arrow.png')}
      /> */}

      <View style={{position: 'absolute',
      flexDirection:'row',
    backgroundColor: 'white',
     padding: 0.04,
    borderRadius: 0.05,
    width:1,
    layoutOrigin: [-0.07, 0.26],}}>
   
    <Text style={{ color: 'black',
     marginLeft: 0.04,
    fontSize:0.07,}}>Hello I’m Zoey, Let me help you
revive your lapsed policy. Here
is your revival quote</Text>
   </View>
   <Image
        style={{
          // marginTop:0.01,
          layoutOrigin: [-12.9, -1.4],
          width: 0.08,
          height: 0.08,
        }}
        source={asset('right.png')}
      />
    
    </Animated.View>
      
      <Animated.View style={{
         layoutOrigin: [-3.3, 0.1],
         position: 'absolute', 
          zIndex: 100,
         opacity: this.state.opacity,
          transform: [
            { rotateY: -90 },  
        ],

        // transform: [
        //    {translateZ: this.state.translateZ},
        //   {rotateX: this.state.rotateX}
        // ]
        }}>
        
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 0.09,
            // borderTopLeftRadius: 0.09,
            // borderTopRightRadius: 0.09,
            // borderTopRightRadius: 0.09,
            // padding: 0.1,
            width:5.13
          }}>
            <View
            style={{
            backgroundColor: '#EAEEF1',
            borderTopLeftRadius: 0.09,
            borderTopRightRadius: 0.09,
            // padding: 0.04,
          }}>

      <Text  
      style={{
        
         textAlign: 'center',
        textAlignVertical: 'center',
         fontSize: 0.3,
         fontWeight: '500',
         color: '#2C2C2C',
         margin:0.2
          }}>CHOOSE ONE OPTION FROM BELOW</Text>
            
     
            
        </View>
        <View
          style={{
            padding: 0.3,
          }}>
          <VrButton
            style={{
              flexDirection: 'row',
              justifyContent:'space-between',
              paddingLeft:0.25,
              paddingRight:0.18,
             paddingTop: 0.1,
              paddingBottom: 0.4
            }}
            onClick={this.onButtonEnter1}>
            <Text
              style={{
                fontSize: 0.4,
                color: '#004E7E',
                textAlign: 'left'
              }}>
             Top UP
            </Text>
            <Image
              style={{
                width: 0.4,
                height: 0.4,
                
                // marginLeft: 0.74,
                // textAlign: 'right'
              }}
              source={asset('right.jpg')}
            />
          </VrButton>
          {this.state.isHovering && (
            <Animated.View>
              <Text
                style={{
                  color: 'blue',
                  textAlign: 'center',
                  fontSize: 0.06,
                }}>
                lorem ipsum dolor sit amet Donec nec aliquet libero. Vivamus rutrum erat sed arcu cursus
              </Text>
            </Animated.View>
          )}
           <View style={{
       borderTopWidth:0.02,
       borderColor:'#DDDDDD',
       borderStyle:'solid',
       marginLeft:-1.04,
       marginRight:0.5}}>
       </View>
          <VrButton
            style={{
              flexDirection: 'row',
              justifyContent:'space-between',
              paddingLeft:0.25,
              paddingRight:0.18,
             paddingTop: 0.3,
              paddingBottom: 0.4
            }}>
            <Text
              style={{
                fontSize: 0.4,
                color: '#004E7E',
                textAlign: 'left'
              }}>
            Renewal
            </Text>
            <Image
              style={{
                width: 0.4,
                height: 0.4,
                marginLeft: 0.72,
                textAlign: 'right'
              }}
              source={asset('right.jpg')}
            />
          </VrButton>
          <View style={{
       borderTopWidth:0.02,
       borderColor:'#DDDDDD',
       borderStyle:'solid',
       marginLeft:-1.04,
       marginRight:0.5}}>
       </View>
          <VrButton
            style={{
              flexDirection: 'row',
              justifyContent:'space-between',
              paddingLeft:0.25,
              paddingRight:0.18,
             paddingTop: 0.3,
              paddingBottom: 0.4
            }}>
            <Text
              style={{
                fontSize: 0.4,
                color: '#004E7E',
                textAlign: 'left'
              }}>
           Policy alterations
            </Text>
            <Image
              style={{
                width: 0.4,
                height: 0.4,
                marginLeft: 0.42,
                textAlign: 'right'
              }}
              source={asset('right.jpg')}
            />
          </VrButton>
          <View style={{
       borderTopWidth:0.02,
       borderColor:'#DDDDDD',
       borderStyle:'solid',
       marginLeft:-1.04,
       marginRight:0.5}}>
       </View>
          <VrButton
            style={{
              flexDirection: 'row',
              justifyContent:'space-between',
              paddingLeft:0.25,
              paddingRight:0.18,
             paddingTop: 0.3,
              paddingBottom: 0.4
            }}>
            <Text
              style={{
                fontSize: 0.4,
                color: '#004E7E',
                textAlign: 'left'
              }}>
             Track SR status
            </Text>
            <Image
              style={{
                width: 0.4,
                height: 0.4,
                marginLeft: 0.65,
                textAlign: 'right'
              }}
              source={asset('right.jpg')}
            />
          </VrButton>
          <View style={{
       borderTopWidth:0.02,
       borderColor:'#DDDDDD',
       borderStyle:'solid',
       marginLeft:-1.04,
       marginRight:0.5}}>
       </View>
          <VrButton
            style={{
              flexDirection: 'row',
              justifyContent:'space-between',
              paddingLeft:0.25,
              paddingRight:0.18,
             paddingTop: 0.3,
              paddingBottom: 0.4
            }}>
            <Text
              style={{
                fontSize: 0.4,
                color: '#004E7E',
                textAlign: 'left'
              }}>
              Surrender
            </Text>
            <Image
              style={{
                width: 0.4,
                height: 0.4,
                textAlign: 'right',
                marginLeft: 0.10,
              }}
              source={asset('right.jpg')}
            />
          </VrButton>
          <View style={{
       borderTopWidth:0.02,
       borderColor:'#DDDDDD',
       borderStyle:'solid',
       marginLeft:-1.04,
       marginRight:0.5}}>
       </View>
          <VrButton
            style={{
              flexDirection: 'row',
              justifyContent:'space-between',
              paddingLeft:0.25,
              paddingRight:0.18,
             paddingTop: 0.3,
              paddingBottom: 0.4
            }}>
            <Text
              style={{
                fontSize: 0.4,
                color: '#004E7E',
                textAlign: 'left'
              }}>
             Partial Withdrawal
            </Text>
            <Image
              style={{
                width: 0.4,
                height: 0.4,
                textAlign: 'right',
                marginLeft: 0.10,
              }}
              source={asset('right.jpg')}
            />
          </VrButton>
          <View style={{
       borderTopWidth:0.02,
       borderColor:'#DDDDDD',
       borderStyle:'solid',
       marginLeft:-1.04,
       marginRight:0.5}}>
       </View>
          <VrButton
            style={{
              flexDirection: 'row',
              justifyContent:'space-between',
              paddingLeft:0.25,
              paddingRight:0.18,
             paddingTop: 0.3,
              paddingBottom: 0.4
            }}>
            <Text
              style={{
                fontSize: 0.4,
                color: '#004E7E',
                textAlign: 'left'
              }}>
              Free look-in cancellation
            </Text>
            <Image
              style={{
                width: 0.4,
                height: 0.4,
                textAlign: 'right',
                marginLeft: 0.10,
              }}
              source={asset('right.jpg')}
            />
          </VrButton>
          <View style={{
       borderTopWidth:0.02,
       borderColor:'#DDDDDD',
       borderStyle:'solid',
       marginLeft:-1.04,
       marginRight:0.5}}>
       </View>
          <VrButton
            style={{
              flexDirection: 'row',
              justifyContent:'space-between',
              paddingLeft:0.25,
              paddingRight:0.18,
             paddingTop: 0.3,
              paddingBottom: 0.4
            }}>
            <Text
              style={{
                fontSize: 0.4,
                color: '#004E7E',
                textAlign: 'left'
              }}>
              Application cancellation
            </Text>
            <Image
              style={{
                width: 0.4,
                height: 0.4,
                textAlign: 'right',
                marginLeft: 0.10,
              }}
              source={asset('right.jpg')}
            />
          </VrButton>
          </View>
        </View>
       
      </Animated.View>
      </View>
    )
  }
 
  componentDidMount() {
    this.state.translateZ.setValue(1);
    //this.state.opacity.setValue(0);
    Animated.parallel([
      Animated.timing(
        this.state.translateZ,
        {
          toValue: 0,
          duration: 2000,
          delay: this.props.animationDelay || 0
         
        }
      ),
      Animated.timing(
        this.state.opacity,
        {
          toValue: 1,
          duration: 2750,
           delay: this.props.animationDelay || 0
        }
      )
    ]).start();
  }

  componentDidUpdate(_, prevState) {
    if (this.state.active && !prevState.active) {
      this.state.rotateX.setValue(0);
      Animated.timing(
        this.state.rotateX,
        {
          toValue: 90,
          duration: 750
        }
      ).start();
    }
  }
};

export default ServiceAccordion;
