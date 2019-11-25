// 绘制字体
var camera;
function initCamera(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 400);
    // camera.lookAt(new THREE.Vector3(0, 0, 0))
}


var scene;
function initScene(){
    scene = new THREE.Scene();
}

var renderer;
function initRenderer(){
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(new THREE.Color("#112333"))
    document.body.appendChild(renderer.domElement);
}

var light;
function initLight(){
    scene.add(new THREE.AmbientLight(0x404040));
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);
}


var fontModel;
function initModel(){
    var font;
    var loader = new THREE.FontLoader();
    loader.load("./font/gentilis_regular.typeface.json", function(res){
        font = new THREE.TextBufferGeometry("Hello World", {
            font: res,
            size: 20,
            height:2
        })
        console.log(font)
        font.center();
        var map = new THREE.TextureLoader().load("./textures/sm.jpg");
        var material = new THREE.MeshLambertMaterial({map:map, side:THREE.DoubleSide});
        fontModel = new THREE.Mesh(font, material);
        fontModel.position.set(0, 1, -10);
        scene.add(fontModel);
    });
}


var stats;
function initStats(){
    stats = new Stats()
    document.body.appendChild(stats.dom)
}

var controls;
function initControls(){
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.autoRotate = false;
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

function animate(){
    controls.update();
    render();
    stats.update();
    requestAnimationFrame(animate)
}


function draw(){
    initRenderer();
    initScene();
    initCamera();
    initLight();
    initControls();
    initStats();
    initModel();
    animate();
    window.onresize = onWindowResize
}


draw();
