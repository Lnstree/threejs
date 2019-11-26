// 使用顶点绘制
var camera;
function initCamera(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.set(0, 100, 0);
    camera.lookAt(new THREE.Vector3(0, 0, 0))
}


var renderer;
function initRender(){
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMapEnabled = true;
    document.body.appendChild(renderer.domElement);
}


var scene;
function initScene(){
    scene = new THREE.Scene();
}



var light;
function initLight(){
    // scene.add(new THREE.AmbientLight(0x444444));
    light = new THREE.PointLight(0xffffff);
    light.position.set(15, 30, 10);
    light.castShadow = true;
    scene.add(light);
}


var cube;
function initModel(){
    var helper = new THREE.AxesHelper(10);
    scene.add(helper);
       // 创建一个立方体
        //    v6----- v5
        //   /|      /|
        //  v1------v0|
        //  | |     | |
        //  | |v7---|-|v4
        //  |/      |/
        //  v2------v3
    var cubeGeometry = new THREE.Geometry();
    var vertices = [
        new THREE.Vector3(10, 10, 10),
        new THREE.Vector3(-10, 10, 10),
        new THREE.Vector3(-10, -10, 10),
        new THREE.Vector3(10, -10, 10),
        new THREE.Vector3(10, -10, -10),
        new THREE.Vector3(10, 10, -10),
        new THREE.Vector3(-10, 10, -10),
        new THREE.Vector3(-10, -10, -10),
    ]
    cubeGeometry.vertices = vertices;

    var faces = [
        new THREE.Face3(0, 1, 2),
        new THREE.Face3(0, 2, 3),
        new THREE.Face3(0, 3, 4),
        new THREE.Face3(0, 4, 5),
        new THREE.Face3(1, 6, 7),
        new THREE.Face3(1, 7, 2),
        new THREE.Face3(6, 5, 4),
        new THREE.Face3(6, 4, 7),
        new THREE.Face3(5, 6, 1),
        new THREE.Face3(5, 1, 0),
        new THREE.Face3(3, 2, 7),
        new THREE.Face3(3, 7, 4)
    ];

    cubeGeometry.faces = faces;


    cubeGeometry.computeFaceNormals();
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0x00ffff});

    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = 25;
    cube.position.y = 5;
    cube.position.z = -5;
    cube.castShadow = true;

    scene.add(cube);


    var planeGeomotry  = new THREE.PlaneGeometry(100, 100);
    var planeMaterial  = new THREE.MeshLambertMaterial({color:0xaaaaaa});

    var plane = new THREE.Mesh(planeGeomotry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.rotation.y = -0;
    plane.receiveShadow = true;
    scene.add(plane);
}

var controls;
function initControls(){
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.autoRotate = false;
    controls.minDistance = 50;
    controls.maxDistance = 200;
    controls.enablePan = true;
}


function render(){
    renderer.render(scene, camera);
}


function animation(){
    render();
    controls.update();
    requestAnimationFrame(animation);
}


function draw(){
    initScene();
    initRender();
    initCamera();
    initLight();
    initControls();
    initModel();

    animation();
}


draw();