import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import "./App.css"
import React, { useEffect } from 'react';
import { useState } from 'react';
import Rules from './Rules';







function App() {


  //scene,camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
  
  
  
  
  
  //renderer
  
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth / 4 , window.innerHeight / 4 );
  renderer.setPixelRatio(2)
  renderer.setClearColor(0xffffff)
  

  /* document.body.appendChild( renderer.domElement );*/
  
  
  
  document.getElementById("dice").appendChild(renderer.domElement)


  //Camera(rotation,position)
  camera.position.set(3.3,5,-3)
  camera.rotateY(2.3)
  camera.rotateX(-0.8)
  

  //Light
  const light = new THREE.AmbientLight(0x404040,50)
  scene.add(light)
  
  
  
  //const controls =  new OrbitControls(camera, renderer.domElement)
  
  
  let mixer;
  let clips ;



  //load 3d module
  const loader = new GLTFLoader();


  loader.load( 'Dice.glb', function ( gltf ) {
  
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
  


  //clock timer for animations
  const clock = new THREE.Clock()



  //render loop func
  function animate() {
    if(mixer){
      mixer.update(clock.getDelta())
    }
    
    renderer.render( scene, camera );
  }
  
 

  //Responsible(resize)
  window.addEventListener("resize" , () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / 4 , window.innerHeight / 4)
  })
  


  //call render loop func
  renderer.setAnimationLoop(animate)
  




//React logic

let faces = ["1 to 1" , "1 to 2" , "1 to 3", "1 to 4", "1 to 5", "1 to 6" ]
function loadanime(face){
  
  let clip
  let action
  let faceUsedInAnim
  faceUsedInAnim =  faces[Math.floor(Math.random() * faces.length)] 
  clip = THREE.AnimationClip.findByName(clips , faceUsedInAnim)
  action = mixer.clipAction(clip)
  if(action){
    action.setLoop(THREE.LoopOnce)
    action.clampWhenFinished = true
    action.play()
  }
  return faceUsedInAnim.slice(-1)

}

/*
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
  
    switch (face){
      case "1-2-3":

        faceUsedInAnim =  face1_2_3[Math.floor(Math.random() * face1_2_3.length)] 
        clip = THREE.AnimationClip.findByName(clips , faceUsedInAnim)
        action = mixer.clipAction(clip)
        if(action){
          action.setLoop(THREE.LoopOnce)
          action.clampWhenFinished = true
          action.play() 

        }
        

        
        return faceUsedInAnim.slice(-5)
        break;

      case "1-3-4":
        faceUsedInAnim = face1_3_4[Math.floor(Math.random() * face1_3_4.length)] 
        clip = THREE.AnimationClip.findByName(clips , faceUsedInAnim)
        action = mixer.clipAction(clip)
        if(action){
          action.setLoop(THREE.LoopOnce)
          action.clampWhenFinished = true
          action.play() 
        }
        

        return faceUsedInAnim.slice(-5)
        break;

      case "1-4-5":
        faceUsedInAnim = face1_4_5[Math.floor(Math.random() * face1_4_5.length)] 
        clip = THREE.AnimationClip.findByName(clips , faceUsedInAnim)
        action = mixer.clipAction(clip)
        if(action){
          action.setLoop(THREE.LoopOnce)
          action.clampWhenFinished = true
          action.play() 
        }
        

        return faceUsedInAnim.slice(-5)
        break;
      
      case "1-5-2":
        faceUsedInAnim = face1_5_2[Math.floor(Math.random() * face1_5_2.length)] 
        clip = THREE.AnimationClip.findByName(clips , faceUsedInAnim)
        action = mixer.clipAction(clip)
        if(action){
          action.setLoop(THREE.LoopOnce)
          action.clampWhenFinished = true
          action.play() 
        }
        

        return faceUsedInAnim.slice(-5)
        break;

      case "3-2-6":
        faceUsedInAnim = face3_2_6[Math.floor(Math.random() * face3_2_6.length)]
        clip = THREE.AnimationClip.findByName(clips , faceUsedInAnim )
        action = mixer.clipAction(clip)
        if(action){
          action.setLoop(THREE.LoopOnce)
          action.clampWhenFinished = true
          action.play() 
        }

        


        return faceUsedInAnim.slice(-5)
        break;

      case "3-4-6":
        faceUsedInAnim = face3_4_6[Math.floor(Math.random() * face3_4_6.length)]
        clip = THREE.AnimationClip.findByName(clips , faceUsedInAnim )
        action = mixer.clipAction(clip)
        if(action){
          action.setLoop(THREE.LoopOnce)
          action.clampWhenFinished = true
          action.play() 
        }
        

        return faceUsedInAnim.slice(-5)
        break;

      case "5-2-6":

        faceUsedInAnim = face5_2_6[Math.floor(Math.random() * face5_2_6.length)];
        clip = THREE.AnimationClip.findByName(clips , faceUsedInAnim )
        action = mixer.clipAction(clip)
        if(action){
          action.setLoop(THREE.LoopOnce)
          action.clampWhenFinished = true
          action.play() 
        }
        
        

        return faceUsedInAnim.slice(-5)
        break;

      case "5-4-6":
        faceUsedInAnim = face5_4_6[Math.floor(Math.random() * face5_4_6.length)] 
        clip = THREE.AnimationClip.findByName(clips , faceUsedInAnim )
        action = mixer.clipAction(clip)
        if(action){
          action.setLoop(THREE.LoopOnce)
          action.clampWhenFinished = true
          action.play() 
        }
        

        return faceUsedInAnim.slice(-5)
        
        break;
      
      



      }
    

}


*/




function initialiser(){
    setNumberTry(0)
    setFaceNow("1")
    setWin(false)
    setFirstTry(true)
    setNumberFace(numbers[Math.floor(Math.random() * numbers.length)])
    document.getElementById("dice").innerHTML = ""


}



const numbers = [1,2,3,4,4,5,5,6,6]

  const [facenow,setFaceNow] = useState("1");
  const [numbertry,setNumberTry] = useState(0)
  const [numberFace,setNumberFace] = useState(numbers[Math.floor(Math.random() * numbers.length)])
  const [win,setWin] = useState(false)
  const [firstTry,setFirstTry] = useState(true)
  


  
 let select
  useEffect(() => {if(facenow.indexOf(numberFace.toString()) != -1 && firstTry === false){
    
    setWin(true)
    select = document.getElementById("dice")
    select.removeChild(select.lastChild)
    
  }}, [facenow])
 

  
  function Close(){
    setBlured("none")
    setDisplay("none")
    select = document.getElementById("dice")
    select.removeChild(select.lastChild)
  
  }
  const [display, setDisplay] = useState('block') 
  const [blured, setBlured] = useState('blur(4px)') 

 
  return (
    <>
      <Rules close={Close} display={display}/>

    <div style={{filter : blured}} className='app'>
      <h1>Dice game...</h1>
      <h3>face : {numberFace}</h3>
      <h3>number of attempts : {numbertry}</h3>
      <button onClick={win ? () => {initialiser()} : () => {
          setFirstTry(false);
          setFaceNow(loadanime(facenow));
          setNumberTry(numbertry => numbertry + 1)
          
        }}>{win === false ? <p>Play</p> : <p>Reset</p>}</button>

        {
          win && <h2>Congrats You found the hidden face </h2> 
        }
        
    </div>
    
   
    </>
  );
}

export default App;
