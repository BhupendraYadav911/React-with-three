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
import Accordion from './Accordion';
/*
 AddButton Component
*/
class AddButton extends React.Component {
  constructor() {
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
};

/*
 ProductTile Component
*/
class ProductTile extends React.Component {
  constructor() {
    super();

    this.state = {
      isHovering: false,
      isHovering2: false,
      translateX: new Animated.Value(0),
      opacity: new Animated.Value(0),
      rotateY: new Animated.Value(0),
      active: false,
    };
    this.onButtonEnter = this.onButtonEnter.bind(this);
    this.onButtonExit = this.onButtonExit.bind(this);
    this.onButtonEnter1 = this.onButtonEnter1.bind(this);
    this.onButtonExit1 = this.onButtonExit1.bind(this);
  }
  onButtonEnter() {
    this.setState({ isHovering: true });
  }

  onButtonExit() {

    this.setState({ isHovering: false });
  }
  onButtonEnter1() {
    this.setState({ isHovering2: true });
  }

  onButtonExit1() {
    this.setState({ isHovering2: false });
  }

  render () {
    return (
      <Animated.View
        style={{
          position: 'relative',
          // backgroundColor: '#fff',
          borderColor: 'transparent',
          borderWidth: 0.005,
          marginBottom: 0.1,
          opacity: this.state.opacity,
          transform: [
            {translateX: this.state.translateX},
            {rotateY: this.state.rotateY}
          ]
        }}>
          <View style={{ flexDirection: 'row' , justifyContent: 'space-between'}}>
         <VrButton
        //  animationDelay={(1000 + 1) * 550} 
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
              marginTop:0.4,
              marginLeft:0.2,
              layoutOrigin: [0.9, 0.1],
              
            }}
          >
          <Text
           style={{
            color: 'red',
            textAlign: 'center',
            textAlignVertical: 'center',
             paddingLeft: 0.01,
             paddingRight: 0.2,
            fontSize: 0.1,
            
             layoutOrigin: [0.1, 0.1],
          }}>Service Desk</Text>
             <Image
        style={{
          width: .20,
          height: .20,
        }}
        source={asset('help-desk.png')}
      />
            
          </Animated.View>
        )}
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
        onEnter={this.onButtonEnter1}
        onExit={this.onButtonExit1}
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
      {this.state.isHovering2 && (
            <Animated.View
            style={{
              flexDirection: 'row', 
              position: 'absolute',
              backgroundColor: 'white',
              padding: 0.01,
              borderRadius:0.11,
              AlignVertical: 'left',
              marginTop:0.4,
              marginLeft:1.1,
              layoutOrigin: [0.1, 0.1], 
              // transition: '2s width ease',
            }}
          >
          
             <Image
        style={{
          width: .20,
          height: .20,
        }}
        source={asset('noun-cash.png')}
      />
      <Text  
      style={{
            color: 'red',
            textAlign: 'center',
            textAlignVertical: 'center',
             paddingLeft: 0.01,
             paddingRight: 0.2,
            fontSize: 0.1,
             layoutOrigin: [0.1, 0.1],
          }}>Popup here</Text>
            
          </Animated.View>
          
        )}
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
      {/* <Accordion animationDelay={(index + 1) * 250} /> */}
      </Animated.View>
    );
  }

  componentDidMount() {
    this.state.translateX.setValue(1);
    this.state.opacity.setValue(0);
    Animated.parallel([
      Animated.timing(
        this.state.translateX,
        {
          toValue: 0,
          duration: 750,
          delay: this.props.animationDelay || 0
         
        }
      ),
      Animated.timing(
        this.state.opacity,
        {
          toValue: 1,
          duration: 750,
           delay: this.props.animationDelay || 0
        }
      )
    ]).start();
  }

  componentDidUpdate(_, prevState) {
    if (this.state.active && !prevState.active) {
      this.state.rotateY.setValue(0);
      Animated.timing(
        this.state.rotateY,
        {
          toValue: 180,
          duration: 750
        }
      ).start();
    }
  }
};

export default ProductTile;
