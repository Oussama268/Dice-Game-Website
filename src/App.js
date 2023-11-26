import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';






function App() {

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
  
  
  
  let mixer;
  let clips ;
  loader.load( 'Dice4.glb', function ( gltf ) {
  
    const model = gltf.scene
    scene.add( model );
    mixer = new THREE.AnimationMixer(model)
    clips = gltf.animations
    
  
  }, undefined, function ( error ) {
  
  console.error( error );
  
  } );
  
  /*
  const grid = new THREE.GridHelper(30 , 30)
  scene.add(grid)
  */
  
  
  const clock = new THREE.Clock()
  function animate() {
    if(mixer){
      mixer.update(clock.getDelta())
    }
    
    renderer.render( scene, camera );
  }
  
  
  window.addEventListener("resize" , () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / 3 , window.innerHeight / 3)
  })
  
  renderer.setAnimationLoop(animate)
  

//React logic


let face1_2_3 = ["1-2-3 to 1-3-4" , "1-2-3 to 1-4-5" ,"1-2-3 to 1-5-2" ,"1-2-3 to 3-2-6" ,"1-2-3 to 3-4-6" , "1-2-3 to 5-2-6" , "1-2-3 to 5-4-6" ];
let face1_3_4 = ["1-3-4 to 1-2-3" , "1-3-4 to 1-4-5" ,"1-3-4 to 1-5-2" ,"1-3-4 to 3-2-6" ,"1-3-4 to 3-4-6" , "1-3-4 to 5-2-6" , "1-3-4 to 5-4-6" ];
let face1_4_5 = ["1-4-5 to 1-2-3" , "1-4-5 to 1-3-4" ,"1-4-5 to 1-5-2" ,"1-4-5 to 3-2-6" ,"1-4-5 to 3-4-6" , "1-4-5 to 5-2-6" , "1-4-5 to 5-4-6" ];
let face1_5_2 = ["1-5-2 to 1-2-3" , "1-5-2 to 1-3-4" ,"1-5-2 to 1-4-5" ,"1-5-2 to 3-2-6" ,"1-5-2 to 3-4-6" , "1-5-2 to 5-2-6" , "1-5-2 to 5-4-6" ];
let face3_2_6 = ["3-2-6 to 1-2-3" , "3-2-6 to 1-3-4" ,"3-2-6 to 1-4-5" ,"3-2-6 to 1-5-2" ,"3-2-6 to 3-4-6" , "3-2-6 to 5-2-6" , "3-2-6 to 5-4-6" ];
let face3_4_6 = ["3-4-6 to 1-2-3" , "3-4-6 to 1-3-4" ,"3-4-6 to 1-4-5" ,"3-4-6 to 1-5-2" ,"3-4-6 to 3-2-6" , "3-4-6 to 5-2-6" , "3-4-6 to 5-4-6" ];
let face5_2_6 = ["5-2-6 to 1-2-3" , "5-2-6 to 1-3-4" ,"5-2-6 to 1-4-5" ,"5-2-6 to 1-5-2" ,"5-2-6 to 3-2-6" , "5-2-6 to 3-4-6" , "5-2-6 to 5-4-6" ];
let face5_4_6 = ["5-4-6 to 1-2-3" , "5-4-6 to 1-3-4" ,"5-4-6 to 1-4-5" ,"5-4-6 to 1-5-2" ,"5-4-6 to 3-2-6" , "5-4-6 to 3-4-6" , "5-4-6 to 5-2-6" ];



