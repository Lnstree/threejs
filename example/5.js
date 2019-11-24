// 使用轨迹球
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
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);
}

function initModel(){
    var map = new THREE.TextureLoader().load("./textures/sm.jpg");
    var matrial = new THREE.MeshLambertMaterial({map:map});
    var cube = new THREE.Mesh(new THREE.BoxGeometry(100, 200, 100, 1, 1, 1), matrial);
    scene.add(cube);
}


var controls;
function initControls(){
    controls = new THREE.TrackballControls(camera, renderer.domElement);
    // 旋转速度
    controls.rotateSpeed = 5;
    controls.zoomSpeed = 3;
    controls.panSpeed = 0.8;
    controls.noZoom   = false;
    controls.noPen  = false;
    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.3;

    // controls.addEventListener('change', render);
}

var stats;
function initStats(){
    stats = new Stats();
    document.body.appendChild(stats.dom)
}

function render(){
    renderer.render(scene, camera);
}

function animation(){
    controls.update();
    render();
    requestAnimationFrame(animation);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    controls.handleResize();
    render();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function draw(){
    initRender();
    initScene();
    initCamera();
    initLight();
    initModel();
    initStats();
    initControls();
    animation();
}

draw();