var renderer;
function initRender() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

var camera;
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 60);
}

var scene;
function initScene() {
    scene = new THREE.Scene();
}

var light;
function initLight() {
    scene.add(new THREE.AmbientLight(0x404040));

    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);
}


function initModel(){
     generateGeo(120, 2, 2 * Math.PI);
}


function generateGeo(segments, phiStart, phiLength){
    var points = [];
    var height = 5;
    var count  = 40;
    for (var i = 0; i < count; ++i){
        points.push(new THREE.Vector3((Math.sin(i * 0.2) + Math.cos(i * 0.3)) * height + 12, (i - count) + count / 2, 0));
    }

    var sg = new THREE.Object3D();
    var material = new THREE.MeshBasicMaterial({color:0xff0000, transparent:false});
    points.forEach(function (point){
        var spGeom = new THREE.SphereGeometry(0.2);
        var spMesh = new THREE.Mesh(spGeom, material);
        spMesh.position.copy(point);
        sg.add(spMesh);
    })
    scene.add(sg);

    var lathGeometry = new THREE.LatheGeometry(points, segments, phiStart, phiLength);
    var lathMesh     = createMesh(lathGeometry);

    scene.add(lathMesh);
}

function createMesh(geom) {

    //  实例化一个法向量的材质
    var meshMaterial = new THREE.MeshNormalMaterial();
    meshMaterial.side = THREE.DoubleSide; //设置两面都可见
    var wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true; //把材质渲染成线框

    // 将两种材质都赋给几何体
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

    return mesh;
}
function render() {
    renderer.render( scene, camera );
}

function initControls(){
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function animate() {
    //更新控制器
    // controls.update();
    render();

    //更新性能插件
    // stats.update();
    requestAnimationFrame(animate);
}

function draw() {
    initRender();
    initScene();
    initCamera();
    initLight();
    initModel();
    initControls();
    // initStats();

    animate();
}

draw();