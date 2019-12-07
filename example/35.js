// envmap
var renderer, camera, scene, gui, light, stats, controls, sphereMesh, sphereMaterial;
function initRender(){
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enable = true;
    document.body.appendChild(renderer.domElement);
}

function initCamera(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0, 20, 20);
}


function initScene(){
    var cubeTextureLoader = new THREE.CubeTextureLoader();
    cubeTextureLoader.setPath("./textures/scene/");
    var cubeTexture = cubeTextureLoader.load([ 'px.jpg', 'nx.jpg',
    'py.jpg', 'ny.jpg',
    'pz.jpg', 'nz.jpg'])

    scene = new THREE.Scene();
    scene.background = cubeTexture;
}

function initControls(){
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
}



function animation(){
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
}


function draw(){
    initRender();
    initScene();
    initCamera();
    initControls();

    animation();
}

draw();

