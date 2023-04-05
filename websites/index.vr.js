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
  Video
} from 'react-vr';

import ProductTile from './components/ProductTile';
import testData from './data/testData';
import Voice from './components/Voice';
import Visit from './components/Visit';
import ServiceAccordion from './components/ServiceAccordion';
import Wealth from './components/Wealth';
import Chat from './components/chat';
import ProductTile1 from './components/ProductTile1';
import Accordion from './components/Accordion';

// import ThankPage from './components/thanksPage';

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
          { translateZ: -3 },
        ],
        // transform: [
        //   { translate: [0, 0, -2] },
        //   { scale: zoom },
        // ],
    
        flexDirection: 'row',
        alignItems: 'flex-start',
      }}>
        <Pano
          source={asset("hdfc.jpg")} />
         {/* center bannar */}
        {/* <Video
          style={{
            width: 0.36,
            height: 1.2,
            position: 'absolute',
            top: 0.1,
            left: 0.6,
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
            width: 0.66,
            height: 1.3,
            position: 'absolute',
            top: 0.1,
            left: 0.4,
          }}
          source={asset("women.png")}
         
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
            width: 2.25,
            height: 6.7,
            position: 'absolute',
            top: -4.9,
            left: -19.59,
            transform: [
               { rotateY: 81 },
               { rotateX: 6 },
               { translateX: -6.8},
               { rotate: -0.1 },
            ],
          }}
          source={asset('hdfc2.jpeg')}
          // source={asset('c5fcf010802aff3dd4b852f645d37a2f.png')}
        />

<View >
   
            
       </View>

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
            width: 0.329,
            height: 1.04,
            position: 'absolute',
            top: -0.37,
            left: 3.12,
            transform: [
              { rotate: -1.3 },
           ],
          }}
          // source={asset('FK0I8JLVIAAqq1A.jpg')}
          source={asset('hdfc4.jpg')}
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
            height: 2.06,
            position: 'absolute',
            top: -1.23,
            left: 6.7,
            transform: [
              { rotateY: -90 },
              { rotate: -1.3 },
            ],
          }}
          source={asset('hdfc3.jpeg')}
        />
        <ServiceAccordion/>
         
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
          width: 4.1,
          height: 11.8,
          position: 'absolute',
          top: -9.1,
          left: 32,
          transform: [
            { rotateY: -76 },
            { translateX: 12.1 },
            { rotate: -1.8 },
          ],
        }}
        source={asset('hdfc5.png')}
      />
        <Visit/>
       
      
        <ProductTile />
        
        <Voice/>
        {/* <Wealth/> */}
        {/* <Chat/> */}

        {/* <ThankPage/> */}
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