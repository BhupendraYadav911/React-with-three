import React from 'react';

import {
  AppRegistry,
  asset,
  Pano,
  Text,
  Image,
  View,
  VrButton,
  Animated
} from 'react-vr';

import ProductTile from './components/ProductTile';
import testData from './data/testData';

const INFO_BUTTON_IMAGE = asset('help-desk.png');
console.log(INFO_BUTTON_IMAGE,'asdfghj');
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      textColor: 'blue',
      items: testData,
      isHovering: false,
    }
  }
  
 
  renderColumns() {
    const columns = (() => {
      const items = this.state.items;
      const arr = [];

      while (items.length) {
        arr.push(items.splice(0, 2));
      }

      return arr;
    })();

    return columns.map((items, index) => {
      return this.renderColumn(items, index);
    })
  }
  handleEnter = () => {
    console.log('stati',this.state.isHovering);
    this.setState({ isHovering: true });
  };
  handleExit = () => {
    this.setState({ isHovering: false });
    // Animated.timing(this.opacity, { toValue: 0, duration: 200 }).start();
  };
 
  renderColumn(items, index) {
    return (
      <View  style={{
        position: 'absolute',
        layoutOrigin: [0.5, 0.5],
        transform: [
          {rotateY: (index * -15)},
          {translateZ: -3}
        ],
      }}>
         <Pano source={asset("hdfc.jpg")} />
        {/* <Text
          style={{
            backgroundColor: "red",
            padding: 0.01,
            textAlign: "right",
            textAlignVertical: "",
            fontSize: 0.1,
            layoutOrigin: [0.1, 0.10],
            transform: [{ translate: [0, 0, -3] }]
          }}
        >
          hello
        </Text> */}
       
         <VrButton
        style={{
          // backgroundColor: this.state.backgroundColor,
          borderColor: 'transparent',
marginTop:.60,
          layoutOrigin: [0.01, 0.01],
          alignItems: 'right',
          padding: 0.01,
          paddingRight: 1.2,
        }}
        // onEnter={this.onButtonEnter}
        // onExit={this.onButtonExit}
        // onClick={onClick}
      >
         <Image
        style={{
          width: .15,
          height: .15,
        }}
        source={asset('noun-cash.png')}
      />
      </VrButton>
      {/* <VrButton
        style={{
          // backgroundColor: this.state.backgroundColor,
          borderColor: 'transparent',
marginTop:.0,
          layoutOrigin: [0.01, 0.01],
          alignItems: 'left',
          padding: 0.01,
          paddingLeft:1.5,
        }}
        // onEnter={this.onButtonEnter}
        // onExit={this.onButtonExit}
        // onClick={onClick}
      >
         <Image
        style={{
          width: .15,
          height: .15,
        }}
        source={asset('noun-cash.png')}
      />
      </VrButton> */}
      
       {items.map((item) => {
          return (
            <ProductTile
              // key={`${item.itemId}-${item.salePrice}-${item.name}`}
              // imageSource={asset(item.image)}
              // name={`${item.name.substring(0, 12)}...`}
              // price={item.salePrice}
              animationDelay={(index + 1) * 550}
            />
          );
        })}

      </View>
// true on hover
    );
  }

  render() {
    return (
      <View>
        <View
          style={{
            transform: [
              {rotateY: 30}
            ]
          }}
        >
          {this.renderColumns()}
        </View>
      </View>
    );
  }
};

AppRegistry.registerComponent('vr_showroom_demo', () => App);
