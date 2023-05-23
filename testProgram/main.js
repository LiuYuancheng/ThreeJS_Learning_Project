import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';


// setup renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// setup camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 0, 0, 10 );
camera.lookAt( 0, 0, 0 );

// create the scene
const scene = new THREE.Scene();

// create a cube 
const box_geometry = new THREE.BoxGeometry( 1, 1, 1 );
const boxMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
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

//camera.position.z = 5;
// https://discourse.threejs.org/t/html5-multiplayer-games-over-udp-client-server-using-geckos-io/15896
function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.02;
	cube.rotation.y += 0.02;

	renderer.render( scene, camera );
}

if ( WebGL.isWebGLAvailable() ) {
    animate();
} else{
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}