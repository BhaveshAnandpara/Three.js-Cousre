import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls' //(use it after camera)
import dat from 'dat.gui'
import CANNON from 'cannon'

console.log(CANNON);


/**
 * Sound
 */

const hitSound = new Audio('/sounds/hit.mp3')

const playSound = (collision) => {

    // console.log(collision.contact.getImpactVelocityAlongNormal())

    const impactStrength = collision.contact.getImpactVelocityAlongNormal() 

    if(impactStrength > 4){
        
            hitSound.volume = Math.random()
            hitSound.currentTime = 0
            hitSound.play()

    }

}


/**
 * Textures
 */
 const textureLoader = new THREE.TextureLoader()
 const cubeTextureLoader = new THREE.CubeTextureLoader()
 
 const environmentMapTexture = cubeTextureLoader.load([
    '/environmentMaps/0/px.jpg',
    '/environmentMaps/0/nx.jpg',
    '/environmentMaps/0/py.jpg',
    '/environmentMaps/0/ny.jpg',
    '/environmentMaps/0/pz.jpg',
    '/environmentMaps/0/nz.jpg'
])
 
//Gui

const gui = new dat.GUI()

const debugObject = {}

//For Sphere

debugObject.createSphere = ()=>{

    createSphere(
        Math.random() ,
        {
            x : (Math.random() - 0.5) * 7 ,
            y : 3 ,
            z : (Math.random() - 0.5) * 7}
        )

}

//For BOx

debugObject.createBox = ()=>{

    createBox(
        Math.random() * 2 ,
        Math.random() * 2 ,
        Math.random() * 2 ,
        {
            x : (Math.random() - 0.5) * 7 ,
            y : 3 ,
            z : (Math.random() - 0.5) * 7}
        )

}

debugObject.reset = ()=>{

    
    for(const object of updateObject){

    //Remove Body
//    object.body.removeEventListner('collide' , playSound)
   world.removeBody(object.body)

   //REmove Mesh
   scene.remove(object.mesh) 

    }
}

gui.add(debugObject , 'createSphere')
gui.add(debugObject , 'createBox')
gui.add(debugObject , 'reset')

//Scene
const scene = new THREE.Scene()



//Physics World

const world = new CANNON.World() 
world.broadphase = new CANNON.SAPBroadphase(world) //Better for Performances
world.allowSleep = true //Boost Performance
world.gravity.set( 0 , -9.82 ,0) //Gravity

//Material

/* Hard way
const concreteMaterial = new CANNON.Material('conrete')
const plasticeMaterial = new CANNON.Material('plastic')

const concreteMaterialContactMaterial = new CANNON.ContactMaterial(
    concreteMaterial,
    plasticeMaterial,
    { // What happen when two material collides
        friction : 0.1 ,
        restitution: 0.7
    }
)

world.addContactMaterial(concreteMaterialContactMaterial)
*/

const defaultMaterial = new CANNON.Material('default')


const defaultMaterialContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    { // What happen when two material collides
        friction : 0.1 ,
        restitution: 0.7
    }
)

world.addContactMaterial(defaultMaterialContactMaterial)
world.defaultContactMaterial = defaultMaterialContactMaterial

/*
//Sphere

const sphereShape = new CANNON.Sphere(0.5) // Radius Just Like Geometry in THREE.js
const sphereBody = new CANNON.Body({ //Just like Material in THREE.js
    mass : 1 ,
    position : new CANNON.Vec3(0 , 3 , 0), //POsition is Vector 3 in Cannon\
    shape : sphereShape,
    // material : plasticeMaterial
})

sphereBody.applyForce( new CANNON.Vec3(150 , 0 , 0 ) , new CANNON.Vec3(0 , 0 , 0 ))
//1st - power of force
//2nd - where to apply force

world.addBody(sphereBody) //Just like adding mesh to scene
*/


//Floor
const floorShape = new CANNON.Plane()
const floorBody = new CANNON.Body() //By default plane is vertical so need to rotate
// floorBody.material = concreteMaterial
floorBody.mass = 0 
floorBody.addShape(floorShape)
floorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3( -1 , 0 , 0), //Defines side for an axis Right now axis is passing through X Axis
    Math.PI / 2
)

