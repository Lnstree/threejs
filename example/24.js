// 雨滴效果
var renderer;
function initRender(){
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setClearColor(new THREE.Color(0xffffff));
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}


var camera;
function initCamera(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 200);
    camera.position.set(0, 20, 100);
    camera.lookAt(new THREE.Vector3(0, 30, 0));
}

var scene;
function  initScene(){
    scene = new THREE.Scene();
}


var light;
function initLight(){
    scene.add(new THREE.AmbientLight(0x404040));
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);
}

var cloud;
function initModel(){
    var object = new THREE.AxesHelper(500);
    scene.add(object);


    var texture = new THREE.TextureLoader().load("./textures/rain.png");
    var geometry = new THREE.Geometry();
    // var material = new THREE.PointsMaterial({
    //     size: 2,
    //     // transparent: true,
    //     opacity:0.8,
    //     // vertexColors: true,
    //     // color:0xffffff,
    //     map:texture,
    //     depthTest:false
    // });
    var material = new THREE.PointsMaterial({
        size: 2,
        transparent: true,
        opacity: 0.5,
        vertexColors: true,
        sizeAttenuation: true,
        color: 0xff0000,
        map:texture,
        depthTest: false  //设置解决透明度有问题的情况
    });

    var range = 120;
    for (var i = 0; i < 15000; i++){
        var part = new THREE.Vector3(Math.random() * range - range/2,  Math.random() * range - range / 2, Math.random() * range - range / 2);
        part.velocityY = 0.1 + Math.random() / 5;
        part.velocityX = (Math.random() - 0.5) /3;
        geometry.vertices.push(part);
``
        var color = new THREE.Color(0xffffff);
        geometry.colors.push(color);

    }

    cloud = new THREE.Points(geometry, material);
    cloud.verticesNeedUpdate = true;
    scene.add(cloud);
}


function animation(){
    var vertices = cloud.geometry.vertices;
    vertices.forEach(function(v){
         v.y = v.y - (v.velocityY)*3;
         v.x = v.x - (v.velocityX)*0.5;
        if (v.y <= -60) v.y = 60;
        if (v.x <= -20 || v.x >= 20) v.velocityX = v.velocityX * -1
    })
    //设置实时更新网格的顶点信息
    cloud.geometry.verticesNeedUpdate = true;
    renderer.render(scene, camera);

    requestAnimationFrame(animation);
}

function initControls(){
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function draw() {
        initRender();
        initScene();
        initCamera();
        initLight();
        initModel();
        initControls();
        animation();
        // window.onresize = onWindowResize;
}


draw();

