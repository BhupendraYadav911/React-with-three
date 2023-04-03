import React from 'react';
import { AppRegistry, StyleSheet, View, VrButton, Text, Animated, Image, asset } from 'react-vr';
class ThankPage extends React.Component {


    constructor() {
        super()
        this.state = {
            msg: false
          }
        this.onButtonExit3 = this.onButtonExit3.bind(this)
   }
   onButtonExit3() {
    console.log('aaaaaaaaaaaa');
    this.setState({ msg: false })
  }
    render() {
        return (
            <Animated.View>
            <View style={{
                //flexDirection: 'column',
                padding: 0.11,
                width:1.3,
                backgroundColor: "#fff",
                position: 'absolute',
                borderRadius: 0.10,
                layoutOrigin: [1.2, 0.5],
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
      >
        <Text  onEnter={this.onButtonExit3}
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
                {/* <Animated.View style={{
                    flexDirection: 'row',
                    padding: 0.11,
                    backgroundColor: "#fff",
                    with:'100%'
                }}>
                    <VrButton style={{ paddingLeft: 0.02, paddingrighit: 0.02 }}>
                        <Text style={{
                            backgroundColor: "blue",
                        }}>OK</Text>
                    </VrButton>
                </Animated.View> */}

            </View >
            </Animated.View>
        )
    }
};
const styles = StyleSheet.create({
    tooltipText: {
        color: 'white',
        fontSize: 0.08,
        fontWeight: '400',
        textAlign: 'center',
    },
});
export default ThankPage;