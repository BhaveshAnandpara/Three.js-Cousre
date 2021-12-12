import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls' //(use it after camera)
import { BufferAttribute, BufferGeometry } from 'three'




//Scene
//Scene is like a Container for our render or object (e.g like a Movie set)

const scene = new THREE.Scene()

//RED Cube

//Geometry
// Geometry is a Shape of an Object or Render (e.g CUBE , SPHERE)

// const geometry = new THREE.BoxGeometry(1,1,1 , 2 ,2 ,2)
// 1 : width
// 2 : height
// 3 : Depth
// 4 : widthsegments
// 5 : heightsegments
// 6 : depthsegments


// //Creating a Single Triangle 

// const positionsArray = new Float32Array( [ //Creates a Array for Float 
// 	0.0, 0.0 ,0.0,
// 	0.0, 1.0, 0.0,
// 	1.0, 0.0, 0.0,
// ] );

// const positionAttribute = new BufferAttribute(positionsArray , 3) // 3 is like group for 3 values

// const geometry = new BufferGeometry()
// geometry.setAttribute('position' , positionAttribute) //Setting position as positionAttruibute

// //Creating a Multiple Triangle 

const positionsArray = new Float32Array(150)

for(let i = 0 ; i < 150 ; i++){
    positionsArray[i] = (Math.random() -0.5 ) * 4
}

const positionsAttribute = new BufferAttribute(positionsArray  , 3)

const geometry = new BufferGeometry()
geometry.setAttribute('position' , positionsAttribute)

//Material
// Material is just a Skin of object or render

const material = new THREE.MeshBasicMaterial({
    color : 0xE0BBE4 , //  color : 'red' , color : '#ff0000' ,  also works
    wireframe : true //Shows Wireframe 
}); 


//Mesh
// (Mesh = Geometry + Material)

const mesh = new THREE.Mesh(geometry , material)

scene.add(mesh)





//pre-defined sizes for the window size
const sizes = {

    width : 800,
    height : 600,
}

//Cameras


//PerspectiveCamera

const camera = new THREE.PerspectiveCamera(70, (sizes.width / sizes.height) ,1 , 1000)


camera.position.z = 3// used 3 beacuse cube is of 1 unit so got away from cube by 3 units 
// camera.lookAt(mesh.position)
scene.add(camera)





//Renderer
// Renderer basically shows the scene through Camera that we created (Renderer = Scene + Camera)

const  canvas = document.querySelector('.webgl')

const  renderer = new THREE.WebGLRenderer({
    canvas : canvas,  // Canvas for WEBGL
})
 
renderer.setSize(sizes.width ,sizes.height) //Sets size for the renderer 



//Controls 
const controls = new OrbitControls(camera , canvas)
controls.enableDamping = true //need to update per frame (in tick function)

//Animations

const tick = () => { //Creating a function for Animation 


    //Update Controls
    controls.update()

    //render
    renderer.render(scene , camera);    

    window.requestAnimationFrame(tick) // requestAnimationFrame() runs at 60 Frames per Second(FPS)


}

tick()