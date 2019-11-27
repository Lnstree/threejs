// 动态光影

var camera ;
function initCamera(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.set(0, 10, 40);
}

var scene;
function initScene(){
    scene = new THREE.Scene();
}


var p1, p2;
function initLight(){
    scene.add(new THREE.AmbientLight(0x111122));
    p1 = createLight(0x0088ff);
    scene.add(p1);
    p2 = createLight(0xff8888);
    scene.add(p2);
}

function initModel(){
    var geometry = new THREE.BoxBufferGeometry(30, 30, 30);
    var material = new THREE.MeshPhongMaterial({
        color:0xa0adaf,
        shininess:10,
        specular:0x111111,
        side:THREE.BackSide
    })

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 10;
    mesh.receiveShadow = true;
    scene.add(mesh);


}

var render;
function initRender(){
    render = new THREE.WebGLRenderer({antalias:true});
    render.setSize(window.innerWidth, window.innerHeight);
    render.shadowMap.enabled = true;
    document.body.appendChild(render.domElement);
}

var controls;
function initControl(){
    controls = new THREE.OrbitControls(camera, render.domElement);
    controls.target.set(0, 10, 0);
    controls.update();
}

function createLight(color){

    var intensity = 1.5;
    var pointLight = new THREE.PointLight(color, intensity, 20);
    pointLight.castShadow = true;
    pointLight.shadow.camera.near = 1;
    pointLight.shadow.camera.far  = 60;
    pointLight.shadow.camera.bias = -0.005;

    var geometry = new THREE.SphereBufferGeometry(0.3, 12, 6);
    var material = new THREE.MeshBasicMaterial({color:color});
    material.color.multiplyScalar(intensity);
    var sphere = new THREE.Mesh(geometry, material);
    pointLight.add(sphere);

    var texture = new THREE.CanvasTexture(generateTexture());
    texture.magFilter = THREE.NearestFilter;
    texture.wrapT = THREE.RepeatWrapping;
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.set(1, 4.5);

    var geometry = new THREE.SphereBufferGeometry(2, 32, 8);
    var material = new THREE.MeshPhongMaterial({side:THREE.DoubleSide, alphaMap:texture, alphaTest:0.5});

    var sphere = new THREE.Mesh(geometry, material);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    pointLight.add(sphere);

    var distanceMaterial = new THREE.MeshDistanceMaterial( {
        alphaMap: material.alphaMap,
        alphaTest: material.alphaTest
    } );
    sphere.customDistanceMaterial = distanceMaterial;
    return pointLight;
}



function  generateTexture(){
    var canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 2;

    var context = canvas.getContext('2d');
    context.fillStyle = 'white'
    context.fillRect(0, 1, 2, 1);
    return canvas;
}


function animation(){
    requestAnimationFrame(animation);
    var time = performance.now() * 0.001;
    p1.position.x = Math.sin(time * 0.6) * 9;
    p1.position.y = Math.sin(time * 0.7) * 9 + 6;
    p1.position.z = Math.sin(time * 0.8) * 9;

    p1.rotation.x = time;
    p1.rotation.z = time;

    time += 10000;

    p2.position.x = Math.sin(time * 0.6) * 9;
    p2.position.y = Math.sin(time * 0.7) * 9 + 6;
    p2.position.z = Math.sin(time * 0.8) * 9;

    p2.rotation.x = time;
    p2.rotation.z = time;

    render.render(scene, camera);

}


function draw(){
    initCamera();
    initScene();
    initRender();
    initLight();
    initModel();
    initControl();
    animation();
}

draw();