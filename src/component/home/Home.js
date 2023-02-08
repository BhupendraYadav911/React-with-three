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
  <orbitControls ref={ref} target={[120, 5, 0]} {...props} args={[camera, gl.domElement]}/>
    </>
   
}


function Dome() {
  const texture = useLoader(THREE.TextureLoader, '/showroom.jpg')
  return (
    <mesh>
      <sphereBufferGeometry attach="geometry" args={[800, 60, 40]} />
      <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} />
    </mesh>
  )
}

function Home() {
 
  return (
    
    <Canvas
    camera ={{ position: [5, -5, 5, -5] }}> 
    {/* <Controls2 mouseDown={ true } mouseUp={ true } onWheel={ true } /> */}
    <Controls enableZoom={true} zoomSpeed={2} maxDistance={1000} minDistance={-10000000} enablePan={false} enableDamping dampingFactor={0.2} rotateSpeed={-0.5} />
    <Suspense fallback={null}>
      <Dome />
    </Suspense>
  </Canvas>
  )
}

export default Home