world.addBody(floorBody) 



//THREE.js World

//Plane
const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(30 , 30),
    new THREE.MeshStandardMaterial({
    })
)

floor.rotation.x = - (Math.PI / 2 )

scene.add(floor)

/*
//Sphere
const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.3 , 16 , 16),
    new THREE.MeshStandardMaterial()
)

sphere.position.y = 0.3

scene.add(sphere)
*/


//Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const directionalLIght = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLIght.position.set(2 , 1.5, 0)
scene.add(directionalLIght)


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

camera.position.z =  8
camera.position.y = 0.5 
 


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
let oldElapsedTime = 0




//UTILS

const updateObject = []

//For Spheres

const sphereGeometry =  new THREE.SphereBufferGeometry(1 , 16 ,16)
const material =  new THREE.MeshStandardMaterial({
    metalness : 0.3,
    roughness : 0.7,
    envMap : environmentMapTexture
})

const createSphere = (radius , position) =>{

    //Three.js Mesh

    const mesh = new THREE.Mesh(sphereGeometry,  material)
    mesh.scale.set(radius , radius , radius) //geometry radius  is set as 1 outside so we are just scaling according to radius

    mesh.position.copy(position)
    scene.add(mesh)

    //Cannon.js

    const shape = new CANNON.Sphere()
    const body = new CANNON.Body({
        mass : 1 ,
        position : new CANNON.Vec3(0 ,5 , 0),
        shape : shape,
        material : defaultMaterial
    })
    body.position.copy(position)
    world.addBody(body)

    //UPdate Objects

    updateObject.push({
        mesh : mesh,
        body:body
    })

}

createSphere(0.5 , { x: 0 , y : 5 , z : 0})


//For Boxes

const boxGeometry =  new THREE.BoxBufferGeometry(1 ,1 , 1)


const createBox = (width , height , depth , position) =>{

    //Three.js Mesh

    const box = new THREE.Mesh(boxGeometry,  material)
    box.scale.set(width , height , depth) //geometry radius  is set as 1 outside so we are just scaling according to radius
    box.position.copy(position)
    scene.add(box)

    //Cannon.js

    const boxShape = new CANNON.Box(new CANNON.Vec3(width / 2 , height / 2 , depth / 2))
    const boxBody = new CANNON.Body({
        mass : 1 ,
        position : new CANNON.Vec3(0 ,5 , 0),
        shape : boxShape,
        material : defaultMaterial
    })
    boxBody.position.copy(position)
    boxBody.addEventListener('collide' , playSound)
    world.addBody(boxBody)

    //UPdate Objects

    updateObject.push({
        mesh : box,
        body: boxBody
    })

}

createBox (1 ,1 , 1 , { x: 0 , y : 5 , z : 0})





//Animations

const tick = () => { //Creating a function for Animation 


    const elapsedTime = clock.getElapsedTime()

    //delta time to find time passed since last Tick Function 
    const deltaTime = elapsedTime - oldElapsedTime 
    oldElapsedTime = elapsedTime 



    //upadte Physics World

    world.step( 1/60 , deltaTime , 3)
    // 1st - Fixed Time Step ( 1 / 60 - for 60fps )
    // 2st - How Much time passed since last step
    // 3rd - How Much itertions world can apply to catch up with delays

    // sphereBody.applyForce( new CANNON.Vec3(-0.5 , 0 , 0 ) , sphereBody.position) //Gives like wind has puched the sphere

    for(const object of updateObject){
        object.mesh.position.copy(object.body.position)
        object.mesh.quaternion.copy(object.body.quaternion)
    }




    //UPdate Three.js World

    // sphere.position.copy(sphereBody.position) //Same as Below THree lines

    // sphere.position.x = sphereBody.position.x
    // sphere.position.y = sphereBody.position.y
    // sphere.position.z = sphereBody.position.z
   
    
    //Update Controls
    controls.update()


    //render
    renderer.render(scene , camera);    

    window.requestAnimationFrame(tick) // requestAnimationFrame() runs at 60 Frames per Second(FPS)


}

tick()

