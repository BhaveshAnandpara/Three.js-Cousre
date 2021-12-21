import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls' //(use it after camera)




const scene = new THREE.Scene()

// const geometry = new THREE.BoxGeometry(1,1,1)


// const material = new THREE.MeshBasicMaterial({
//     color : 0xE0BBE4 ,
// }); 


// const mesh = new THREE.Mesh(geometry , material)

// scene.add(mesh)

// const axisHelper = new THREE.AxesHelper()
// scene.add(axisHelper)

const sizes = {

    width : window.innerWidth,
    height : window.innerHeight
}

const textureLoader = new THREE.TextureLoader()
const matcapLoader =  textureLoader.load('/textures/matcaps/1.png')

const fontLoader = new THREE.FontLoader() //Loades a Font

fontLoader.load(
    'fonts/helvetiker_regular.typeface.json',
    (font)=>{
        const textGeometry = new THREE.TextBufferGeometry(
        'BHAVESH ANANDPARA',
        {
            font : font,
            size : 0.5 ,
            height : 0.2,
            curveSegments : 12,
            bevelEnabled : true,
            bevelThickness : 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments : 5,
        })


        textGeometry.center()

        // const textMaterial = new THREE.MeshBasicMaterial()
        // textMaterial.wireframe = true

        // const textMaterial = new THREE.MeshMatcapMaterial({matcap : matcapLoader})
        const material = new THREE.MeshMatcapMaterial({matcap : matcapLoader}) //single material for both text and donut

        // const text = new THREE.Mesh(textGeometry , textMaterial)
        const text = new THREE.Mesh(textGeometry , material)
        scene.add(text)

        console.time('donuts') //Start Timer

        const donutGeometry = new THREE.TorusBufferGeometry( 0.3 , 0.2 , 20 ,45)
        // const donutMaterial = new THREE.MeshMatcapMaterial({matcap : matcapLoader}) 


            for(let i = 0; i < 20; i++) {
               
                // const donutGeometry = new THREE.TorusBufferGeometry( 0.3 , 0.2 , 20 ,45)
                // const donutMaterial = new THREE.MeshMatcapMaterial({matcap : matcapLoader}) (Not Optimized repeadtely creates 100 geometry and materials)

                const donut = new THREE.Mesh(donutGeometry  , material)

                donut.position.x = (Math.random() - 0.5) * 5
                donut.position.y = (Math.random() - 0.5) * 5
                donut.position.z = (Math.random() - 0.5) * 5

                donut.rotation.x = Math.random() * Math.PI
                donut.rotation.y = Math.random() * Math.PI

                const scale = Math.random()
                donut.scale.set(scale ,scale ,scale)

                scene.add(donut)


                
            }

            console.timeEnd('donuts') //Ends Timer

    }


)


const camera = new THREE.PerspectiveCamera(70, (sizes.width / sizes.height) ,1 , 1000)

camera.position.z = 3

scene.add(camera)


const  canvas = document.querySelector('.webgl')

const  renderer = new THREE.WebGLRenderer({
    canvas : canvas, 
})
 
renderer.setSize(sizes.width ,sizes.height) 

const controls = new OrbitControls(camera , canvas)
controls.enableDamping = true 


const tick = () => { 


    controls.update()

    //render
    renderer.render(scene , camera);    

    window.requestAnimationFrame(tick)


}

tick()