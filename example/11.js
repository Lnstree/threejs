// 多种材质比较
var camera;
function initCamera(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 400);
}


var renderer;
function initRenderer(){
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowEnabled=true;
    document.body.appendChild(renderer.domElement);
}


var scene;
function  initScene(){
    scene = new THREE.Scene();
}

var light;

function initLight(){
    scene.add(new THREE.AmbientLight(0x444444));
    light = new THREE.PointLight(0xffffff);
    light.position.set(13,30, 10);
    scene.add(light);
}

var planet;
function initPlane(){
    var planGemotry = new THREE.PlaneGeometry(100, 100);
    var planMaterial = new THREE.MeshLambertMaterial({color:0x00fffff});
    planet = new THREE.Mesh(planGemotry, planMaterial);

    planet.position.set(-10, -20, 0);
    planet.rotation.x = -0.5 * Math.PI;
    planet.rotation.y = -0;
    scene.add(planet);
}

function initModel(){
    var sphereGeometry = new THREE.SphereGeometry(20, 10, 10);
    var sphereMaterial = new THREE.MeshPhysicalMaterial({color:0xffffff});
    var sp = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sp.position.set(0, 0, 0);
    scene.add(sp);
}

var controls;
function initControls(){
    controls = new THREE.OrbitControls( camera, renderer.domElement );

    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //controls.dampingFactor = 0.25;
    //是否可以缩放
    controls.enableZoom = true;
    //是否自动旋转
    controls.autoRotate = false;
    //设置相机距离原点的最远距离
    controls.minDistance  = 100;
    //设置相机距离原点的最远距离
    controls.maxDistance  = 200;
    //是否开启右键拖拽
    controls.enablePan = true;
}


function render(){
    renderer.render(scene, camera);
}

function animate(){
    render();
}

function draw(){
    initScene();
    initRenderer();
    initLight();
    initPlane();
    initModel();
    initControls();
    initCamera();
    animate();
}

draw();