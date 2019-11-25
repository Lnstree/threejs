// 绘制阴影效果
var renderer;
function initRenderer(){
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 需要阴影效果
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;    // default THREE.PCFShadowMap
    document.body.appendChild(renderer.domElement)
}

var camera;
function initCamera(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0, 40, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0))
}

var scene;
function initScene(){
    scene = new THREE.Scene();

}

var light;
function initLight(){
    scene.add(new THREE.AmbientLight(0x444444));
    light = new THREE.SpotLight(0xffffff);
    light.position.set(60, 30, 0);
    light.castShadow = true;
    scene.add(light);
}


function initModel(){
    var sphereGeometry = new THREE.SphereGeometry(5, 20, 20);
    var sphereMaterial = new THREE.MeshStandardMaterial({color:0x7777ff});

    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.y = 5;
    sphere.castShadow = true;
    scene.add(sphere);

    // 辅助工具
    var helper = new THREE.AxesHelper(10);
    scene.add(helper);

    // 立方体
    var cubeGeometry = new THREE.CubeGeometry(10, 10, 8);
    var cubeMaterial = new THREE.MeshLambertMaterial({color:0x00ffff});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(25, 5, -5);
    cube.castShadow = true;
    scene.add(cube)

    var planeGeometry = new THREE.PlaneGeometry(100, 100);
    var planeMatiral  = new THREE.MeshStandardMaterial({color:0xaaaaaa});

    var plane = new THREE.Mesh(planeGeometry, planeMatiral);
    plane.rotation.x = -0.5 * Math.PI;
    plane.rotation.y = -0;
    // 接收阴影
    plane.receiveShadow = true;
    scene.add(plane);
}

var stats;
function initStats(){
    stats = new Stats();
    document.body.appendChild(stats.dom);
}

var controls;
function initControls(){
    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 5;
    controls.zoomSpeed = 3;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = 0.3;
}

function render(){
    renderer.render(scene, camera);
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    controls.handleResize();
    render();
    render.setSize(window.innerWidth, window.innerHeight);
}

function animate(){
    render();
    stats.update();
    controls.update();
    requestAnimationFrame(animate);
}

function draw(){
    initRenderer();
    initScene();
    initCamera();
    initLight();
    initModel();
    initControls();
    initStats();

    animate();
    window.onresize = onWindowResize;
}

draw();