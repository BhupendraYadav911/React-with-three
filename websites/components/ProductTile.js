/* Button.js */
import React from 'react'
import { asset, View, Image, Text, VrButton, Animated } from 'react-vr'
import Accordion from './Accordion'

/*
 AddButton Component


/*
 ProductTile Component
*/
class ProductTile extends React.Component {
  constructor() {
    super()

    this.state = {
      isHovering: false,
      isHovering2: false,
      nested: false,
      msg: false,
      translateY: new Animated.Value(0),
      opacity: new Animated.Value(0),
      rotateY: new Animated.Value(0),
      translateX: new Animated.Value(0),
      active: false
    }
    this.onButtonEnter3 = this.onButtonEnter3.bind(this)
    this.onButtonExit3 = this.onButtonExit3.bind(this)
    this.onButtonEnter = this.onButtonEnter.bind(this)
    this.onButtonExit = this.onButtonExit.bind(this)
    this.onButtonEnter1 = this.onButtonEnter1.bind(this)
    this.onButtonExit1 = this.onButtonExit1.bind(this)
  }
  onButtonEnter() {
    this.setState({ isHovering: true }, () => {
      setTimeout(() => {
        if (this.state.isHovering) {
          this.setState({ nested: true })
          this.setState({ isHovering: false })
        }
      }, 1000)
    })
  }
  onButtonExit() {
    this.setState({ nested: false })
  }
  onButtonEnter1() {
    this.setState({ isHovering2: true })
  }
  onButtonExit1() {
    this.setState({ isHovering2: false })
  }
  onButtonEnter3() {
    this.setState({ msg: true })
  }

  onButtonExit3() {
    this.setState({ msg: false })
  }

