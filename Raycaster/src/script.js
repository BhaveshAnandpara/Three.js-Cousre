import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls' //(use it after camera)
import { BufferAttribute, BufferGeometry } from 'three'
import dat from 'dat.gui'



//Gui

const gui = new dat.GUI()

//Scene
const scene = new THREE.Scene()

//Textures

const texturLoader = new THREE.TextureLoader()



//Mesh
const sphere1 = new THREE.Mesh(
    new THREE.SphereBufferGeometry( 0.5 , 32 , 32),
    new THREE.MeshBasicMaterial({color : 0xff0000})
    )

const sphere2 = new THREE.Mesh(
    new THREE.SphereBufferGeometry( 0.5 , 32 , 32),
    new THREE.MeshBasicMaterial({color : 0xff0000})
)
sphere2.position.x = -1.5

const sphere3 = new THREE.Mesh(
    new THREE.SphereBufferGeometry( 0.5 , 32 , 32),
    new THREE.MeshBasicMaterial({color : 0xff0000})
)
sphere3.position.x = 1.5

scene.add(sphere1 , sphere2 , sphere3)



/**
 * raycaster
 */

const raycaster = new THREE.Raycaster()

/* //Without Animation

const rayOrigin = new THREE.Vector3( -3 , 0 , 0)


const rayDirection = new THREE.Vector3(10 ,0 , 0)
console.log(rayDirection.length());

rayDirection.normalize() //Convert Vector 3 to Unit Vector But follows the direction of raycaster
console.log(rayDirection.length());

raycaster.set(rayOrigin ,rayDirection )

const intersect = raycaster.intersectObject(sphere2) //Show intersecting OBJECT
console.log(intersect);

const intersects =  raycaster.intersectObjects([sphere1 ,sphere2 , sphere3]) //Show intersecting OBJECTS
console.log(intersects);
*/


/**
 * Mouse
 */

const mouse = new THREE.Vector2() //Because Mouse move gives us X and Y cordinates

window.addEventListener('mousemove' , (event)=> {

    // console.log("It works")

    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1
    // console.log(mouse.x , mouse.y)

    //Go to Tick

})

window.addEventListener('click' , ()=>{

    if(curentIntersect){

        if(curentIntersect.object == sphere1)
            console.log('click on a sphere1')

        else if(curentIntersect.object == sphere2)
            console.log('click on a sphere2')

        else if(curentIntersect.object == sphere3)
            console.log('click on a sphere3')
    }

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

let curentIntersect = null

//Animations

const tick = () => { //Creating a function for Animation 


    const elapsedTime = clock.getElapsedTime()

    //Update Objects

 //Animating Objects

    sphere1.position.y = Math.sin(elapsedTime * 0.8) * 1.5
    sphere2.position.y = Math.sin(elapsedTime* 0.3) * 1.5
    sphere3.position.y = Math.sin(elapsedTime* 1.4) * 1.5
  
    /* 
    const rayOrigin = new THREE.Vector3(-3 , 0 , 0)
    const rayDirection = new THREE.Vector3( 1, 0 , 0)
    rayDirection.normalize()

    raycaster.set(rayOrigin , rayDirection)

    const Objects = [sphere1 ,sphere2 , sphere3]

    const intersects = raycaster.intersectObjects(Objects)
    // console.log(intersects.length);

    for(const object of Objects){

       object.material.color.set(0xff0000)

    }


    for(const intersect of intersects){
        
       intersect.object.material.color.set(0x0000ff)
    }
    
*/

  /*  //On Mousemove

    raycaster.setFromCamera(mouse , camera)

    const Objects = [sphere1 ,sphere2 , sphere3]

    const intersects = raycaster.intersectObjects(Objects)

    for(const object of Objects){

       object.material.color.set(0xff0000)

    }

    for(const intersect of intersects){
        
        // console.log( intersect)
       intersect.object.material.color.set(0x0000ff)

    }

    */

    //When mouse enter and Leaves

    raycaster.setFromCamera(mouse , camera)

    const Objects = [sphere1 ,sphere2 , sphere3]

    const intersects = raycaster.intersectObjects(Objects)

    for(const object of Objects){

       object.material.color.set(0xff0000)

    }

    for(const intersect of intersects){
        
        // console.log( intersect)
       intersect.object.material.color.set(0x0000ff)

    }
    
    // console.log(intersects.length)
    if(intersects.length){

        if(curentIntersect == null)
            console.log('mouse enter')

        curentIntersect = intersects[0]

    }
        

    else{

        // console.log('nothings here')

        if(curentIntersect)
            console.log('mouse leave')

        curentIntersect = null


    }


    //Update Controls
    controls.update()


    //render
    renderer.render(scene , camera);    

    window.requestAnimationFrame(tick) // requestAnimationFrame() runs at 60 Frames per Second(FPS)


}

tick()

