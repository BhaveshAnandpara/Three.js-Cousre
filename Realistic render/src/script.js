import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as dat from 'dat.gui'
import { Mesh, MeshStandardMaterial } from 'three'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
const debugObjects = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Gltf Loader
const gltfLoader = new GLTFLoader()

//Cube Texture Loader
const cubeTextureLoader = new THREE.CubeTextureLoader()

//updateAllMaterials

const updateAllMaterials = ()=>{

    scene.traverse((child) => {

        if( child instanceof Mesh && child.material instanceof MeshStandardMaterial){

            child.material.envMap = environmentMaps
            child.material.envMapIntensity = debugObjects.envMapIntensity
            child.material.needsUpdate = true
            child.castShadow = true
            child.receiveShadow = true

        }
    })
}

// Enviroment Maps
const environmentMaps =  cubeTextureLoader.load([
    '/environmentMaps/0/px.jpg',
    '/environmentMaps/0/nx.jpg',
    '/environmentMaps/0/py.jpg',
    '/environmentMaps/0/ny.jpg',
    '/environmentMaps/0/pz.jpg',
    '/environmentMaps/0/nz.jpg'
])
environmentMaps.encoding = THREE.sRGBEncoding
scene.background = environmentMaps

debugObjects.envMapIntensity = 5
gui.add(debugObjects , 'envMapIntensity').min(0).max(10).step(0.1).name('envMapIntensity').onChange(updateAllMaterials)

// console.log(environmentMaps)


/**
 * Models
 */

//FlightHelmet
/*
gltfLoader.load(
    '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf)=>{

        gltf.scene.scale.set( 10 , 10 ,10)
        gltf.scene.position.set( 0 , -4 ,0)
        gltf.scene.rotation.y = Math.PI * 0.5
        scene.add(gltf.scene)

        gui.add(gltf.scene.rotation , 'y').max(Math.PI).min(-Math.PI).step(0.001).name('ObjectRotation-y')
    
        updateAllMaterials()
    
    }
)
*/

//Hamburger
gltfLoader.load(
    '/models/hamburger.glb',
    (gltf)=>{

        gltf.scene.scale.set( 0.3 , 0.3 , 0.3)
        gltf.scene.position.set( 0 , -4 ,0)
        gltf.scene.rotation.y = Math.PI * 0.5
        scene.add(gltf.scene)

        gui.add(gltf.scene.rotation , 'y').max(Math.PI).min(-Math.PI).step(0.001).name('ObjectRotation-y')
    
        updateAllMaterials()
    
    }
)


/**
 * Lights
 */

const directionalLight = new THREE.DirectionalLight(0xffffff, 6.2)
directionalLight.position.set(0.25, 3, -2.25)
directionalLight.castShadow = true
directionalLight.shadow.camera.far = 15 
directionalLight.shadow.mapSize.set(1024 ,1024)
directionalLight.shadow.normalBias = 0.05 // Whithout it render will show shadow acne // NormalBias for Round Surfaces , Bias for Flat Surfaces
scene.add(directionalLight)

gui.add(directionalLight ,'intensity').max(10).min(-10).step(0.1).name('lightIntensity')
gui.add(directionalLight.position ,'x').max(10).min(-10).step(0.1).name('x')
gui.add(directionalLight.position ,'y').max(10).min(-10).step(0.1).name('y')
gui.add(directionalLight.position ,'z').max(10).min(-10).step(0.1).name('z')

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
camera.position.set(2, 2, 10)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias : true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.physicallyCorrectLights = true //Lights are not physicallyCorrect this make physicallyCorrect
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 3
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

gui.add(renderer , 'toneMapping' , { 
    No : THREE.NoToneMapping, //It will be converted from 0-4 but in string i.e from "0"-"4"
    Linear : THREE.LinearToneMapping,
    Reinhard : THREE.ReinhardToneMapping,
    Cineon : THREE.CineonToneMapping,
    ACESFilmic : THREE.ACESFilmicToneMapping
})
.onFinishChange(
    () => {
        renderer.toneMapping = Number(renderer.toneMapping) //Converts String to Num
        updateAllMaterials()
    }
)


gui.add(renderer , 'toneMappingExposure').max(10).min(1).step(0.01)

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()