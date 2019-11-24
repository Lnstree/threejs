var renderer;
function initRender(){
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

var camera;
function initCamera(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 400);
}

var scene;
function initScene(){
    scene = new THREE.Scene();
}

var light;
function initLight(){
    scene.add(new THREE.AmbientLight(0x404040));
    light = new THREE.DirectionalLight(0xffffffff);
    light.position.set(1, 1, 1);
    scene.add(light);
}


function initModel(){
    var map = new THREE.TextureLoader().load("./textures/sm.jpg");
    var material = new THREE.MeshLambertMaterial({map:map});

    var cube = new THREE.Mesh(new THREE.BoxGeometry(100, 200, 100, 1, 1, 1), material);
    scene.add(cube);
}

var controls;
function initControls(){
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom  = true;
    controls.autoRotate = true;
    controls.minDistance = 200;
    controls.maxDistance = 600;
    controls.enablePan = true;
}

function render(){
    renderer.render(scene, camera);
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    render();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animation(){
    controls.update();
    render();

    stats.update();
    requestAnimationFrame(animation);
}

var stats;
function initStats(){
    stats = new Stats();
    document.body.appendChild(stats.dom);
}


function draw(){
    initRender();
    initScene();
    initCamera();
    initLight();
    initControls();
    initStats();
    initModel();
    animation();

    window.onresize = onWindowResize
}

draw()