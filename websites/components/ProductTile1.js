/* Button.js */
import React from 'react';
import {
  asset,
  View,
  Image,
  Text,
  VrButton,
  Animated,
} from 'react-vr';

class ProductTile1 extends React.Component {
  constructor() {
    super();
    super();

    this.state = {
      isHovering: false,
    };

    this.onButtonEnter = this.onButtonEnter.bind(this);
    this.onButtonExit = this.onButtonExit.bind(this);
  }
  onButtonEnter() {
    this.setState({ isHovering: true });
  }

  onButtonExit() {
    this.setState({ isHovering: false });
  }

  buttontop() {
    return ( 
      <View>   
     <View style={{ flexDirection: 'row' , justifyContent: 'space-between'}}>
         <VrButton
        style={{
          borderColor: 'transparent',
           marginTop:.39,
           marginBottom:.10,
           layoutOrigin: [0.01, 0.01],
          alignItems: 'right',
          padding: 0.01,
          paddingLeft:0.00,

          //paddingRight: 1.2,
        }}
        // onEnter={this.onButtonEnter}
        // onExit={this.onButtonExit}
        // onClick={onClick}
      >
         <Image
        style={{
          width: .20,
         height: .20,
        }}
        source={asset('help-desk.png')}
      />
      </VrButton>
      <VrButton
        style={{
          borderColor: 'transparent',
          marginTop:.39,
          marginBottom:.10,
                     layoutOrigin: [0.01, 0.01],
                    alignItems: 'right',
                    padding: 0.01,
                    paddingLeft:0.00,
                    marginLeft:0.90,
        }}
        // onEnter={this.onButtonEnter}
        // onExit={this.onButtonExit}
        // onClick={onClick}
      >
         <Image
        style={{
          width: .20,
         height: .20,
        }}
        source={asset('noun-cash.png')}
      />
      </VrButton>
      </View>
      <View style={{ flexDirection: 'row' , justifyContent: 'space-between'}}>
         <VrButton
        style={{
          borderColor: 'transparent',
          //  marginTop:.39,
           layoutOrigin: [0.01, 0.01],
          alignItems: 'right',
          padding: 0.01,
          paddingLeft:0.00,
          //paddingRight: 1.2,
        }}
        // onEnter={this.onButtonEnter}
        // onExit={this.onButtonExit}
        // onClick={onClick}
      >
         <Image
        style={{
          width: .20,
         height: .20,
        }}
        source={asset('noun-cash.png')}
      />
      </VrButton>
      <VrButton
        style={{
          borderColor: 'transparent',
          // marginTop:.39,
                     layoutOrigin: [0.01, 0.01],
                    alignItems: 'right',
                    padding: 0.01,
                    paddingLeft:0.00,
                    marginLeft:0.90,
        }}
        // onEnter={this.onButtonEnter}
        // onExit={this.onButtonExit}
        // onClick={onClick}
      >
         <Image
        style={{
          width: .20,
         height: .20,
        }}
        source={asset('noun-cash.png')}
      />
      </VrButton>
      </View>
      </View>
      
     

     
// true on hover
    );
  }
  render() {
    return (
      <View>
        {this.buttontop()}
      {/* <VrButton
        style={{
          backgroundColor: this.state.backgroundColor,
          borderColor: 'transparent',
          padding: 0.05,
          layoutOrigin: [0.01, 0.01],
          alignItems: 'right',
         // paddingLeft:0.080,
        paddingRight: 1.1,
          //paddingLeft: 0.1,
        // paddingRight: 0.1,
        }}
        onEnter={this.onButtonEnter}
        onExit={this.onButtonExit}
        // onClick={onClick}
      >
         <Image
        style={{
          width: .20,
         height: .20,
        }}
        source={asset('help-desk.png')}
      />
      </VrButton>
        {this.state.isHovering && (
            <Animated.View
            style={{
              flexDirection: 'row', 
              position: 'absolute',
              backgroundColor: 'white',
              padding: 0.01,
              borderRadius:0.11,
              AlignVertical: 'right',
              marginTop:0.05,
              layoutOrigin: [0.6, 0.1],
              
            }}
          >
          
             <Image
        style={{
          width: .20,
         height: .20,
        }}
        source={asset('help-desk.png')}
      />
            <Text  style={{
            color: 'red',
            textAlign: 'center',
            textAlignVertical: 'center',
            paddingLeft: 0.1,
            paddingRight: 0.2,
            fontSize: 0.1,
            
            layoutOrigin: [0.1, 0.1],
          }}>Popup here</Text>
          </Animated.View>
        )} */}
      </View>
      
    );
  }
}
export default ProductTile1;
