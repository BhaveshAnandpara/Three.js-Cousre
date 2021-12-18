import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls' //(use it after camera)
import * as dat from 'dat.gui'


//Textures

//Create LoadingManager so that we can now if image loaded or not
const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {console.log('OnStart');}
loadingManager.onLoaded = () => {console.log('onLoaded');}
loadingManager.onProgress = () => {console.log('onProgress');}
loadingManager.onError = () => {console.log('onError');}


//NOt recommended method

// const image = new Image() //create a image object
// const texture = new THREE.Texture(image) //we cannot use image directly make it to textures

// image.onload = () =>{  //Onloading , this functionwill run

//     texture.needsUpdate = true 
    
// }

// image.src = '/textures/door/color.jpg'//Imag source

//Recommended Method
/*
const textureLoader = new THREE.TextureLoader(loadingManager)

const texture = textureLoader.load('/textures/door/color.jpg')
*/

const textureLoader = new THREE.TextureLoader(loadingManager)

const colortexture = textureLoader.load('/textures/door/color.jpg')
/*

const alphatexture = textureLoader.load('/textures/door/alpha.jpg')

const ambientOcclusiontexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')

const heighttexture = textureLoader.load('/textures/door/height.jpg')

const metalnesstexture = textureLoader.load('/textures/door/metalness.jpg')

const normaltexture = textureLoader.load('/textures/door/normal.jpg')

const roughnesstexture = textureLoader.load('/textures/door/roughness.jpg')

*/

// colortexture.offset.x = .5 //Moves the texture (i.e Image by 0.5)

// colortexture.rotation = Math.PI /4 //Rotates image at 45 angle from end vertex

colortexture.center.x = 0.5 
colortexture.center.y = 0.5 //makes the pivot point to center

colortexture.rotation = Math.PI /4 //Rotates image at 45 angle from centers


//Scene
//Scene is like a Container for our render or object (e.g like a Movie set)

const scene = new THREE.Scene()


//Debug

const gui = new dat.GUI({width : 400})


// const gui = new dat.GUI()
gui.hide() //hides console

const parameters = {
    color : 0xa77ed7,

    spin : () =>{
        // gsap.to(mesh.rotation, {duration : 1 , y : 10}) //Will rotate only once
        gsap.to(mesh.rotation, {duration : 1 , y : mesh.rotation.y +  10})
    }

}

gui.addColor(parameters , 'color').onChange(() => {

    material.color.set(parameters.color)

})

gui.add(parameters , 'spin')

//RED Cube

//Geometry
// Geometry is a Shape of an Object or Render (e.g CUBE , SPHERE)

const geometry = new THREE.BoxGeometry(1,1,1)


//Material
// Material is just a Skin of object or render

const material = new THREE.MeshBasicMaterial({
    map : colortexture
}); 


//Mesh
// (Mesh = Geometry + Material)

const mesh = new THREE.Mesh(geometry , material)

scene.add(mesh)

//debug

// gui.add(mesh.position , 'y' ,  -3  , 3 , 0.01)
//1st : property name
//2nd : property type
//3rd minimum
//4rd maximum
//5th precesion 

gui.add(mesh.position , 'y' ).min(-3).max(3).step(0.01)
gui.add(mesh , 'visible') //Can hide or show
gui.add(material , 'wireframe')



//rezise function

window.addEventListener('resize' , () => {

    sizes.width = window.innerWidth,
   sizes.height = window.innerHeight,

   camera.aspect = sizes.width / sizes.height,
   camera.updateProjectionMatrix()

   renderer.setSize(sizes.width ,sizes.height) //Sets size for the renderer 

})



//pre-defined sizes for the window size
const sizes = {

    width : window.innerWidth,
    height : window.innerHeight,
}

//Cameras


//PerspectiveCamera

const camera = new THREE.PerspectiveCamera(70, (sizes.width / sizes.height) ,1 , 1000)




//using position we can move using ,y,z axis (z is for towards and away from perspective)
camera.position.z = 3// used 3 beacuse cube is of 1 unit so got away from cube by 3 units 
// camera.lookAt(mesh.position)
scene.add(camera)





//Renderer
// Renderer basically shows the scene through Camera that we created (Renderer = Scene + Camera)

const  canvas = document.querySelector('.webgl')

const  renderer = new THREE.WebGLRenderer({
    canvas : canvas,  // Canvas for WEBGL
})
 
renderer.setSize(sizes.width ,sizes.height) //Sets size for the renderer 




//Controls 
const controls = new OrbitControls(camera , canvas)
controls.enableDamping = true //need to update per frame (in tick function)

//Animations

const tick = () => { //Creating a function for Animation 

    //Update Controls
    controls.update()

    //render
    renderer.render(scene , camera);    

    window.requestAnimationFrame(tick) // requestAnimationFrame() runs at 60 Frames per Second(FPS)


}

tick()