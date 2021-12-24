import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls' //(use it after camera)
import { BufferAttribute, BufferGeometry, MeshBasicMaterial, PCFSoftShadowMap, PointLight } from 'three'
import dat from 'dat.gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'




/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader()
let bakedShadow = textureLoader.load('/textures/bakedShadow.jpg')
let simpleShadow = textureLoader.load('/textures/simpleShadow.jpg')



//Gui

const gui = new dat.GUI()


const scene = new THREE.Scene()

/**
 * Light
 */

const ambientLight = new THREE.AmbientLight('#fff' , 0.4)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#fff' , 0.5)
directionalLight.position.set(2 , 2 ,-1)

const spotLight = new THREE.SpotLight('#ffffff' , 0.4 , 10 , Math.PI * 0.3)
spotLight.position.set(0 , 2 ,2 )

const pointLight = new THREE.PointLight('#ffffff' , 0.4)
pointLight.position.set(-1 , 1, 0)

/**
 * Directional Lights shadow

directionalLight.castShadow = true

//to Improve Optimizations

directionalLight.shadow.mapSize.width = 1024  //Lower the No. More Pixelated
directionalLight.shadow.mapSize.height = 1024

directionalLight.shadow.camera.near = 1 
directionalLight.shadow.camera.far = 6 //By Default Far is infinte hence not optimised 

//Its Optimised but Still camera Area is too large for only sphere so if we can smaller it , it will be more optimised

directionalLight.shadow.camera.top = 2 
directionalLight.shadow.camera.right = 2 
directionalLight.shadow.camera.bottom = -2 
directionalLight.shadow.camera.left = -2 

// directionalLight.shadow.radius = 20 //Blurs Shadow


const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(directionalLightCameraHelper)

scene.add(directionalLight)
*/


/**
 * Spot Lights



spotLight.castShadow = true

spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024
spotLight.shadow.camera.near = 1 
spotLight.shadow.camera.far = 6
spotLight.shadow.camera.fov = 30

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
scene.add(spotLightCameraHelper)
scene.add(spotLight)
*/


/**
 * PointLight


pointLight.castShadow = true

pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024
pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 2



const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
scene.add(pointLightCameraHelper)

*/
scene.add(pointLight)




/**
 * Geometries
 */

const planeData = { //For debugging Purpose
    height : 4, 
    width : 5
}

const sphereGeometry = new THREE.SphereBufferGeometry(0.5 ,64 ,64)
const planeGeometry = new THREE.PlaneBufferGeometry(planeData.width ,planeData.height )



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
sphere.castShadow = true

const plane = new THREE.Mesh(
    planeGeometry ,

    // new MeshBasicMaterial({
    //     map : bakedShadow //Baked Shadow
    // })

    material

     )

plane.position.y = -.5
plane.rotation.x = - Math.PI / 2

plane.receiveShadow = true

gui.add( planeData, 'width').max(5).min(1).step(1).onChange(regeneratePlaneGeometry)
gui.add( planeData, 'height').max(5).min(1).step(1).onChange(regeneratePlaneGeometry)

scene.add(sphere , plane)


const sphereShadow = new THREE.Mesh(

    new THREE.PlaneBufferGeometry(2 , 2),
    new THREE.MeshBasicMaterial({
        color : '#000',
        transparent : true,
        alphaMap : simpleShadow //Shows White area makes transparent the black area
    })

)

sphereShadow.rotation.x = - Math.PI / 2 
// sphereShadow.position.y = plane.position.y //Z Fighting (Thee.js is confused which is above and below as both are at same distance)
sphereShadow.position.y = plane.position.y + 0.01 

scene.add(sphereShadow)



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

renderer.shadowMap.enabled = true //Enables shadows

renderer.shadowMap.type = PCFSoftShadowMap //Default is PCFShadowMap 
//Radius Doesn't works on PCFSoftShadowMap


//Controls 
const controls = new OrbitControls(camera , canvas)
controls.enableDamping = true //need to update per frame (in tick function)

//Clock 

const clock = new THREE.Clock()

//Animations

const tick = () => { //Creating a function for Animation 


    const elapsedTime = clock.getElapsedTime()

    //Update Sphere

    sphere.position.x = Math.sin(elapsedTime)
    sphere.position.z = Math.cos(elapsedTime)
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3)) //If Negative sphere goes below plane
    
    //Updtae Shadow

    sphereShadow.position.x = sphere.position.x
    sphereShadow.position.z = sphere.position.z

    sphereShadow.material.opacity = (1 - sphere.position.y) * 0.8 //sphere.position.y ranges from 0-1
    sphereShadow.scale.set(0.7 , 0.7)

    //Update Controls
    controls.update()


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
