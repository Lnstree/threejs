var scene, renderer, camera;

var cameraCenter = new THREE.Vector3();
var cameraHorzLimit = 50;
var cameraVertLimit = 50;
var mouse = new THREE.Vector2();
var cube;
var controls;

init()
animate()


function init(){
    renderer = new THREE.WebGLRenderer({antialias:true});
    var width = window.innerWidth;
    var height = window.innerHeight;

    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    var cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
    var cubeMaterial = new THREE.MeshBasicMaterial({color:0x1ec000});
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    cube.position.set(0, 0, 0);
    scene.add(cube)

    camera = new THREE.PerspectiveCamera(45, width/height, 1, 10000);
    camera.position.y = 160;
    camera.position.z = 400;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    cameraCenter.x = camera.position.x;
    cameraCenter.y = camera.position.y;
    // controls = new THREE.OrbitControls(camera, renderer.domElement)
    document.addEventListener('mousemove', onDocumentMouseMove, false)
    var gridXZ = new THREE.GridHelper(100, 10, new THREE.Color(0xff0000), new THREE.Color(0xffffff));
    scene.add(gridXZ);
}


function  animate(){
    updateCamera();
    requestAnimationFrame(animate);
    renderer.render (scene, camera);
}


function updateCamera(){
    camera.position.x = cameraCenter.x + (cameraHorzLimit * mouse.x);
    camera.position.y = cameraCenter.y + (cameraVertLimit * mouse.y);
}

function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.x =  (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
   }
   