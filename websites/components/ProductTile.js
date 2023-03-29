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
      translateY: new Animated.Value(0),
      opacity: new Animated.Value(0),
      rotateY: new Animated.Value(0),
      active: false
    }
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
    //this.setState({ isHovering: false })
  }
  onButtonEnter1() {
    this.setState({ isHovering2: true })
  }

  onButtonExit1() {
    this.setState({ isHovering2: false })
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
              marginTop: 0.39,
              marginBottom: 0.1,
              layoutOrigin: [0.01, 0.01],
              alignItems: 'right',
              padding: 0.01,
              paddingLeft: 0.0

              //paddingRight: 1.2,
            }}
           
            // onClick={onClick}
          >
            <Image
              style={{
                width: 0.2,
                height: 0.2
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
                padding: 0.01,
                borderRadius: 0.11,
                AlignVertical: 'right',
                marginTop: 0.4,
                marginLeft: 0.2,
                layoutOrigin: [0.9, 0.1],

              }}>
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
                Service Desk
              </Text>
              <Image
                style={{
                  width: 0.2,
                  height: 0.2
                }}
                source={asset('help-desk.png')}
              />
            </Animated.View>
          )}
          {this.state.nested && <Accordion animationDelay={(1 + 1) * 50} />}
          <VrButton
            style={{
              borderColor: 'transparent',
              marginTop: 0.39,
              marginBottom: 0.1,
              layoutOrigin: [0.01, 0.01],
              alignItems: 'right',
              padding: 0.01,
              paddingLeft: 0.0,
              marginLeft: 0.9
            }}
           
            // onClick={onClick}
          >
            <Image
              style={{
                width: 0.2,
                height: 0.2
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
               padding: 0.01,
               borderRadius: 0.11,
               AlignVertical: 'left',
               marginTop: 0.4,
               marginLeft: 0.2,
               layoutOrigin: [-0.9,0.1],

             }}>
            
             <Image
               style={{
                 width: 0.2,
                 height: 0.2
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
              layoutOrigin: [0.01, 0.01],
              alignItems: 'right',
              padding: 0.01,
              paddingLeft: 0.0
              //paddingRight: 1.2,
            }}
            // onEnter={this.onButtonEnter}
            // onExit={this.onButtonExit}
            // onClick={onClick}
          >
            <Image
              style={{
                width: 0.2,
                height: 0.2
              }}
              source={asset('noun-financial.png')}
              
            />
          </VrButton>
          <VrButton
            style={{
              borderColor: 'transparent',
              // marginTop:.39,
              layoutOrigin: [0.01, 0.01],
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
                width: 0.2,
                height: 0.2
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
    this.state.translateY.setValue(1)
    this.state.opacity.setValue(0)
    Animated.parallel([
      Animated.timing(this.state.translateY, {
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
