// THREE 基础几何
// 渲染器
var renderer;
function initRenderer(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    // renderer.setClearColor(0x000000, 1.0);
    // renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
}

var camera;
function initCamera(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1,2000);
    // camera.position.set(0, 20, 10);
    camera.position.y = 400;
}

var scene;
function initScene(){
    scene = new THREE.Scene();
}

var light;
function initLight(){
    // 添加环境光
    scene.add(new THREE.AmbientLight(0x404040));

    // 添加点光
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 1, 0);
    scene.add(light);
}


function initModel(){
    var map = new THREE.TextureLoader().load("./textures/sm.jpg");
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 16;

    var matrial = new THREE.MeshLambertMaterial({map:map, side:THREE.DoubleSide});


    // 球形(半径，水平密度，垂直密度)
    var object  = new THREE.Mesh(new THREE.SphereGeometry(75, 50, 50), matrial);
    object.position.set( -400, 0, 200 );
    scene.add(object);

    //二十面体 (大小，半径)
    object = new THREE.Mesh(new THREE.IcosahedronGeometry(75, 0), matrial);
    object.position.set(-200, 0, 200);
    scene.add(object);

    // 八面体 (大小，半径)
    object = new THREE.Mesh(new THREE.OctahedronGeometry(75, 0), matrial);
    object.position.set(0, 0, 200);
    scene.add(object);

    // 四面体 (大小，半径)
    object = new THREE.Mesh(new THREE.TetrahedronGeometry(70, 1), matrial);
    object.position.set(200, 0, 200);
    scene.add(object);

    // 长方形平面(x宽度， y高度， x方向分段数， y方向分段数)
    object = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 1, 1), matrial);
    object.position.set(-400, 0, 0);
    scene.add(object);

    // 立方体 (x轴高度， y轴高度， x方向分段数， y方向分段数)
    object = new THREE.Mesh( new THREE.BoxGeometry(100, 100, 100, 1, 1, 1), matrial );
    object.position.set( -200, 0, 0);
    scene.add(object);

    // 圆形平面 (半径， 顶点密度， 绘制起点弧度， 绘制弧度)
    object = new THREE.Mesh(new THREE.CircleGeometry(50, 20, 0, Math.PI * 2), matrial);
    object.position.set(0, 0, 0);
    scene.add(object);

    // 空心平（内圆半径，外圆半径，分割面越大越圆滑，垂直外边分割面，开始绘制弧度，绘制弧度）面
    object = new THREE.Mesh(new THREE.RingGeometry(10, 50, 10, 5, 0, Math.PI * 2), matrial);
    object.position.set(200, 0, 0);
    scene.add(object);

    // 圆柱体 (头部圆的半径，底部圆半径，高度，上下圆顶点个数，上下面切割线条数，上下面是否显示，开始弧度，绘制弧度）
    object = new THREE.Mesh(new THREE.CylinderGeometry(25, 75, 100, 40, 5), matrial);
    object.position.set(400, 0, 0);
    scene.add(object);

    // 车床
    var points = [];
    for (var i = 0; i < 50; i++){
        points.push(new THREE.Vector2(Math.sin(i * 0.2) * Math.sin(i * 0.1) * 15 + 50, (i - 5) * 2));
    }

    object = new THREE.Mesh( new  THREE.LatheGeometry(points, 20), matrial);
    object.position.set(-400, 0, -200);
    scene.add(object);

    // 救生圈
    object = new THREE.Mesh(new THREE.TorusGeometry(50, 20, 20, 20), matrial) ;
    object.position.set(-200, 0, -200);
    scene.add(object);  

    // 环面扭结模型
    object = new THREE.Mesh(new THREE.TorusKnotGeometry(50, 10, 50, 20), matrial);
    object.position.set(200, 0, -200);
    scene.add(object);

    // 轴辅助 （每一个轴的长度）
    object = new THREE.AxesHelper(50);
    object.position.set(200, 0, -200);
    scene.add(object);

    // 箭头辅助
    object = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0 ,0), 50, 0x00ffff);
    object.position.set(400, 0, -200);
    scene.add(object);
}


function animation(){
    requestAnimationFrame(animation);
    render();
}

function render(){
    var timer = Date.now() * 0.0001;
    camera.position.x = Math.cos(timer) * 800;
    camera.position.z = Math.sin(timer) * 800;
    camera.lookAt(scene.position);

    for (var i = 0, l = scene.children.length;  i < l; i++){
        var object = scene.children[i];
        object.rotation.x = timer * 5;
        object.rotation.y = timer * 2.5;
    }
    renderer.render(scene, camera);
}


function draw(){
    initScene();
    initRenderer();
    initCamera();
    initLight();
    initModel();

    animation();
}

draw();