// THREE.POINTCLOUDMATERIAL

var renderer;
function initRender(){
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0xffffff)); //设置背景颜色
    document.body.appendChild(renderer.domElement);
}


var camera;
function initCamera(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 200);
}


var scene;
function initScene(){
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

    var geometry = new THREE.Geometry();
    var material = new THREE.PointCloudMaterial({
        size:4, 
        transparent: true,
        opacity: 0.7,
        map:getTexture(),
        vertexColors:true, 
        depthTest: false,  //设置解决透明度有问题的情况
        color:0xffffff});
     //循环将粒子的颜色和位置添加到网格当中
    //  for (var x = -5; x <= 5; x++) {
    //     for (var y = -5; y <= 5; y++) {
    //         var particle = new THREE.Vector3(x * 10, y * 10, 0);
    //         geometry.vertices.push(particle);
    //         geometry.colors.push(new THREE.Color(+randomColor()));
    //     }
    // }
    var range = 500;
    for (var i = 0; i < 15000; i++) {
        var particle = new THREE.Vector3(Math.random() * range - range / 2, Math.random() * range - range / 2, Math.random() * range - range / 2);
        geometry.vertices.push(particle);
        var color = new THREE.Color(+randomColor());
        // .setHSL ( h, s, l ) h — 色调值在0.0和1.0之间 s — 饱和值在0.0和1.0之间 l — 亮度值在0.0和1.0之间。 使用HSL设置颜色。
        //随机当前每个粒子的亮度
        var hsl = color.getHSL(color);
        color.setHSL(hsl.h, hsl.s, Math.random() * hsl.l);
        geometry.colors.push(color);
    }
    
    //实例化THREE.PointCloud
    cloud = new THREE.PointCloud(geometry, material);
    scene.add(cloud);
}

 //随机生成颜色
 function randomColor() {
    var arrHex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"],
        strHex = "0x",
        index;
    for (var i = 0; i < 6; i++) {
        index = Math.round(Math.random() * 15);
        strHex += arrHex[index];
    }
    return strHex;
}


var controls;
function initControls(){
    controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.autoRotate = true;
	controls.autoRotateSpeed = 1.0; // 30 seconds per round when fps is 60
}


function animation(){
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
}


function draw(){
    initRender();
    initScene();
    initCamera();
    initLight();
    initModel();
    initControls();
    // initGui();
    animation();
}
function getTexture() {
    var canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;

    var ctx = canvas.getContext('2d');
    // 绘制身体
    ctx.translate(-81, -84);

    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.moveTo(83, 116);
    ctx.lineTo(83, 102);
    ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
    ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
    ctx.lineTo(111, 116);
    ctx.lineTo(106.333, 111.333);
    ctx.lineTo(101.666, 116);
    ctx.lineTo(97, 111.333);
    ctx.lineTo(92.333, 116);
    ctx.lineTo(87.666, 111.333);
    ctx.lineTo(83, 116);
    ctx.fill();

    // 绘制眼睛
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(91, 96);
    ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
    ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
    ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
    ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
    ctx.moveTo(103, 96);
    ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
    ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
    ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
    ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
    ctx.fill();

    // 绘制眼球
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
}

draw();
