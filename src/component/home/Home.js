import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { Suspense, useEffect, useRef } from 'react'
import { Canvas, extend, useFrame, useThree, useLoader } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })



function Controls(props) {
  const { camera, gl } = useThree()
  const ref = useRef()
  useFrame(() => ref.current.update())
  return <>
    <orbitControls ref={ref} target={[120, 5, 0]} {...props} args={[camera, gl.domElement]} />
  </>

}


function Dome() {
  const texture = useLoader(THREE.TextureLoader, '/showroom outline ref.jpg');
  //console.log('hhhhhhhhhhh',texture);


  const listener = new THREE.AudioListener();
  console.log('hhhhhhhhhhh',texture, listener);
  // create the PositionalAudio object (passing in the listener)
  const sound = new THREE.PositionalAudio(listener);
  const scene = new THREE.Scene()
  // load a sound and set it as the PositionalAudio object's buffer
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load('/crowd_02.mp4', function (buffer) {
    sound.setBuffer(buffer);
    sound.setRefDistance(20);
    sound.play();
  });
  // create an object for the sound to play from
  const sphere = new THREE.SphereGeometry(20, 32, 16);
  const material = new THREE.MeshPhongMaterial({ color: 0xff2200 });
  const mesh = new THREE.Mesh(sphere, material);
  scene.add(mesh);

  // finally add the sound to the mesh
  mesh.add(sound);
  return (
    <mesh>
      <sphereBufferGeometry attach="geometry" args={[800, 60, 40]} />
      <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} />
    </mesh>
  )
}

function Home() {

  return (
    <>

      <Canvas camera={{ position: [5, -5, 5, -5] }}>
        <Controls mouseDown={true} mouseUp={true} onWheel={true} />
        <Suspense fallback={null}>
          <Dome />
        </Suspense>

      </Canvas>
    </>
    //   <Canvas
    //   camera ={{ position: [5, -5, 5, -5] }}> 
    //   {/* <Controls2 mouseDown={ true } mouseUp={ true } onWheel={ true } /> */}
    //   <Controls enableZoom={true} zoomSpeed={2} maxDistance={1000} minDistance={-10000000} enablePan={false} enableDamping dampingFactor={0.2} rotateSpeed={-0.5} />
    //   <Suspense fallback={null}>
    //     <Dome />
    //   </Suspense>
    // </Canvas>
  )
}

export default Home