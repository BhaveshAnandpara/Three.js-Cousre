import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

console.log("Hi")

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
    color : 0xff0000 , //  color : 'red' , color : '#ff0000' ,  also works
}); 


//Mesh
// (Mesh = Geometry + Material)

const mesh = new THREE.Mesh(geometry , material)

scene.add(mesh)

//Camera 
// Camera is like a prespective 


//pre-defined sizes for the window size
const sizes = {

    width : 1200,
    height : 600,
}


const camera = new THREE.PerspectiveCamera(75 , (sizes.width / sizes.height) )
//1st Parameter is Field of View (in degrees) or Zoom in-Zoom out
//2nd Parameter is Aspect ratio in this case (800/600 = 4:3)

//using position we can move using ,y,z axis (z is for towards and away from perspective)
camera.position.z = 3 // used 3 beacuse cube is of 1 unit so got away from cube by 3 units

scene.add(camera)

//Renderer
// Renderer basically shows the scene through Camera that we created (Renderer = Scene + Camera)

const  canvas = document.querySelector('.webgl')
console.log(canvas)

const  renderer = new THREE.WebGLRenderer({
    canvas : canvas,  // Canvas for WEBGL
})
 
renderer.setSize(sizes.width ,sizes.height) //Sets size for the renderer 


//Clock

// const clock = new THREE.Clock() //Starts with Zero after the object is created

//Gsap already has a function like tick so no need to write it in tick function
gsap.to(mesh.position , { duration : 1 , delay : 1 , x : 1})
gsap.to(mesh.position , { duration : 1 , delay : 2 , x : 0})


//Animations

const tick = () => { //Creating a function for Animation 


    //Update time (So that devices with diff Frame rates won't have diff animation speeds)

    // const elaspedTime = clock.getElapsedTime() //gives you exact seconds after clock is runed



    //Update objects
    // mesh.rotation.y += 0.001 //rotates object  by 0.001 every frame 
    // mesh.rotation.y = elaspedTime //Will give same animation speed regarless of device

    /* //Goes Full Circle 
     mesh.position.y = Math.sin(elaspedTime) //Will go up & Down
     mesh.position.x = Math.cos(elaspedTime) //Will sideways
     */

     /* //Camera is moving
     camera.position.y = Math.sin(elaspedTime) //Will go up & Down
     camera.position.x = Math.cos(elaspedTime) //Will sideways
     camera.lookAt(mesh.position) //center is Cube 
     */

     



    //render
    renderer.render(scene , camera);    

    window.requestAnimationFrame(tick) // requestAnimationFrame() runs at 60 Frames per Second(FPS)


}

tick()