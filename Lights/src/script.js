import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls' //(use it after camera)
import { BufferAttribute, BufferGeometry } from 'three'
import dat from 'dat.gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'


//Gui

const gui = new dat.GUI()


const scene = new THREE.Scene()

/**
 * Lights
 * 
 * Minimal cost
 * - Ambient Light
 * - Hemisphere Light
 * 
 * 
 * Moderate cost
 * - Directional Light
 * - Point Light
 * 
 * 
 * High Cost
 * - Spot Light
 * - RectArea Light
 * 
 * 
 */

const ambientLight = new THREE.AmbientLight('#fff' , 0.5)
// scene.add(ambientLight)

const directionalLIght = new THREE.DirectionalLight('#00fffc' , 0.5)
directionalLIght.position.set(1 , 0.25 , 0)
scene.add(directionalLIght)

const hemisphereLight = new THREE.HemisphereLight('#f00' , '#00f' , 0.3)
scene.add(hemisphereLight)

const pointLight = new THREE.PointLight('#ff9000' , 0.8 , 10 , 2)
pointLight.position.set(0 , -0.5 , 0)
scene.add(pointLight)

const rectlight = new THREE.RectAreaLight('#4e00ff' , 2, 1 , 2)
rectlight.position.set(-1.5 , 0 , 1.5)
rectlight.lookAt(new THREE.Vector3()) // Now Light is looking at (0 ,0 , 0) i.e Center bcoz THREE.Vector3() gives 0  , 0 , 0
scene.add(rectlight)

const spotLight = new THREE.SpotLight('#78ff00' , 4 , 10  , Math.PI *0.1 , 1 , 1)
spotLight.position.set(0, 2 , 3 )
scene.add(spotLight)

spotLight.target.position.x = -0.75
scene.add(spotLight.target)



//Helpers

const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight , 0.4)
scene.add(hemisphereLightHelper)

const directionalLIghtHelper = new THREE.DirectionalLightHelper(directionalLIght , 0.4)
scene.add(directionalLIghtHelper)

const pointLIghtHelper = new THREE.PointLightHelper(pointLight , 0.2)
scene.add(pointLIghtHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)

//Do not show Targeted spot without this function
window.requestAnimationFrame(
    ()=>{
        spotLightHelper.update()
    }
)


const rectAreaLightHelper = new RectAreaLightHelper(rectlight)
scene.add(rectAreaLightHelper)





/**
 * Geometries
 */

const planeData = { //For debugging Purpose
    height : 4, 
    width : 5
}

const sphereGeometry = new THREE.SphereBufferGeometry(0.5 ,64 ,64)
const planeGeometry = new THREE.PlaneBufferGeometry(planeData.width ,planeData.height )
const torusGeometry = new THREE.TorusBufferGeometry(0.3 , 0.2 ,64   ,120)
const cubeGeometry = new THREE.BoxBufferGeometry(0.8)

/**
 * Material
 */

const material = new THREE.MeshStandardMaterial()
material.roughness = 0


gui.add( material , 'roughness').max(1).min(0.01).step(0.1)

/**
 * Mesh
 */

const sphere = new THREE.Mesh(sphereGeometry , material)

const plane = new THREE.Mesh(planeGeometry , material)
plane.position.y = -1.5
plane.rotation.x = - Math.PI / 2
gui.add( planeData, 'width').max(5).min(1).step(1).onChange(regeneratePlaneGeometry)
gui.add( planeData, 'height').max(5).min(1).step(1).onChange(regeneratePlaneGeometry)

const torus = new THREE.Mesh(torusGeometry , material)
torus.position.x = - 1.5

const cube = new THREE.Mesh(cubeGeometry , material)
cube.position.x = 1.5

scene.add(sphere , plane , torus , cube)






const sizes = {

    width : window.innerWidth,
    height : window.innerHeight,
}


/**
 * Camera
 */


const camera = new THREE.PerspectiveCamera(75 , (sizes.width / sizes.height) )

camera.position.z = 3 

scene.add(camera)




const  canvas = document.querySelector('.webgl')
console.log(canvas)


const  renderer = new THREE.WebGLRenderer({
    canvas : canvas,  // Canvas for WEBGL
})
 
renderer.setSize(sizes.width ,sizes.height) //Sets size for the renderer 


//Controls 
const controls = new OrbitControls(camera , canvas)
controls.enableDamping = true //need to update per frame (in tick function)

//Clock 

const clock = new THREE.Clock()

//Animations

const tick = () => { //Creating a function for Animation 


    const elapsedTime = clock.getElapsedTime()
    
    //Update Controls
    controls.update()

    cube.rotation.x =+ elapsedTime * 0.5
    cube.rotation.y =+ elapsedTime * 0.2

    sphere.rotation.x =+ elapsedTime * 0.5
    sphere.rotation.y =+ elapsedTime * 0.2

    torus.rotation.x =+ elapsedTime * 0.5
    torus.rotation.y =+ elapsedTime * 0.2

    

    //render
    renderer.render(scene , camera);    

    window.requestAnimationFrame(tick) // requestAnimationFrame() runs at 60 Frames per Second(FPS)


}

tick()


function regeneratePlaneGeometry() {
    let newGeometry = new THREE.PlaneBufferGeometry(
        planeData.width , planeData.height
    )
    plane.geometry.dispose() //Dispose Geometry 
    plane.geometry = newGeometry
}
