import React from 'react'
import { AppRegistry,StyleSheet, View, VrLine, Text, Animated, Image, asset } from 'react-vr'

class Wealth extends React.Component {
  constructor() {
    super()

}

  render() {
    return (
      <View>
         <Animated.View>
      <View style={{
          width:1.3,
          backgroundColor: "#fff",
          position: 'absolute',
          borderRadius: 0.10,
          layoutOrigin: [-0.8, 1.0],
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
    >2342  2828 - In Force
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
       borderStyle: 'dotted',
       borderColor:'#333333',
       borderTopWidth:0.004,
      marginTop:0.04,
      flexDirection:'row',
       marginLeft:0.1,
        
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
      <Animated.View>
      <View style={{
          //flexDirection: 'column',
          width:1.3,
          backgroundColor: "#fff",
          position: 'absolute',
          borderRadius: 0.10,
          layoutOrigin: [-0.8, -0.09],
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
    >2342  2828 - In Force
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
       borderStyle: 'dotted',
       borderColor:'#333333',
       borderTopWidth:0.004,
      marginTop:0.04,
      flexDirection:'row',
       marginLeft:0.1,
        
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
      <Animated.View>
      <View style={{
          //flexDirection: 'column',
        
          width:1.3,
          backgroundColor: "#fff",
          position: 'absolute',
          borderRadius: 0.10,
          layoutOrigin: [-0.8, -0.9],
      }}>
      <View style={{
          flexDirection: 'row',
          justifyContent:'space-between',
          paddingLeft:0.10,
          paddingRight:0.12,
      marginTop:0.07,
      // marginLeft:0.1,
     
       
        // textAlignVertical: 'left',
        // padding:0.02,
      
        
      }}>
    <Text
      style={{
           borderRadius: 0.03,
        width:0.6,
        backgroundColor: '#F4F6F8',
        paddingTop:0.05,
        // paddingBottom:0.03,
        // paddingLeft:0.03,
        // paddingTop:0.05,
        color: '#333333',
        fontSize:0.05,
      }}
    >2342  2828 - In Force
    </Text>
    <Image
              style={{
                width: 0.07,
                height: 0.07,
                // marginLeft: 0.42,
                // textAlign: 'right'
              }}
              source={asset('close.png')}
            />
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
       borderStyle: 'dotted',
       borderColor:'#333333',
       borderTopWidth:0.004,
      marginTop:0.04,
      flexDirection:'row',
       marginLeft:0.1,
        
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
    <View style={{
      flexDirection:'row',
     marginBottom:0.09,
      marginLeft:0.1,
      marginRight:0.1,
        borderRadius: 0.03,
        // width:0.6,
        // textAlignVertical: 'left',
        //  padding:0.02,
        backgroundColor: '#FFEAE8',
        
      }}>
    <Text
      style={{
        margin:0.04,
        color: '#333333',
        fontSize:0.05,
      }}
    >Your policy has expired
    </Text>
    <View
            style={{
              flexDirection: 'row',
              justifyContent:'space-between',
              backgroundColor: '#FF6B61',
margin:0.04,
borderRadius:0.02,
              // paddingLeft:0.01,
              // paddingRight:0.01,
              // paddingTop: 0.1,
              //paddingBottom: 0.1
            }}>
            <Text
              style={{
                fontSize: 0.05,
                color: '#ffffff',
                textAlign: 'left'
              }}>
              Revive Now
            </Text>
            <Image
              style={{
                width: 0.04,
                height: 0.04,
                margin:0.02,
                // marginLeft: 0.42,
                // textAlign: 'right'
              }}
              source={asset('vright.png')}
            />
          </View>
    </View>
      </View >
      </Animated.View>
      </View>
     
       
    )
  }
  
 

 
};


export default Wealth;
