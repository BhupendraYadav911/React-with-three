import React from 'react'
import { AppRegistry,StyleSheet, View, VrLine, Text, Animated, Image, asset } from 'react-vr'

class Wealth extends React.Component {
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
          layoutOrigin: [-0.8, 0.09],
      }}>
      <View style={{
      marginTop:0.07,
      marginLeft:0.1,
        borderRadius: 0.03,
        width:0.6,
        textAlignVertical: 'left',
        // padding:0.02,
        backgroundColor: '#F4F6F8',
        
      }}>
    <Text
      style={{
        margin:0.03,
        color: '#333333',
        fontSize:0.05,
      }}
    >
 2342  2828 - In Force
    </Text>
    </View>
    <View style={{
      marginTop:0.04,
      flexDirection:'row',
       marginLeft:0.1,
      // marginTop:0.15,
        // borderRadius: 0.03,
        // width:1.0,
        // textAlignVertical: 'left',
        // padding:0.02,
        
      }}>
    <Text
      style={{
        // padding:0.02,
        marginRight:0.02,
        // textAlign: 'left',
        // textAlignVertical: '',
        color: '#E8352F',
        fontSize:0.07,
        // marginBottom:0.02,
      }}
    >
HDFC 
    </Text>
    <Text
      style={{
        // padding:0.02,
        // marginRight:0.06,
        // textAlign: 'left',
        // textAlignVertical: '',
        color: '#4092DF',
        fontSize:0.07,
        // marginBottom:0.02,
      }}
    >
Life
    </Text>
    </View>
  
    <View style={{
       
      marginTop:0.06,
      marginLeft:0.1,
      }}>
    <Text
      style={{
       
        color: '#000000',
        fontSize:0.08,
      }}
    >
CLICK  2  WEALTH
    </Text>
    </View>

    <View style={{
       borderStyle: 'dashed',
       borderColor:'#333333',
       borderTopWidth:0.004,
      marginTop:0.04,
      flexDirection:'row',
       marginLeft:0.1,
     
        // borderRadius: 0.03,
        // width:1.0,
        // textAlignVertical: 'left',
        // padding:0.02,
        
      }}>
    <Text
      style={{
        marginTop:0.09,
        marginRight:0.2,
        color: '#333333',
        fontSize:0.05,
      }}
    >
12,15,400 
    </Text>
    <Text
      style={{
        marginTop:0.09,
        color: '#333333',
        fontSize:0.05,
        marginRight:0.2,
        // marginBottom:0.02,
      }}
    >
12,15,400
    </Text>
    <Text
      style={{
        marginTop:0.09,
        color: '#333333',
        fontSize:0.05,
        // marginBottom:0.02,
      }}
    >
13 / 12 / 2022
    </Text>
    </View>
    <View style={{
      // marginTop:0.04,
      flexDirection:'row',
       marginLeft:0.09,
      marginBottom:0.10,
        // borderRadius: 0.03,
        // width:1.0,
        // textAlignVertical: 'left',
        // padding:0.02,
        
      }}>
    <Text
      style={{
        marginRight:0.08,
        color: '#666666',
        fontSize:0.04,
      }}
    >
Premium Amount
    </Text>
    <Text
      style={{
        color: '#666666',
        fontSize:0.04,
        marginLeft:0.04,
       marginRight:0.08,
      }}
    >
Sum Assured
    </Text>
    <Text
      style={{
        marginLeft:0.1,
        color: '#666666',
        fontSize:0.04,
        // marginBottom:0.02,
      }}
    >
Premium Date
    </Text>
    </View>
              



         
      </View >
      </Animated.View>
       
    )
  }
  
 

 
};


export default Wealth;
