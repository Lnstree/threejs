// ParametricGeometry

var camera;
function initCamera(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000)
    camera.position.set(0, 100, 0);
    camera.lookAt(new THREE.Vector3(0, 0, 0))
}


var render;
function initRenderer(){
    render = new THREE.WebGLRenderer({antialias:true});
    render.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(render.domElement);
}


var scene;
function initScene(){
    scene = new THREE.Scene();
}

function initModel(){
    var geometry = new THREE.ParametricGeometry(THREE.ParametricGeometries.klein, 25, 25);
    var material = new THREE.MeshBasicMaterial({color:0x00ff00});
    material.wireframe=true
    var klein = new THREE.Mesh(geometry, material);
    scene.add(klein);
}


function animation(){
    render.render(scene,camera);
    requestAnimationFrame(animation)
}

function initControls(){
    var controls = new THREE.OrbitControls(camera, render.domElement)
}

function draw(){
    initCamera();
    initScene();
    initRenderer();
    initControls();
    initModel();

    animation();
}

draw();