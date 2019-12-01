//TUBEGEOMETRY
var renderer;
function initRenderer(){
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}


var camera;
function initCamera(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 10000);
    camera.position.set(0,0,100);
}

var scene;
function initScene(){
    scene = new THREE.Scene();
}

var light;
function initLight(){
    scene.add(new THREE.AmbientLight(0x404040));
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1,1,1);
    scene.add(light);
}

//生成gui设置配置项
var gui,spGroup,tubeMesh;
function initGui() {
    //声明一个保存需求修改的相关数据的对象
    gui = {
        numberOfPoints:5,
        segments:64,
        radius:1,
        radiusSegments:8,
        closed:false,
        points: [],
        newPoints:function () {
            //生成一些随机点放置到数组当中
            var points = [];
            for (var i = 0; i < gui.numberOfPoints; i++) {
                var randomX = -20 + Math.round(Math.random() * 50);
                var randomY = -15 + Math.round(Math.random() * 40);
                var randomZ = -20 + Math.round(Math.random() * 40);

                points.push(new THREE.Vector3(randomX, randomY, randomZ));
            }
            gui.points = points;
            gui.redraw();
        },
        redraw:function () {
            //清楚掉场景中原来的模型对象
            scene.remove(spGroup);
            scene.remove(tubeMesh);
            //重新绘制模型
            generatePoints(gui.points, gui.segments, gui.radius, gui.radiusSegments, gui.closed);
        }
    };
    var datGui = new dat.GUI();
    //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
    datGui.add(gui, 'newPoints');
    datGui.add(gui, 'numberOfPoints', 2, 15).step(1).onChange(gui.newPoints);
    datGui.add(gui, 'segments', 0, 200).step(1).onChange(gui.redraw);
    datGui.add(gui, 'radius', 0, 10).onChange(gui.redraw);
    datGui.add(gui, 'radiusSegments', 0, 100).step(1).onChange(gui.redraw);
    datGui.add(gui, 'closed').onChange(gui.redraw);


    gui.newPoints();
}

 //通过配置项绘制出几何体
 function generatePoints(points, segments, radius, radiusSegments, closed) {
    spGroup = new THREE.Object3D(); //赋值spGroup存储模型点的3d对象
    var material = new THREE.MeshBasicMaterial({color: 0xff0000, transparent: false}); //声明一个红色普通纹理
    //将所有的顶点创建出球形存储到spGroup内
    points.forEach(function (point) {

        var spGeom = new THREE.SphereGeometry(0.2);
        var spMesh = new THREE.Mesh(spGeom, material);
        spMesh.position.copy(point);
        spGroup.add(spMesh);
    });
    // 将spGroup对象添加到场景当中
    scene.add(spGroup);

    // THREE.CatmullRomCurve3方法可以将一组顶点生成一条平滑的曲线
    var tubeGeometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), segments, radius, radiusSegments, closed);
    //将模型对象赋值给tubeMesh并添加到场景当中
    tubeMesh = createMesh(tubeGeometry);
    scene.add(tubeMesh);
}

function createMesh(geom) {

    // 创建两个纹理
    //创建一个透明纹理
    var meshMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00, transparent: true, opacity: 0.3});

    //创建一个线框纹理
    var wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;

    // 使用纹理和几何体创建模型
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

function initControls(){
    var controls = new THREE.OrbitControls(camera, renderer.domElement)
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
    initRenderer();
    initScene();
    initCamera();
    initLight();
    //initModel();
    initControls();
    // initStats();
    initGui();

    animate();
    window.onresize = onWindowResize;
}

draw();