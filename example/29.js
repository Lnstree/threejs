// 加载Obj
var renderer;
function initRender() {
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    //告诉渲染器需要阴影效果
    renderer.setClearColor(0xffffff);
    document.body.appendChild(renderer.domElement);
}

var camera;
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0, 40, 50);
    camera.lookAt(new THREE.Vector3(0,0,0));
}

var scene;
function initScene() {
    scene = new THREE.Scene();
}

//初始化dat.GUI简化试验流程
var gui;
function initGui() {
    //声明一个保存需求修改的相关数据的对象
    gui = {
    };
    var datGui = new dat.GUI();
    //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
}

var light;
function initLight() {
    scene.add(new THREE.AmbientLight(0x444444));

    light = new THREE.PointLight(0xffffff);
    light.position.set(0,0,100);

    //告诉平行光需要开启阴影投射
    light.castShadow = true;

    scene.add(light);
}

function initModel() {

    //辅助工具
    var helper = new THREE.AxesHelper(50);
    scene.add(helper);

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load('./model/fireyaretziresp.mtl', function (material) {
        //加载OBJ格式的模型
        var loader = new THREE.OBJLoader();
        loader.setMaterials(material);
        loader.load("./model/fireyaretziresp.obj", function (mesh) {
            // var material = new THREE.MeshLambertMaterial({ color: 0x3fffff });
            // 加载完obj文件是一个场景组，遍历它的子元素，赋值纹理并且更新面和点的发现了
            mesh.children.forEach(function (child) {
                // child.material = material;
                child.geometry.computeFaceNormals();
                child.geometry.computeVertexNormals();
            });

            //模型放大一百倍
            scene.add(mesh);
        });
    })
}

//初始化性能插件
var stats;
function initStats() {
    stats = new Stats();
    document.body.appendChild(stats.dom);
}

//用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
var controls;
function initControls() {
    controls = new THREE.OrbitControls( camera, renderer.domElement );
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
    render();

    //更新性能插件
    stats.update();

    controls.update();

    requestAnimationFrame(animate);
}

function draw() {
    initGui();
    initRender();
    initScene();
    initCamera();
    initLight();
    initModel();
    initControls();
    initStats();

    animate();
    window.onresize = onWindowResize;
}

draw();