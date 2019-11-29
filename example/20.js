//自定义二维图形
var  renderer;
function initRenderer(){
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}


var camera;
function initCamera(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.set(0, 100, 100);
}


var scene;
function initScene(){
    scene = new THREE.Scene();
}


function render(){
    renderer.render(scene, camera);
}

function animate(){
    render();
    requestAnimationFrame(animate);
}

function initLight(){
    scene.add(new THREE.AmbientLight(0x404040));

    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1,1,1);
    scene.add(light);
}


function  initModel(){
    // 实例化shape对象
    var shape = new THREE.Shape();

    // 设置开始点的位置
    shape.moveTo(20, 10);

    // 从起始点绘制直线到当前位置
    shape.lineTo(20, 40);

    //设置一条曲线到30 40
    shape.bezierCurveTo(15, 25, -5, 25, -30, 40);

    // 设置一条通过当前所有顶点的光滑曲线
    shape.splineThru(
        [new THREE.Vector2(-22, 30),
            new THREE.Vector2(-18, 20),
            new THREE.Vector2(-20, 10),
        ]);

    // 设置曲线回到顶点
    shape.quadraticCurveTo(0, -15, 20, 10);

    // 添加第一个眼
    var hole1 = new THREE.Path();
    hole1.absellipse(6, 20, 2, 3, 0, Math.PI * 2, true);
    shape.holes.push(hole1);

    // 添加第二个眼
    var hole2 = new THREE.Path();
    hole2.absellipse(-10, 20, 2, 3, 0, Math.PI * 2, true);
    shape.holes.push(hole2);

    // 添加嘴巴，一半的圆
    var hole3 = new THREE.Path();
    hole3.absarc(0, 5, 2, 0, Math.PI, true);
    shape.holes.push(hole3);



    var shapeGeometry = new THREE.ShapeGeometry(shape);
    var material = new THREE.MeshPhongMaterial({color:0xff00ff});
    material.side = THREE.DoubleSide;
    var mesh = new THREE.Mesh(shapeGeometry, material);
    scene.add(mesh);
}


function draw(){
    initScene();
    initCamera();
    initRenderer();
    initLight();
    initModel();
    animate();
}

draw();