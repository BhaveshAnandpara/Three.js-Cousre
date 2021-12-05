import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//loading // Step 7 : Create this block
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/textures/NormalMap.png')

// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry =  new THREE.SphereBufferGeometry(.5 , 64 ,64); //Step 1 Craeted a SphereBufferGeometry object

// Materials

const material = new THREE.MeshStandardMaterial() //Step 2 : Created a MeshStandardMaterial object
material.roughness = 0.2 // Step 3 : declared some variables from the class
material.metalness = 0.7// Step 3 
material.normalMap = normalTexture // Step 8 
material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights 1

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


// Lights 2
//Step 9 Crewating another light
const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.x = 1.52
pointLight2.position.y = 1.02
pointLight2.position.z = 1

pointLight2.intensity = 0.85

scene.add(pointLight2)

// const light1 = gui.addFolder('Light1') //Step 12 Create a Folder on Console

// //Step 10 Add Values to console
// light1.add(pointLight2.position , 'x').min(-6).max(6).step(0.01) 
// light1.add(pointLight2.position , 'y').min(-3).max(3).step(0.01)
// light1.add(pointLight2.position , 'z').min(-3).max(3).step(0.01)
// light1.add(pointLight2 , 'intensity').min(0).max(10).step(0.01)

// const pointLightHelper = new THREE.PointLightHelper(pointLight2 , 1)
// scene.add(pointLightHelper)


//Step 11 Create another light
// Lights 3
const pointLight3 = new THREE.PointLight(0x00ff00, 2)
pointLight3.position.x = -1.25
pointLight3.position.y = -1.55
pointLight3.position.z = -0.06

pointLight3.intensity = 1.81

scene.add(pointLight3)
// const light2 = gui.addFolder('Light2')

// light2.add(pointLight3.position , 'x').min(-6).max(6).step(0.01) 
// light2.add(pointLight3.position , 'y').min(-3).max(3).step(0.01)
// light2.add(pointLight3.position , 'z').min(-3).max(3).step(0.01)
// light2.add(pointLight3 , 'intensity').min(0).max(10).step(0.01)

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3 , 1)
// scene.add(pointLightHelper2)


//Step 13 Create a Color Variable 
const light2Color = {

    color : 0x000000
    
}

//Step 14 Add Color to Console
// light2.addColor(light2Color  , 'color').onChange(()=>{

//     pointLight3.color.set(light2Color.color)

// })




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha : true  // Step 4 : Aplaha:True makes background : none , Step 5 is in Css
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

//Step 15 Add Some basic Dom js

document.addEventListener('mousemove' , onDocumentMouseMove)

let mouseX = 0 
let mouseY = 0 

let targetX = 0 
let targetY = 0 

const windowX = window.innerWidth / 2 ;
const windowY = window.innerHeight / 2 ;

function onDocumentMouseMove(event){

    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)

}


const clock = new THREE.Clock()

const tick = () =>
{

    // //Step 16
    targetX = mouseX * 0.001 
    targetY = mouseY * 0.001 

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // //Step 17

    sphere.rotation.x += .2 * (targetY - sphere.rotation.x)
    sphere.rotation.y += .2 * (targetX - sphere.rotation.y)
    sphere.rotation.z += -.2 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()