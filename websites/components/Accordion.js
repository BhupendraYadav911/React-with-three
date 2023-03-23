import React from 'react'
import { AppRegistry, View, VrButton, Text, Animated, Image, asset } from 'react-vr'

class Accordion extends React.Component {
  constructor() {
    super()

    this.state = {
      isHovering: false
    }

    this.onButtonEnter1 = this.onButtonEnter1.bind(this)
  }
  onButtonEnter1() {
    this.setState({ isHovering: true })
  }
  render() {
    return (
      <View>
        <View
          style={{
            overflowX: 'scroll',
            position:'relative',
            backgroundColor: 'white',
            borderTopLeftRadius: 0.03,
            borderTopRightRadius: 0.03,
            padding: 0.1,
            width:1.40
          }}>
          <VrButton
            style={{
              flexDirection: 'row',
              paddingBottom: 0.1
            }}
            onClick={this.onButtonEnter1}>
            <Text
              style={{
                fontSize: 0.09,
                color: '#004E7E',
                textAlign: 'left'
              }}>
              Revival
            </Text>
            <Image
              style={{
                width: 0.1,
                height: 0.1,
                marginLeft: 0.74,
                textAlign: 'right'
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
                orem ipsum dolor sit amet Donec nec aliquet libero. Vivamus rutrum erat sed arcu cursus
              </Text>
            </Animated.View>
          )}
          <VrButton
            style={{
              flexDirection: 'row',
              paddingTop: 0.1,
              paddingBottom: 0.1
            }}>
            <Text
              style={{
                fontSize: 0.09,
                color: '#004E7E',
                textAlign: 'left'
              }}>
              Top Up
            </Text>
            <Image
              style={{
                width: 0.1,
                height: 0.1,
                marginLeft: 0.72,
                textAlign: 'right'
              }}
              source={asset('right.jpg')}
            />
          </VrButton>
          <VrButton
            style={{
              flexDirection: 'row',
              paddingTop: 0.1,
              paddingBottom: 0.1
            }}>
            <Text
              style={{
                fontSize: 0.09,
                color: '#004E7E',
                textAlign: 'left'
              }}>
              Track SR Status
            </Text>
            <Image
              style={{
                width: 0.1,
                height: 0.1,
                marginLeft: 0.42,
                textAlign: 'right'
              }}
              source={asset('right.jpg')}
            />
          </VrButton>
          <VrButton
            style={{
              flexDirection: 'row',
              paddingTop: 0.1,
              paddingBottom: 0.1
            }}>
            <Text
              style={{
                fontSize: 0.09,
                color: '#004E7E',
                textAlign: 'left'
              }}>
              Surrender
            </Text>
            <Image
              style={{
                width: 0.1,
                height: 0.1,
                marginLeft: 0.65,
                textAlign: 'right'
              }}
              source={asset('right.jpg')}
            />
          </VrButton>
          <VrButton
            style={{
              flexDirection: 'row',
              paddingTop: 0.1
            }}>
            <Text
              style={{
                fontSize: 0.09,
                color: '#004E7E',
                textAlign: 'left'
              }}>
              Free look-in cancellation
            </Text>
            <Image
              style={{
                width: 0.1,
                height: 0.1,
                textAlign: 'right',
                marginLeft: 0.10,
              }}
              source={asset('right.jpg')}
            />
          </VrButton>
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#FAA0A0',
            borderBottomLeftRadius: 0.03,
            borderBottomRightRadius: 0.03,
            padding: 0.04,
            textAlign: 'center',
          }}>

<Text  
      style={{
            color: 'red',
            textAlign: 'center',
            marginLeft:0.24,
            marginRight:0.1
          }}>Service Desk</Text>
             <Image
        style={{
          width: .15,
          height: .15,
        }}
        source={asset('noun-cash.png')}
      />
     
            
      </View>
      </View>
    )
  }
}

export default Accordion;
