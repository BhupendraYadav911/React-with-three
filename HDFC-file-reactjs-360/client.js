// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance, Surface } from 'react-360-web';
//import { Math as GLMath } from "webgl-ui";
function init(bundle, parent, options = {}) {

  console.log('options', options);

  // const horizontalPanel = new Surface(300, 300, Surface.SurfaceShape.Flat);
  // const hvPanel = new Surface(300, 300, Surface.SurfaceShape.Flat);

  // horizontalPanel.setAngle(0, -0.5);

  // const cameraDirection = [0, 0, 1];

  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,

    // frame: () => {
    //   const cameraQuat = r360.getCameraQuaternion();
    //   cameraDirection[1] = 1;
    //   cameraDirection[1] = 1;
    //   cameraDirection[2] = 1;
    //   // cameraDirection will point out from the view of the camera,
    //   // we can use it to compute surface angles
    //   //rotateByQuaternion(cameraDirection, cameraQuat);

    //   const cx = cameraDirection[2];
    //   const cy = cameraDirection[1];
    //   const cz = cameraDirection[2];

    //   const horizAngle = Math.atan2(cx, -cz);
    //   const vertAngle = Math.asin(cy / Math.sqrt(cx * cx + cy * cy + cz * cz));
    //   horizontalPanel.setAngle(horizAngle, 0);
    //   hvPanel.setAngle(horizAngle, vertAngle);
    // },
    ...options,
  });

  // // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot('hello_vr', { /* initial props */ }),
    r360.getDefaultSurface()
  );

  // // Load the initial environment

  r360.compositor.setBackground(r360.getAssetURL('HDFC_360_SHOT_BG02_01.JPG'));
  //r360.compositor.setBackground(r360.getAssetURL('showroom.jpg'));
 // r360.compositor.setBackground(r360.getAssetURL('showroom outline ref.jpg'));
  r360._cameraPosition = [0, 0, 0];
   //r360._cameraQuat=[0,0,0,0]
  // r360.renderToSurface(
  //   r360.createRoot('hello_vr'),horizontalPanel,
  //    r360.getDefaultSurface() );
  // r360.compositor.setBackground(r360.getAssetURL('showroom.jpg'));
  console.log('aaaaaaaaaaaaaa', r360);
}

window.React360 = { init };


// import { ReactInstance, Surface } from 'react-360-web';
// import { Math as GLMath } from "webgl-ui";

// function init(bundle, parent, options = {}) {
//   const horizontalPanel = new Surface(300, 300, Surface.SurfaceShape.Flat);
//   const hvPanel = new Surface(300, 300, Surface.SurfaceShape.Flat);

//   horizontalPanel.setAngle(0, -0.5);

//   const cameraDirection = [0, 0, -1];
//   const { rotateByQuaternion } = GLMath;
//   console.log('Math: ', Math)

//   const r360 = new ReactInstance(bundle, parent, {
//     fullScreen: true,
//     frame: () => {
//       const cameraQuat = r360.getCameraQuaternion();
//       cameraDirection[0] = 0;
//       cameraDirection[1] = 0;
//       cameraDirection[2] = -1;
//       // cameraDirection will point out from the view of the camera,
//       // we can use it to compute surface angles
//       rotateByQuaternion(cameraDirection, cameraQuat);

//       const cx = cameraDirection[0];
//       const cy = cameraDirection[1];
//       const cz = cameraDirection[2];

//       const horizAngle = Math.atan2(cx, -cz);
//       const vertAngle = Math.asin(cy / Math.sqrt(cx * cx + cy * cy + cz * cz));
//       horizontalPanel.setAngle(horizAngle, -0.5);
//       hvPanel.setAngle(horizAngle, vertAngle);
//     },
//     ...options,
//   });

//   r360.renderToSurface(r360.createRoot('HorizontalPanel'), horizontalPanel);
//   r360.renderToSurface(r360.createRoot('HVPanel'), hvPanel);

//   r360.compositor.setBackground('showroom.jpg');
// }

// window.React360 = {init};