function loadanime(face){
  let clip
  let action
  let faceUsedInAnim
  console.log(face)
  
    switch (face){
      case "1-2-3":
        faceUsedInAnim =  face1_2_3[Math.floor(Math.random() * face1_2_3.length)] 
        clip = THREE.AnimationClip.findByName(clips , faceUsedInAnim)
        action = mixer.clipAction(clip)
        action.setLoop(THREE.LoopOnce)
        action.clampWhenFinished = true
        action.play()
        console.log(faceUsedInAnim.slice(-5))
        return faceUsedInAnim.slice(-5)
        break;

      case "1-3-4":
        faceUsedInAnim = face1_3_4[Math.floor(Math.random() * face1_3_4.length)] 
        clip = THREE.AnimationClip.findByName(clips , faceUsedInAnim)
        action = mixer.clipAction(clip)
        action.setLoop(THREE.LoopOnce)
        action.clampWhenFinished = true
        action.play()
        console.log(faceUsedInAnim.slice(-5))
        return faceUsedInAnim.slice(-5)
        break;

      case "1-4-5":
        faceUsedInAnim = face1_4_5[Math.floor(Math.random() * face1_4_5.length)] 
        clip = THREE.AnimationClip.findByName(clips , faceUsedInAnim)
        action = mixer.clipAction(clip)
        action.setLoop(THREE.LoopOnce)
        action.clampWhenFinished = true
        action.play()
        console.log(faceUsedInAnim.slice(-5))
        return faceUsedInAnim.slice(-5)
        break;
      
      case "1-5-2":
        faceUsedInAnim = face1_5_2[Math.floor(Math.random() * face1_5_2.length)] 
        clip = THREE.AnimationClip.findByName(clips , faceUsedInAnim)
        action = mixer.clipAction(clip)
        action.setLoop(THREE.LoopOnce)
        action.clampWhenFinished = true
        action.play()
        console.log(faceUsedInAnim.slice(-5))
        return faceUsedInAnim.slice(-5)
        break;

      case "3-2-6":
        faceUsedInAnim = face3_2_6[Math.floor(Math.random() * face3_2_6.length)]
        clip = THREE.AnimationClip.findByName(clips , faceUsedInAnim )
        action = mixer.clipAction(clip)
        action.setLoop(THREE.LoopOnce)
        action.clampWhenFinished = true
        action.play()
        console.log(faceUsedInAnim.slice(-5))
        return faceUsedInAnim.slice(-5)
        break;

      case "3-4-6":
        faceUsedInAnim = face3_4_6[Math.floor(Math.random() * face3_4_6.length)]
        clip = THREE.AnimationClip.findByName(clips , faceUsedInAnim )
        action = mixer.clipAction(clip)
        action.setLoop(THREE.LoopOnce)
        action.clampWhenFinished = true
        action.play() 

        console.log(faceUsedInAnim.slice(-5))
        return faceUsedInAnim.slice(-5)
        break;

      case "5-2-6":

        faceUsedInAnim = face5_2_6[Math.floor(Math.random() * face5_2_6.length)];
        clip = THREE.AnimationClip.findByName(clips , faceUsedInAnim )
        action = mixer.clipAction(clip)
        action.setLoop(THREE.LoopOnce)
        action.clampWhenFinished = true
        action.play() 

        console.log(faceUsedInAnim.slice(-5))
        return faceUsedInAnim.slice(-5)
        break;

      case "5-4-6":
        faceUsedInAnim = face5_4_6[Math.floor(Math.random() * face5_4_6.length)] 
        clip = THREE.AnimationClip.findByName(clips , faceUsedInAnim )
        action = mixer.clipAction(clip)
        action.setLoop(THREE.LoopOnce)
        action.clampWhenFinished = true
        action.play() 
        console.log(faceUsedInAnim.slice(-5))
        return faceUsedInAnim.slice(-5)
        break;
      
      




      }
    

}







const numbers = [1,2,3,4,5,6]

  const [facenow,setFaceNow] = useState("1-2-3");
  const [numbertry,setNumberTry] = useState(0)
  const [number,setNumber] = useState(numbers[Math.floor(Math.random() * numbers.length)])
  
  return (
    <div>
      <h1>Jeu de Dé...</h1>
      <h3>face : {number}</h3>
      <h3>nombre d'essais : {numbertry}</h3>
      <button onClick={() => { 
        setFaceNow(loadanime(facenow))
          
        }}></button>
    </div>
    
   
  );
}

export default App;
