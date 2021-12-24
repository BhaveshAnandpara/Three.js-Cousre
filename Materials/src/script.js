import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls' //(use it after camera)
import { BufferAttribute, BufferGeometry } from 'three'
import dat from 'dat.gui'


//Gui

const gui = new dat.GUI()




//Textures

const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const colorDoor = textureLoader.load('/door/color.jpg')
const alphaDoor = textureLoader.load('/door/alpha.jpg')
const ambientOcculsionDoor = textureLoader.load('/door/ambientOcclusion.jpg')
const heightDoor = textureLoader.load('/door/height.jpg')
const metalnessDoor = textureLoader.load('/door/metalness.jpg')
const normalDoor = textureLoader.load('/door/normal.jpg')
const roughnessDoor = textureLoader.load('/door/roughness.jpg')

const matcapTexture = textureLoader.load('/matcaps/3.png')

const gradientTexture = textureLoader.load('/gradients/3.jpg')


const enviromentMapTexture = cubeTextureLoader.load(
    [
        '/environmentMaps/2/px.jpg',
        '/environmentMaps/2/nx.jpg',
        '/environmentMaps/2/py.jpg',
        '/environmentMaps/2/ny.jpg',
        '/environmentMaps/2/pz.jpg',
        '/environmentMaps/2/nz.jpg',
    ]
)


const scene = new THREE.Scene()

const sphereGeometry = new THREE.SphereBufferGeometry(0.5 ,64 ,64)
const planeGeometry = new THREE.PlaneBufferGeometry(1 ,1 , 100 ,100)
const torusGeometry = new THREE.TorusBufferGeometry(0.3 , 0.2 ,64   ,120)

//////////////////////////Materials//////////////////////////////

//MeshBAsic Materials

// const material = new THREE.MeshBasicMaterial()
// material.map = normalDoor  //Giving textures to objects
// material.color.set('green') //seting color
// material.wireframe = true

// material.transparent = true //Must be used together
// // material.opacity = 0.5

// material.transparent = true //Must be used together
// material.alphaMap = alphaDoor


//MeshNormalMaterials

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// //MeshMatcapMaterial

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture


// //MeshDepthMaterial

// const material = new THREE.MeshDepthMaterial()

// //MeshLambertMaterial  reacts to light


//Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
const pointLight = new THREE.PointLight(0xffffff , 0.5)
pointLight.position.x = 2 
pointLight.position.y = 3 
pointLight.position.z = 4

scene.add(ambientLight , pointLight)



// const material = new THREE.MeshLambertMaterial()


// //MeshToonMaterial 

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture


// //MeshStandardMaterial 

// const material = new THREE.MeshStandardMaterial()
// // material.roughness = 0.1
// // material.metalness = 0.1
// material.map = colorDoor
// material.aoMap = ambientOcculsionDoor
// material.aoMapIntensity = 1

// material.displacementMap = heightDoor
// material.displacementScale = 0.01 //Create depths

// material.roughnessMap = roughnessDoor
// material.metalnessMap = metalnessDoor

// material.normalMap = normalDoor

// material.transparent = true //COmpulsory for alphamaps
// material.alphaMap = alphaDoor

//  gui.add( material , 'roughness').max(1).min(0.01).step(0.1)
//  gui.add( material , 'metalness').max(1).min(0.1).step(0.1)
//  gui.add( material , 'aoMapIntensity').max(10).min(0.1).step(0.1)
//  gui.add( material , 'displacementScale').max(1).min(0.01).step(0.001)


//Envrokmental Map

const material = new THREE.MeshStandardMaterial()
material.roughness = 0
material.metalness = 0.7
material.envMap = enviromentMapTexture


gui.add( material , 'roughness').max(1).min(0.01).step(0.1)
gui.add( material , 'metalness').max(1).min(0.1).step(0.1)







const sphere = new THREE.Mesh(sphereGeometry , material)
sphere.position.x = -1.5

sphere.geometry.setAttribute('uv2' , new THREE.BufferAttribute(sphere.geometry.attributes.uv.array , 2))

const plane = new THREE.Mesh(planeGeometry , material)

plane.geometry.setAttribute('uv2' , new THREE.BufferAttribute(plane.geometry.attributes.uv.array , 2))

const torus = new THREE.Mesh(torusGeometry , material)
torus.position.x = 1.5

torus.geometry.setAttribute('uv2' , new THREE.BufferAttribute(torus.geometry.attributes.uv.array , 2))


scene.add(sphere , plane , torus)

const sizes = {

    width : window.innerWidth,
    height : window.innerHeight,
}



const camera = new THREE.PerspectiveCamera(75 , (sizes.width / sizes.height) )

camera.position.z = 3 

scene.add(camera)


const  canvas = document.querySelector('.webgl')


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
    
    //Update Objects 

    // sphere.rotation.y = 0.2 * elapsedTime
    // torus.rotation.y = 0.2 * elapsedTime
    // plane.rotation.y = 0.2 * elapsedTime

    // sphere.rotation.x = 0.2 * elapsedTime
    // plane.rotation.x = 0.2 * elapsedTime
    // torus.rotation.x = 0.2 * elapsedTime

    //Update Controls
    controls.update()

    //render
    renderer.render(scene , camera);    

    window.requestAnimationFrame(tick) // requestAnimationFrame() runs at 60 Frames per Second(FPS)


}

tick()