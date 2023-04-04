import React from 'react'
import { AppRegistry,StyleSheet, View, VrLine, Text, Animated, Image, asset } from 'react-vr'

class Chat extends React.Component {
  constructor() {
    super()

}

  render() {
    return (
      <Animated.View>
      <View style={{
          //flexDirection: 'column',
        
          width:1.3,
          backgroundColor: "#fff",
          position: 'absolute',
          borderRadius: 0.10,
          layoutOrigin: [1.18, -0.06],
      }}>
          <Animated.View style={{
               borderTopLeftRadius: 0.08,
               borderTopRightRadius: 0.08,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#F4F6F8',

                  
          }}>
              <Image
                  style={{
                      marginTop: 0.07,
                      marginBottom: 0.07,
                      width: 0.3,
                      height: 0.3,
                  }}
                  source={asset('user.png')}
              />
               
    <Text
      style={{
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: '500',
        color: '#000000'
      }}
    >
    Talk to Zoey
    </Text>
    </Animated.View>
    <View style={{
      marginLeft:0.2,
      marginTop:0.15,
        borderRadius: 0.03,
        width:1.0,
        textAlignVertical: 'right',
        // padding:0.02,
        backgroundColor: '#4092DF',
        
      }}>
    <Text
      style={{
        padding:0.01,
        marginRight:0.06,
        textAlign: 'right',
        textAlignVertical: 'right',
        color: '#fffff',
        fontSize:0.07,
        marginBottom:0.02,
      }}
    >
  I want to buy a policy, please help me!
    </Text>
    </View>
  
   
    <View style={{
      
      marginTop:0.07,
      marginLeft:0.1,
        borderRadius: 0.03,
        width:1.0,
        textAlignVertical: 'left',
        // padding:0.02,
        backgroundColor: '#F4F6F8',
        
      }}>
    <Text
      style={{
         padding:0.01,
         marginBottom:0.02,
        marginLeft:0.06,

        textAlign: 'left',
        textAlignVertical: 'left',
        color: '#213141',
        fontSize:0.07,
      }}
    >
  Sure, I will help you out. Please confirm, what is you name?
    </Text>
    </View>
    <View style={{
      marginLeft:0.9,
      marginTop:0.07,
      marginBottom:0.04,
        borderRadius: 0.03,
        width:0.3,
        textAlignVertical: 'right',
        // padding:0.02,
        backgroundColor: '#4092DF',
        
      }}>
    <Text
      style={{
        // padding:0.04,
        // paddingLeft:0.01,
        // paddingRight:0.05,
        marginRight:0.06,
        textAlign: 'right',
        textAlignVertical: 'right',
        color: '#fffff',
        fontSize:0.07,
      }}
    >
  Surajit
    </Text>
    </View>
   
              
 <View
          style={{
            borderTopWidth:0.004,
            borderColor:'#DDDDDD',
            borderBottomLeftRadius: 0.08,
            borderBottomRightRadius: 0.08,
            // marginBottom:0.04,
            flexDirection: 'row',
            padding: 0.02,
          
            // paddingRight: 0.01,
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
                  marginLeft:0.2
                }}
                source={asset('send.png')}
              />
              </View>
{/* </VrButton> */}

         
      </View >
      </Animated.View>
       
    )
  }
  
 

 
};


export default Chat;
