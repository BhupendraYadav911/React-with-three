import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  asset,
  Text,
  Image,
  View,
  VrButton,
  Video,
  Iframe,
  Button,
  Source,
  Img,
  Html,
  Animated
} from 'react-360';

export default class hello_vr extends React.Component {
  state = {
    counter: 0,
    testcanPlay: true,
    open: true,
    opacity: new Animated.Value(1),
  };

  _incrementCounter = () => {
    this.testcanPlay = false;

    this.setState({
      counter: (this.state.counter += 1),
     
    });
  };

  render() {
    return (
     
      <View >
      <View style={styles.panel}>
        <Video
          style={styles.video}
          source={asset('./crowd_01.mp4')}
          muted={true}
          loop={false}
          playWhenInactive={false}
          playInBackground={false}
          canPlay={false}

          play={false}
          crossOrigin="anonymous"
        />
      </View>
      <View style={styles.receptionPanel}>
        <Video
          style={styles.receptionVideo}
          source={asset('./video_7E56BFBF_72CC_0C20_41CC_BD333E6C0FBE_en.mp4')}
          muted={true}
          loop={false}
          playWhenInactive={false}
          playInBackground={false}
          canPlay={false}
          play={false}
          crossOrigin="anonymous" />
      </View>
      <View style={styles.receptiontwoPanel}>
        <Video
          style={styles.receptiontwoVideo}
          source={asset('./video_7E561DEB_72CC_0C20_41DB_F5099C90FA04_en.mp4')}
          muted={true}
          loop={false}
          playWhenInactive={false}
          playInBackground={false}
          canPlay={false}
          play={false}
          crossOrigin="anonymous" />
      </View>
      <View style={styles.mainPanel}>
        <Video
          style={styles.mainVideo}
          source={asset('./video_7E56E305_72CC_15E0_41D7_9F4C145D62FB_en.mp4')}
          muted={true}
          loop={false}
          playWhenInactive={false}
          playInBackground={false}
          canPlay={false}
          play={false}
          crossOrigin="anonymous" />
      </View>
      <View style={styles.couchPanel}>
        <Video
          style={styles.couchVideo}
          source={asset('./crowd_02.mp4')}
          muted={true}
          loop={false}
          playWhenInactive={false}
          playInBackground={false}
          canPlay={false}
          play={false}
          crossOrigin="anonymous" />
      </View>
      <View style={styles.couchtwoPanel}>
        <Video
          style={styles.couchtwoVideo}
          source={asset('./crowd_03.mp4')}
          muted={true}
          loop={false}
          playWhenInactive={false}
          playInBackground={false}
          canPlay={false}
          play={false}
          crossOrigin="anonymous" />
      </View>
      <View class="couchtwoPanelGroup" style={styles.couchtwoPanelGroup}>
        <VrButton onClick={this._incrementCounter}>
          <Text style={styles.greeting}>clicked me {this.state.counter} times.</Text>
        </VrButton>
        <Video
          style={styles.couchtwoVideoGroup}
          source={asset('./crowd_04.mp4')}
          muted={true}
          loop={false}
          playWhenInactive={false}
          playInBackground={false}
          canPlay={this.state.testcanPlay}
          play={false}
          crossOrigin="anonymous" />
      </View>
    </View>
    );
  }
};

const styles = StyleSheet.create({

  panel: {
    // Fill the entire surface
    // width: 120,
    // height: 130,
    // backgroundColor: 'rgba(255, 255, 255, 0.4)',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 247,
    marginLeft: 165,
    borderWidth: 0,


    alignItems: 'center',
    justifyContent: 'center'
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 20,
    color: '#ff0000'
  },
  video: {
    display: 'flex',
    width: 130.5,
    height: 110,
    borderWidth: 0,
  },

  receptionPanel: {
    marginTop: -115,
    marginLeft: 793.5,
  },
  receptionVideo: {
    display: 'flex',
    width: 141,
    height: 120,
  },

  receptiontwoPanel: {
    marginTop: -120,
    // marginLeft: -483,
    marginLeft: 54.3,
  },
  receptiontwoVideo: {
    display: 'flex',
    width: 130,
    height: 120,
  },
  mainPanel: {
    marginTop: -231,
    // marginLeft: -80,
    // marginBottom: 250,
    marginLeft: 455,
  },
  mainVideo: {
    display: 'flex',
    width: 100,
    height: 342,
  },

  couchPanel: {
    marginTop: -240,
    left: -40,
    justifyContent: 'flex-start',

  },
  couchVideo: {
    display: 'flex',
    width: 100,
    height: 170,
  },
  couchtwoPanel: {
    marginTop: -216,
    marginLeft: 890,
    // transform:[
    //   {rotateX:('50deg')}
    // ]
  },
  couchtwoVideo: {
    display: 'flex',
    width: 200,
    height: 300,
  },
  couchtwoPanelGroup: {
    marginTop: -100,
    marginLeft: -100,
    //justifyContent: 'flex-start',
    // transform:[
    //   {rotateX:90},
    //   {rotateX:90}
    // ]
  },
  couchtwoVideoGroup: {
    position: 'absolute',
    // display: 'flex',
    width: 250,
    height: 300,
  },

});

// // Create a player
// const player = VideoModule.createPlayer('myplayer');
// // Play a specific video
// player.play({
//   source: {url: staticResourceURL('crowd_01.mp4')}, // provide the path to the video
//   stereo: '3DTB', // optionally, supply the format of the video
// });
// // Display the background video on the Environment
// Environment.setBackgroundVideo('myplayer'); // or you can use player._player which is same value
// // Or, play in-line on a surface
// Environment.setScreen(
//   'default', /* screen name */
//   'myplayer', /* player unique id */
//   'default', /* surface name */
//   0, 0, 600, 400 /* relative position on the surface */
// );

// class MyVideoComponent extends React.Component {
//   render() {
//     return (
//       <View>
//         <Video
//           style={{
//             height: 480,
//             width: 640,
//           }}
//           source={{
//             url: '/var/www/html/hello-vr/static_assets/crowd_01.mp4',
//             format: 'mp4',
//           }}
//           muted={true}
//           loop={true}
//         />
//       </View>
//     );
//   }
// }

AppRegistry.registerComponent('hello_vr', () => hello_vr);
