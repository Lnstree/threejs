// firstpersoncontrols

var renderer;
function initRender() {
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

var camera;
function initCamera() {
    camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 10000);
    camera.position.set(0, 20, 100);
    camera.lookAt(new THREE.Vector3(0,0,0));
}

var scene;
function initScene() {
    scene = new THREE.Scene();
}

//初始化dat.GUI简化试验流程
var gui;
function initGui() {
    //声明一个保存需求修改的相关数据的对象
    gui = {
    };
    var datGui = new dat.GUI();
    //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
}

var light;
function initLight() {
    scene.add(new THREE.AmbientLight(0x444444));
    light = new THREE.PointLight(0xffffff);
    light.position.set(0,50,0);

    //告诉平行光需要开启阴影投射
    light.castShadow = true;
    scene.add(light);
}


var scene;
function initScene(){
    scene = new THREE.Scene();
}


function initModel(){
    var planeGeometry = new THREE.PlaneGeometry(100, 100);
    var planeMaterial = new THREE.MeshBasicMaterial({color:0xffffff});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(-10, -10, 0);
    plane.rotation.x = -0.5 * Math.PI;
    plane.rotation.y = -0.0;

    scene.add(plane);
}


var controls;
var clock = new THREE.Clock();
function initControls(){
        controls = new THREE.FirstPersonControls(camera, renderer.domElement);
        controls.lookSpeed = 0.09; //鼠标移动查看的速度
        controls.movementSpeed = 20; //相机移动速度
        // controls.mouseDragOn = true;
        // controls.activeLook  = true;
//         controls.verticalMax = 2.0;
//         controls.lon = -100; //进入初始视角x轴的角度
//         controls.lat = 0; //初始视角进入后y轴的角度
}

function animation(){
    renderer.render(scene, camera);
    controls.update(clock.getDelta());
    console.log(camera.position)
    camera.position.set(camera.position.x, camera.position.y, camera.position.z);

    requestAnimationFrame(animation);
}


function draw(){
    initRender();
    initCamera();
    initScene();
    initLight();
    initModel();
    initControls();

    animation();
}

draw();

