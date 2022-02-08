import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as dat from 'dat.gui'
import { Mesh, MeshStandardMaterial } from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

//Texture
const textureLoader = new THREE.TextureLoader()
const flag = textureLoader.load('/textures/flag-india.jpg')

// Scene
const scene = new THREE.Scene()

//Geometry
const geometry = new THREE.PlaneBufferGeometry( 1, 1 ,16 ,16)

const count = geometry.attributes.position.count // Gives no. of vertexes in geometry
const randoms = new Float32Array(count)

for(let i = 0 ; i < count ; i++){
    randoms[i] = Math.random()
}

geometry.setAttribute('aRandom' , new THREE.BufferAttribute(randoms , 1))

console.log(geometry)

//Material
const material = new THREE.RawShaderMaterial({
    vertexShader : vertexShader,
    fragmentShader : fragmentShader,
    side : THREE.DoubleSide,
    uniforms : { 
        uFrequency : { value : new THREE.Vector2(8.8 , 1.9)},
        uTime : { value : 0 },
        uColor : { value : new THREE.Color('orange')},
        uTexture : { value : flag },
    }

})

gui.add(material.uniforms.uFrequency.value , 'x').max(20).min(0).step(0.1).name('frequencyX')
gui.add(material.uniforms.uFrequency.value , 'y').max(20).min(0).step(0.1).name('frequencyY')

//Mesh
const mesh = new THREE.Mesh(
    geometry,
    material
)
mesh.position.y = 1
mesh.scale.y = 2/3
scene.add(mesh)

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
camera.position.set(0.25, - 0.25, 2)
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


/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //Update uTime
    material.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()