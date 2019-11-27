// light
//THREE.AmbientLight	这是一个基础光源，也叫环境光源，该光源的颜色将会叠加到场景现有的颜色上面，无法创建阴影。
//THREE.PointLight	    点光源，从空间的一点向所有方向发射光源。
//THREE.SpotLight	    这种光源有聚光的效果，类似台灯、天花板上的吊灯或者手电筒。
///THREE.DirectionalLight	无限光，平行光。从这种光源发出的光线可以看作是平行的，比如太阳光。
//THREE.HemisphereLight	这是一种特殊光源，可以通过模拟反光面和光线微弱的天空来创建更加自然的室外光线。无法创建阴影。
//THREE.RectAreaLight	    使用这种光源可以指定散发光线的平面，而不是一个点。无法创建阴影。

var camera;
function initCamera(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 10000);
    camera.position.set(0, 100, 200);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
}


var render;
function initRender(){
    render = new THREE.WebGLRenderer({antialias:true});
    render.setSize(window.innerWidth, window.innerHeight);
    render.shadowMap.enabled=true;
    document.body.appendChild(render.domElement);
}

var scene;
function initScene(){
    scene = new THREE.Scene();
}

var light;
var select = "PointLight";
function initLight(){
    scene.add(new THREE.AmbientLight(0xffffff));
    light = new THREE.PointLight(0x444444);
    light.castShadow = true;
    light.position.set(10, 100, 0);
    scene.add(light);
}

var settings;
function initGui(){
    settings = {
        'lightType': "",
    }

    var gui = new dat.GUI();
    gui.add(settings, 'lightType',['PointLight', 'SpotLight', 'DirectionLight', 'HemisphereLight', 'AreaLight'] )
}

var controls;
function initControls(){
    controls = new THREE.OrbitControls(camera, render.domElement);
}


var plane;
function initModel(){
    var planeGeometry = new THREE.PlaneGeometry(1000, 1000);
    var planeMaterial = new THREE.MeshStandardMaterial({color:0xaaaaaa});
    plane  = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.receiveShadow=true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.rotation.y = -0;
    scene.add(plane)

    var cubeGeometry = new THREE.CubeGeometry(10, 30, 10);
    var cubeMaterial = new THREE.MeshPhysicalMaterial({color:0x3f3f3f});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(0, 15, 0);
    cube.castShadow=true;
    scene.add(cube);
}

function switchLight(){
    var lightType = settings.lightType;
    if (lightType == select){
        return;
    }

    scene.remove(light)
    switch(lightType){
       case 'PointLight':
           light = new THREE.PointLight(0x444444);
           light.position.set(10, 100, 0);
           light.castShadow = true;
           break;
       case 'SpotLight':
           light = new THREE.SpotLight(0x333333);
           light.position.set(10, 100, 0);
           light.castShadow = true;
           break;
       case 'DirectionLight':
           light = new THREE.DirectionalLight(0x555555)
           light.shadow.camera.near = 120; //产生阴影的最近距离
           light.shadow.camera.far = 200; //产生阴影的最远距离
           light.shadow.camera.left = -50; //产生阴影距离位置的最左边位置
           light.shadow.camera.right = 50; //最右边
           light.shadow.camera.top = 50; //最上边
           light.shadow.camera.bottom = -50; //最下面
           light.position.set(100, 100, 0);
           light.castShadow = true;
           var debug = new THREE.CameraHelper(light.shadow.camera);
           debug.name = "debug";
           scene.add(debug);
           break;
       case 'HemisphereLight':
           light = new THREE.HemisphereLight(0x666666);
           light.position.set(10, 100, 0);
           break;
       case 'AreaLight':
           light = new THREE.RectAreaLight(0xffffff, 2, 100, 100);
           light.rotation.x = -0.5 * Math.PI
           light.rotation.y = -0
           light.position.set(0, 100, -100);
           light.lookAt(new THREE.Vector3(0, 0, 0))
           break;
    }
    scene.add(light);
}

function animation(){
    switchLight()
    render.render(scene, camera);
    requestAnimationFrame(animation);
}


function draw(){
    initGui();
    initScene();
    initRender();
    initCamera();
    initLight();
    initControls();
    initModel();
    animation();

}

draw();