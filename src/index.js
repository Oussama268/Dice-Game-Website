import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';



  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );


  


  //renderer

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth / 3 , window.innerHeight / 3 );
  renderer.setClearColor(0xffffff)
  renderer.setPixelRatio(2)

 /* document.body.appendChild( renderer.domElement );*/


  document.getElementById("dice").appendChild(renderer.domElement)
  camera.position.set(3.3,3.2,-3)
  camera.rotateY(2.3)
  camera.rotateX(-0.5)


  const light = new THREE.AmbientLight(0x404040,50)
 
  scene.add(light)
  


  //const controls =  new OrbitControls(camera, renderer.domElement)



  const loader = new GLTFLoader();



  
  loader.load( 'Dice4.glb', function ( gltf ) {
    const model = gltf.scene
    scene.add( model );

  }, undefined, function ( error ) {

  console.error( error );

  } );

/*
const grid = new THREE.GridHelper(30 , 30)
scene.add(grid)
*/



  function animate() {

    renderer.render( scene, camera );
  }

  window.addEventListener("resize" , () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / 3 , window.innerHeight / 3)
  })

  renderer.setAnimationLoop(animate)




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <>
      <h1>Hello</h1>




    </>
  </React.StrictMode>
);


reportWebVitals();
