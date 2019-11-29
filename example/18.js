var renderer;
function initRender(){
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}


var camera;
function initCamera(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 600);
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


function initModel(){
    var points = [];
    for (var i = 0; i < 20; i++){
        var randomx = -150 + Math.round(Math.random() * 300);
        var randomy = -150 + Math.round(Math.random() * 300);
        var randomz = -150 + Math.round(Math.random() * 300);

        points.push(new THREE.Vector3(randomx, randomy, randomz));
    }

    var spGroup = new THREE.Object3D();
    var material = new THREE.MeshBasicMaterial({color:0xff0000, transparent:false});
    points.forEach(function (point){
        var spge = new THREE.SphereGeometry(2);
        var spMesh = new THREE.Mesh(spge, material);
        spMesh.position.copy(point);
        scene.add(spMesh);
    })
    // 将存放所有点的对象添加到场景当中
    scene.add(spGroup);

    // 使用这些点实例化一个THREE.ConvexGeometry几何体对象
    var hullGeometry = new THREE.ConvexGeometry(points);
    //生成模型
    hullMesh = createMesh(hullGeometry);
    //添加到场景

    scene.add(hullMesh);
}


function createMesh(geom){
     // 实例化一个绿色的半透明的材质
     var meshMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00, transparent: true, opacity: 0.2});
     meshMaterial.side = THREE.DoubleSide; //将材质设置成正面反面都可见
     var wireFrameMat = new THREE.MeshBasicMaterial();
     wireFrameMat.wireframe = true; //把材质渲染成线框

     // 将两种材质都赋给几何体
     var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);
     return mesh;
}

function render() {
    renderer.render( scene, camera );
}

//窗口变动触发的函数
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    render();
    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
    //更新控制器
    // controls.update();
    render();

    //更新性能插件
    requestAnimationFrame(animate);
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

    animate();
}


draw();