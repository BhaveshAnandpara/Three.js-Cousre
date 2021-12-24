import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls' //(use it after camera)
import { BufferAttribute, BufferGeometry } from 'three'
import dat from 'dat.gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'


//Gui

const gui = new dat.GUI()

//Scene
const scene = new THREE.Scene()

//Textures

const texturLoader = new THREE.TextureLoader()

const star = texturLoader.load('textures/particles/2.png')




//Sphere PArticles

// //geometry 
// const particalGeometry = new THREE.SphereBufferGeometry( 1, 16, 16)

//Material
// const particleMaterial = new THREE.PointsMaterial({
    //     size : 0.02,
//     sizeAttenuation : true //Gives perspective small if far and big if near
// })    

// //Particals

// const particle = new THREE.Points(particalGeometry, particleMaterial)
// scene.add(particle)




//Customs Geometry

const particalGeometry = new THREE.BufferGeometry()
const count = 20000

const positions = new Float32Array(count * 3) //Count * 3 because there is x  ,y, ,z to a single particle
const colors = new Float32Array(count * 3)  

for(let i = 0 ; i < count *3 ; i++){
    positions[i] = (Math.random() - 0.5) * 10
    colors[i] = Math.random()
}

particalGeometry.setAttribute(
    'position', 
    new THREE.BufferAttribute(positions , 3)
)

particalGeometry.setAttribute(
    'color', 
    new THREE.BufferAttribute(colors , 3)
)

//Material
const particleMaterial = new THREE.PointsMaterial({
    size : 0.1,
    sizeAttenuation : true, //Gives perspective small if far and big if near
    // color : 0xff88cc, //hide so other colors won't be impacted
    transparent : true,
    alphaMap : star, //shows black edges from image 
    // alphaTest : 0.001 //Basically Telling renderer to not render the black part of image
    // depthTest : false, //Basically says donot render which is forward and which is behind solves issue but not good when there is an object
    depthWrite : false, //THis solves all our Issues
    blending : THREE.AdditiveBlending, //Glows if there is particle over another ,
    vertexColors : true //Whithout it wont change colors


    
 
})   

//Particals

const particle = new THREE.Points(particalGeometry, particleMaterial)
scene.add(particle)

// //Cube

// const square = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(1 , 1 , 1),
//     new THREE.MeshBasicMaterial()
// )
// scene.add(square)


/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff , 0.5)
scene.add(ambientLight)
//rezise function

window.addEventListener('resize' , () => {

    sizes.width = window.innerWidth,
   sizes.height = window.innerHeight,

   camera.aspect = sizes.width / sizes.height,
   camera.updateProjectionMatrix()

   renderer.setSize(sizes.width ,sizes.height) //Sets size for the renderer 

})



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

    //UPdate Particles

    //All Particles
    // particle.position.y = - elapsedTime * 0.02 

    //By Single Particle (Very BAd for performance as we are using it to change position for every particle)

    for(let i = 0 ; i < count ; i ++){

        const n = i * 3 //So that it can access direct x position of every particle -- xyz xyz xyz so that it can jump every 3 elements

        const x = particalGeometry.attributes.position.array[n]
        particalGeometry.attributes.position.array[n + 1] = Math.sin(elapsedTime + x) //n + 1 will access y 

    }

    particalGeometry.attributes.position.needsUpdate = true //to update attributes
    
    //Update Controls
    controls.update()


    //render
    renderer.render(scene , camera);    

    window.requestAnimationFrame(tick) // requestAnimationFrame() runs at 60 Frames per Second(FPS)


}

tick()

