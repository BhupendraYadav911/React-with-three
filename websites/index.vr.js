import React from 'react';

import {
  AppRegistry,
  asset,
  Pano,
  Text,
  Image,
  View,
  VrButton,
  Animated,
  Video,TextInput
} from 'react-vr';

import ProductTile from './components/ProductTile';
import testData from './data/testData';
import Voice from './components/Voice';
import Visit from './components/Visit';
import ProductTile1 from './components/ProductTile1';
import Accordion from './components/Accordion';

const INFO_BUTTON_IMAGE = asset('help-desk.png');
console.log(INFO_BUTTON_IMAGE, 'asdfghj');
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textColor: 'blue',
      items: testData,
      isHovering: false,
    };
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
    console.log('stati', this.state.isHovering);
    this.setState({ isHovering: true });
  };
  handleExit = () => {
    this.setState({ isHovering: false });
    // Animated.timing(this.opacity, { toValue: 0, duration: 200 }).start();
  };

  renderColumn(items, index) {
    return (
      <View style={{
        position: 'absolute',
        layoutOrigin: [0.5, 0.5],
        transform: [
          { rotateY: (index * -15) },
          { translateZ: -3 }
        ],
        flexDirection: 'row',
        alignItems: 'flex-start',
      }}>
        <Pano
          source={asset("hdfc.jpg")} />
         {/* center bannar */}
        <Video
          style={{
            width: 0.36,
            height: 1.2,
            position: 'absolute',
            top: 0.1,
            left: 0.5,
          }}
          source={asset("lady_center_start.mp4")}
          muted={true}
          autoPlay={true}

          loop={true}
          crossOrigin="anonymous"
          play={true}
        />
       {/* left bannar */}
       {/* <Video
          style={{
            width: 2.5,
            height: 6.7,
            position: 'absolute',
            top: -5.33,
            left: -20,
            transform: [
              { rotateY: 75 },
              { translateX: -7 },
            ],
          }}
          source={asset("crowd_04.mp4")}
          muted={true}
          autoPlay={true}

          loop={true}
          crossOrigin="anonymous"
          play={true}
        /> */}
        <Image
          style={{
            width: 2.5,
            height: 6.7,
            position: 'absolute',
            top: -5.33,
            left: -20,
            transform: [
              { rotateY: 75 },
              { translateX: -7 },
            ],
          }}
          source={asset('c5fcf010802aff3dd4b852f645d37a2f.png')}
        />



        {/* <Video
          style={{
            width: 0.36,
            height: 1.11,
            position: 'absolute',
            top: -0.5,
            left: 3,
          }}
          source={asset("lady_center_start.mp4")}
          muted={true}
          autoPlay={true}

          loop={true}
          crossOrigin="anonymous"
          play={true}
        /> */}
         <Image
          style={{
            width: 0.36,
            height: 1.11,
            position: 'absolute',
            top: -0.5,
            left: 3,
          }}
          source={asset('FK0I8JLVIAAqq1A.jpg')}
        />

        {/* <Video
          style={{
            width: 0.7,
            height: 2,
            position: 'absolute',
            top: -1.4,
            left: 5.69,
            transform: [
              { rotateY: -90 },
            ],
          }}
          source={asset("lady_center_idle01.mp4")}
          muted={true}
          autoPlay={true}

          loop={true}
          crossOrigin="anonymous"
          play={true}
        /> */}
         <Image
          style={{
            width: 0.7,
            height: 2,
            position: 'absolute',
            top: -1.3,
            left: 6.5,
            transform: [
              { rotateY: -90 },
            ],
          }}
          source={asset('c5fcf010802aff3dd4b852f645d37a2f.png')}
        />
         
        {/* righit bannar */}
        {/* <Video
          style={{
            width: 8,
            height: 10,
            position: 'absolute',
            top: -5.33,
            left: 45,
            transform: [
              { rotateY: 75 },
              { translateX: -16 },
            ],
          }}
          source={asset("crowd_04.mp4")}
          muted={true}
          autoPlay={true}

          loop={true}
          crossOrigin="anonymous"
          play={true}
        /> */}
        <Image
          style={{
            width: 4.3,
            height: 14,
            position: 'absolute',
            top: -10.33,
            left: 40,
            transform: [
              { rotateY: 75 },
              { translateX: -12 },
            ],
          }}
          source={asset('et2-683x1024.jpg')}
        />
        <Visit/>

        <ProductTile />
        <Voice/>
        

      </View>
      // true on hover
    );
  }

  render() {
    return (
      <View>
        <View
        >
          {this.renderColumns()}
        </View>
      </View>
    );
  }
};

AppRegistry.registerComponent('vr_showroom_demo', () => App);