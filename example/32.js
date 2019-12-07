// FBX
var renderer;
function initRenderer(){
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0xeeeeee);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
}

var camera;
function initCamera(){
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
      camera.position.set(100, 200, 300 );
}


var scene;
function initScene(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    scene.fog = new THREE.Fog(0xa0a0a, 200, 1200);
}


var light;
function initLight(){
    scene.add(new THREE.AmbientLight(0x444444));
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 200, 200);

    light.castShadow = true;
    light.shadow.camera.top = 180;
    light.shadow.camera.bottom = -100;
    light.shadow.camera.left = -120;
    light.shadow.camera.right = 120;

    light.castShadow = true;
    scene.add(light);
}

var meshHelper, mixer, action;

function initModel(){
    var helper = new THREE.AxesHelper(50);
    scene.add(helper);

    var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000), new THREE.MeshPhongMaterial({color:0xffffff, depthWrite:false}));
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);

    var grid = new THREE.GridHelper(2000, 20, 0x0000000, 0x000000);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add(grid);

    var loader = new THREE.FBXLoader();
    loader.load("./model/Samba Dancing.fbx", function(mesh){
        meshHelper = new THREE.SkeletonHelper(mesh);
        scene.add(meshHelper);

        mesh.traverse(function(child){
            if (child.isMesh){
                child.castShadow = true;
                child.receiveShadow = true;
            }
        })
        mixer = mesh.mixer = new THREE.AnimationMixer(mesh);
        action = mixer.clipAction(mesh.animations[0]);
        action.play();
        scene.add(mesh);
    });

}

var controls;
function initControls(){
    controls = new THREE.OrbitControls(camera, renderer.domElement);
}

var clock = new THREE.Clock();
function render(){
    var time = clock.getDelta();
    if (mixer){
        mixer.update(time);
    }

    controls.update();
}






function animation(){
    render();
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
}


function draw(){
    initRenderer();
    initScene();
    initCamera();
    initControls();
    initLight();
    initModel();
    animation();
}

draw();