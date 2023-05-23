import * as THREE from 'three';

import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



const loader = new GLTFLoader();
// setup renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// setup camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000);

//const width = window.innerWidth
//const height = window.innerHeight

//const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );

const controls = new OrbitControls( camera, renderer.domElement );

camera.position.set( 50, 50, 50 );
camera.lookAt( 0, 0, 0 );
controls.update();

// create the scene
const scene = new THREE.Scene();
//scene.background = new THREE.Color(0xffffff);

// create a cube 
const box_geometry = new THREE.BoxGeometry( 10, 10, 10 );
const boxMaterial = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( box_geometry, boxMaterial );
scene.add( cube );

// create the lines
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 }); 
const points = [];
points.push( new THREE.Vector3(-10, 0, 0));
points.push( new THREE.Vector3(0, 10, 0));
points.push( new THREE.Vector3(10, 0, 0));

const line_geometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(line_geometry, lineMaterial)
scene.add( line );


// add light

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
scene.add( ambientLight );

const dirLight = new THREE.DirectionalLight( 0xefefff, 1.5 );
dirLight.position.set( 10, 10, 10 );
scene.add( dirLight );

const pointLight = new THREE.PointLight(0xffffff, 0.3)
pointLight.position.set(200, 200, 200)
scene.add( pointLight) 

// import a module
var moduleobject;
loader.load( '/delonghi_kettle/scene.gltf', function ( gltf ) {
    moduleobject = gltf.scene;
	gltf.scene.scale.set( 100, 100, 100 );			   
	gltf.scene.position.x = 20;				    //Position (x = right+ left-) 
    gltf.scene.position.y = 0;				    //Position (y = up+, down-)
	gltf.scene.position.z = 0;				    //Position (z = front +, back-)
	//gltf.scene.rotation.x = 1;

	scene.add( moduleobject );

    console.log("load the gltf file");


}, undefined, function ( error ) {

	console.error( error );

} );


//camera.position.z = 5;
// https://discourse.threejs.org/t/html5-multiplayer-games-over-udp-client-server-using-geckos-io/15896
function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.02;
	cube.rotation.y += 0.02;
    controls.update();
	renderer.render( scene, camera );
}

if ( WebGL.isWebGLAvailable() ) {
    animate();
} else{
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}