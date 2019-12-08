// envmap
var renderer, camera, scene, gui, light, stats, controls, sphereMesh, sphereMaterial;
var cubeCamera;
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

    cubeCamera = new THREE.CubeCamera(0.1, 1000, 256);
    scene.add(cubeCamera);
}

function initControls(){
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function initLight(){
    scene.add(new THREE.AmbientLight(0xffffff));
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 20,-20);
    light.castShadow = true;
    light.shadow.camera.top = 10;
    light.shadow.camera.bottom = -10;
    light.shadow.camera.left = -10;
    light.shadow.camera.right = 10;

    scene.add(light);
}

var cubeMesh, torusMesh;
function initModel(){
    var helper = new THREE.AxesHelper(50);
    scene.add(helper);
    var geometry = new THREE.SphereBufferGeometry(2, 100, 50);
    sphereMaterial = new THREE.MeshLambertMaterial({envMap:cubeCamera.renderTarget.texture})
    sphereMesh = new THREE.Mesh(geometry, sphereMaterial);
    scene.add(sphereMesh);
    var cubeMaterial = new THREE.MeshPhongMaterial({
        map:new THREE.TextureLoader().load("./textures/brick_diffuse.jpg")
    });
    //添加立方体
    cubeMesh = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), cubeMaterial);
    cubeMesh.position.set(-5, 0, 0);
    scene.add(cubeMesh);

    //添加甜甜圈
    torusMesh = new THREE.Mesh(new THREE.TorusGeometry(2, 1, 16, 100), cubeMaterial);
    torusMesh.position.set(8, 0, 0);
    scene.add(torusMesh);
}



function animation(){

    cubeCamera.update( renderer, scene );
    cubeMesh.rotation.y += 0.2
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
}


function draw(){
    initRender();
    initScene();
    initCamera();
    initControls();
    initLight();
    initModel();

    animation();
}

draw();