  render() {
    return (
      <Animated.View
        style={{
          // position: 'relative',
          // backgroundColor: '#fff',
          borderColor: 'transparent',
          borderWidth: 0.005,
          marginBottom: 0.1,
          // opacity: this.state.opacity
          // transform: [
          //   {translateY: this.state.translateY},
          //   {rotateY: this.state.rotateY}
          // ]
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <VrButton
            //  animationDelay={(1000 + 1) * 550}
            style={{
              
              borderColor: 'transparent',
              marginTop: 0.65,
              marginBottom: 0.1,
              layoutOrigin: [-0.82, 0.20],
              alignItems: 'right',
              padding: 0.01,
              paddingLeft: 0.0
            }}
          >
            <Image
              style={{
                width: 0.170,
                height: 0.170
              }}
              source={asset('help-desk.png')}
              onEnter={this.onButtonEnter}
              onExit={this.onButtonExit}
            />
          </VrButton>
          {this.state.isHovering && (
            <Animated.View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                backgroundColor: 'white',
                paddingTop:0.04,
                paddingBottom:0.01,
                paddingRight:0.04,
                borderRadius: 0.10,
                AlignVertical: 'right',
                marginTop: 0.4,
                marginLeft: 0.199,
                layoutOrigin: [0.85,-1.268],
               
              }}>
              <Text
                style={{
                  color: 'red',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                   paddingRight: 0.2,
                  fontSize: 0.1,
                  layoutOrigin: [0.1, 0.1]
                }}>
                Service Desk
              </Text>
              <Image
                style={{
                  width: 0.105,
                  height: 0.090
                }}
                source={asset('help-hover.png')}
              />
            </Animated.View>
          )}
          {this.state.nested && <Accordion animationDelay={(1 + 1) * 50}  onExit={this.onButtonExit} />}
          <VrButton
            style={{
              borderColor: 'transparent',
              marginTop: 0.65,
              marginBottom: 0.1,
              layoutOrigin: [-0.62, 0.20],
              alignItems: 'right',
              padding: 0.01,
              paddingLeft: 0.0,
              marginLeft: 0.9
            }}
           
            // onClick={onClick}
          >
            <Image
              style={{
                width: 0.170,
                height: 0.170
              }}
              onEnter={this.onButtonEnter1}
              onExit={this.onButtonExit1}
              source={asset('noun-cash.png')}
            />
          </VrButton>
          {this.state.isHovering2 && (
             <Animated.View
             style={{
               flexDirection: 'row',
               position: 'absolute',
               backgroundColor: 'white',
               padding: 0.0076,
            
              
               borderRadius: 0.11,
               AlignVertical: 'left',
               marginTop: 0.4,
               marginLeft: 0.2,
               layoutOrigin: [-1.13,-1.09],
              //layoutOrigin: [-0.62, 0.20],

             }}>
            
             <Image
               style={{
                 width: 0.170,
                 height: 0.170
               }}
               source={asset('help-desk.png')}
             />
              <Text
               style={{
                 color: 'red',
                 textAlign: 'center',
                 textAlignVertical: 'center',
                 paddingLeft: 0.01,
                 paddingRight: 0.2,
                 fontSize: 0.1,

                 layoutOrigin: [0.1, 0.1]
               }}>
             popup here
             </Text>
           </Animated.View>
          )}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <VrButton
            style={{
              borderColor: 'transparent',
              //  marginTop:.39,
              // layoutOrigin: [0.01, 0.01],
              layoutOrigin: [-0.82, 0.35],
              alignItems: 'right',
              padding: 0.01,
              paddingLeft: 0.0
              //paddingRight: 1.2,
            }}
             
          >

            <Image
              style={{
                width: 0.170,
                height: 0.170
              }}
            onEnter={this.onButtonEnter3}
              source={asset('noun-financial.png')}
              
            />
          </VrButton>
          {this.state.msg&& 
           <Animated.View>
           <View style={{
               //flexDirection: 'column',
               padding: 0.11,
               width:1.3,
               backgroundColor: "#fff",
               position: 'absolute',
               borderRadius: 0.10,
               layoutOrigin: [1.3, 0.5],
           }}>
               <Animated.View style={{
                  
                   padding: 0.11,
                   alignItems: 'center',
                   justifyContent: 'center',
                       
               }}>
                   <Image
                       style={{
                           marginTop: -0.07,
                           marginBottom: 0.14,
                           width: 0.3,
                           height: 0.3,
                       }}
                       source={asset('0402f191875dee6fa4cdec21c5a0bd1a.png')}
                   />
                    
         <Text
           style={{
             textAlign: 'center',
             textAlignVertical: 'center',
             fontWeight: '500',
             color: '#000000'
           }}
         >
         Thank You!
         </Text>
         <Text
           style={{
               marginBottom: 0.11,
             textAlign: 'center',
             textAlignVertical: 'center',
             color: '#000000',
             fontSize:0.07
           }}
         >
        Thanks! you will receive a copy of this communication on your registered Email id. Please expect a response within 10 working days. 
         </Text>
       
               </Animated.View>
               <VrButton
       style={{
         borderRadius: 0.03,
         borderWidth: 0.005,
         backgroundColor:'#4092DF',
         borderColor: '#4092DF',
         padding: 0.05,
         paddingLeft: 0.1,
         paddingRight: 0.1,
       }}
       onEnter={this.onButtonExit3}
     >
       <Text
         style={{
           color: '#fffff',
           fontWeight: '500',
           textAlign: 'center',
           textAlignVertical: 'center',
           fontSize: 0.075
         }}
       >
        OK
       </Text>
     </VrButton>
             
           </View >
           </Animated.View>
          
          
          
          }
          <VrButton
            style={{
              borderColor: 'transparent',
              layoutOrigin: [-0.62, 0.35],
              alignItems: 'right',
              padding: 0.01,
              paddingLeft: 0.0,
              marginLeft: 0.9
            }}
            // onEnter={this.onButtonEnter}
            // onExit={this.onButtonExit}
            // onClick={onClick}
          >
            <Image
              style={{
                width: 0.170,
                height: 0.170
              }}
              source={asset('card.png')}
            />
          </VrButton>
        </View>
        
        {/* <Accordion animationDelay={(1 + 1) * 2800} /> */}
      </Animated.View>
      
    )
  }

  componentDidMount() {
    this.state.translateX.setValue(1)
    this.state.opacity.setValue(0)
    Animated.parallel([
      Animated.timing(this.state.translateX, {
        toValue: 0,
        duration: 750,
        delay: this.props.animationDelay || 0
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 750,
        delay: this.props.animationDelay || 0
      })
    ]).start()
  }

  componentDidUpdate(_, prevState) {
    if (this.state.active && !prevState.active) {
      this.state.rotateY.setValue(0)
      Animated.timing(this.state.rotateY, {
        toValue: 180,
        duration: 750
      }).start()
    }
  }
}

export default ProductTile
