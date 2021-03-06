import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import waterVertexShader from './shaders/water/vertex.glsl'
import waterFragmentShader from './shaders/water/fragment.glsl'

// console.log(waterVertexShader);
// console.log(waterFragmentShader);

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
let debugObject = {

}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Geometry
const waterGeometry = new THREE.PlaneBufferGeometry(5, 5, 512, 512)

debugObject.depthColor = '#186691'
debugObject.surfaceColor = '#9bd8ff'

// Material
const waterMaterial = new THREE.ShaderMaterial({
    vertexShader : waterVertexShader,
    fragmentShader : waterFragmentShader,
    uniforms:{
        uTime : { value : 0.0 },

        uBigWavesElevation : { value : 0.2 },
        uBigWavesFrequency : { value : new THREE.Vector2(4 , 1.5) },
        uBigWavesSpeed : { value : 0.75 },

        uSmallWavesElevation : { value : 0.15 },
        uSmallWavesFrequency : { value : 3.0 },
        uSmallWavesSpeed : { value : 0.2 },
        uSmallWavesIterations : { value : 4.0 },

        uDepthColor : { value : new THREE.Color(debugObject.depthColor)} ,
        uSurfaceColor :{  value : new THREE.Color(debugObject.surfaceColor)} ,
        uColorOffset : { value : 0.08},
        uColorMultiplier : { value : 5},

    }
})


// Mesh
const mesh = new THREE.Mesh(waterGeometry, waterMaterial)
mesh.rotation.x = - Math.PI / 2 
scene.add(mesh)

//Debug
gui.add(waterMaterial.uniforms.uBigWavesElevation , 'value').min(0.1).max(5).step(0.001).name('uBigWavesElevation')
gui.add(waterMaterial.uniforms.uBigWavesFrequency.value , 'x').min(0.1).max(10).step(0.001).name('uBigWavesFrequencyX')
gui.add(waterMaterial.uniforms.uBigWavesFrequency.value , 'y').min(0.1).max(10).step(0.001).name('uBigWavesFrequencyY')
gui.add(waterMaterial.uniforms.uBigWavesSpeed , 'value').min(0.1).max(4).step(0.001).name('uBigWavesSpeed')
gui.addColor( debugObject , 'depthColor').name('DepthColor')
    .onChange( () =>{
       waterMaterial.uniforms.uDepthColor.value.set(debugObject.depthColor)
    })
gui.addColor( debugObject , 'surfaceColor').name('SurfaceColor')
    .onChange( () =>{
       waterMaterial.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor)
    })
gui.add(waterMaterial.uniforms.uColorOffset , 'value' ).min(0).max(1).step(0.001).name('ColorOffset')
gui.add(waterMaterial.uniforms.uColorMultiplier , 'value' ).min(0).max(10).step(0.001).name('ColorMultiplier')
gui.add(waterMaterial.uniforms.uSmallWavesElevation , 'value' ).min(0).max(1).step(0.0001).name('uSmallWavesElevation')
gui.add(waterMaterial.uniforms.uSmallWavesFrequency , 'value' ).min(0).max(30).step(0.0001).name('uSmallWavesFrequency')
gui.add(waterMaterial.uniforms.uSmallWavesSpeed , 'value' ).min(0).max(1).step(0.0001).name('uSmallWavesSpeed')
gui.add(waterMaterial.uniforms.uSmallWavesIterations , 'value' ).min(0).max(5).step(0.0001).name('uSmallWavesIterations')

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
camera.position.set(0.25, - 0.25, 1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
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

    //ElapsedTime
    const elapsedTime = clock.getElapsedTime()
    waterMaterial.uniforms.uTime.value = elapsedTime 

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()