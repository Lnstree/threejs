// 正交相机与透视相机
var scene;
function initScene(){
    scene = new THREE.Scene();
}


var renderer;
function initRenderer(){
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setClearColor(new THREE.Color(0x3399CC));
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement)
}

var camera;
function initCamera(){
    camera = new THREE.PerspectiveCamera(25, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.set(150, 180, 100);
    camera.lookAt(scene.position);
}

//left — 摄像机视锥体左侧面。
//right — 摄像机视锥体右侧面。
//top — 摄像机视锥体上侧面。
//bottom — 摄像机视锥体下侧面。
//near — 摄像机视锥体近端面。
//far — 摄像机视锥体远端面。
function orthCamera(){
    camera  = new THREE.OrthographicCamera(window.innerWidth/-14.5, window.innerWidth/14.5,
        window.innerHeight/14.5, window.innerHeight/-14.5, -100, 400);
    camera.position.set(150, 180, 100);
    camera.lookAt(scene.position);
}



function initLight(){
    var ambientLight = new THREE.AmbientLight(0x606060);
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1.75, 0.5).normalize();
    scene.add(directionalLight);
}


function initModel(){
    var planeGeo = new THREE.PlaneGeometry(100, 100, 10, 10);
    var planeMat = new THREE.MeshLambertMaterial({color:0x633333, wireframe:false});
    var planeMesh = new THREE.Mesh(planeGeo, planeMat);
    planeMesh.position.set(0, 0, -20);
    planeMesh.rotation.x = -0.5 * Math.PI;
    scene.add(planeMesh);

    var cubeGeo = new THREE.CubeGeometry(20, 40, 20, 5, 5, 5);
    var cubeMat = new THREE.MeshLambertMaterial({color:0x333333});
    var cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
    scene.add(cubeMesh);
}


function render(){
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

function draw(){
    initScene();
    // initCamera();
    orthCamera();
    initRenderer();
    // initControls();
    initLight();
    initModel();
    render();
}

draw();

