import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls' //(use it after camera)



//Cursor

// const cursor = { //saving position of mouse into x and y so that we can make them go from -0.5 - 0.5
//     x: 0 ,
//     y:0
// }

// window.addEventListener('mousemove' , (e) =>{

//     // console.log(e.clientX) //Gives value from 1 to width of screen in pixels (devices have diff widths so problem)

//     cursor.x = e.clientX / sizes.width - 0.5  //gives value from -0.5 - 0.5 
//     // cursor.y = e.clientY / sizes.height - 0.5 //gives value from -0.5 - 0.5 (top axis is negative and bottom axis is positive)
//     cursor.y = - (e.clientY / sizes.height - 0.5) //gives value from -0.5 - 0.5 (top axis is positive and bottom axis is negative) (more like axes system now)

//     console.log(cursor.x)

// })



//Scene
//Scene is like a Container for our render or object (e.g like a Movie set)

const scene = new THREE.Scene()

//RED Cube

//Geometry
// Geometry is a Shape of an Object or Render (e.g CUBE , SPHERE)

const geometry = new THREE.BoxGeometry(1,1,1)


//Material
// Material is just a Skin of object or render

const material = new THREE.MeshBasicMaterial({
    color : 0xE0BBE4 , //  color : 'red' , color : '#ff0000' ,  also works
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
//1st Parameter is Field of View (in degrees) or Zoom in-Zoom out
//2nd Parameter is Aspect ratio in this case (800/600 = 4:3)
//3rd Parameter is Near goes near 
//4th Parameter is far



/*
//OrthographicCamera

const aspectRaio = sizes.width / sizes.height

const camera = new THREE.OrthographicCamera(-1*aspectRaio , 1*aspectRaio, 1, -1)
//Parameters are right , left , top , bottom ,near , far 
//The following parameters give perfect aspectratio
*/

//using position we can move using ,y,z axis (z is for towards and away from perspective)
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




//Clock

// const clock = new THREE.Clock() //Starts with Zero after the object is created

//Gsap already has a function like tick so no need to write it in tick function
// gsap.to(mesh.rotation , { duration : 1 , delay : 1 , y :  -Math.PI * 2})
// gsap.to(mesh.rotation , { duration : 1 , delay : 2 , y : Math.PI * 2})


//Controls 
const controls = new OrbitControls(camera , canvas)
controls.enableDamping = true //need to update per frame (in tick function)

//Animations

const tick = () => { //Creating a function for Animation 


    //update camera (we can move our object using mouse)

    // camera.position.x = cursor.x * 15 //15 is for increasing effect
    // camera.position.y = cursor.y * 15 
    // camera.lookAt(mesh.position) //(Gives awesome results)

    //  //(Gives awesome results) WE can use Controls for this also 
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2 ) * 3  //math.pi helps makes only one rotation 
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2 ) * 3 
    // camera.position.y = cursor.y * 10
    // camera.lookAt(mesh.position)

    //Update Controls
    controls.update()

    //render
    renderer.render(scene , camera);    

    window.requestAnimationFrame(tick) // requestAnimationFrame() runs at 60 Frames per Second(FPS)


}

tick()