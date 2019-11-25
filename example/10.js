// use dat.gui
var renderer;
function initRender(){
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);
}

var camera;
function initCamera(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0, 40, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
}

var scene;
function initScene(){
    scene = new THREE.Scene();
}

var gui;
function initGui(){
    gui = {
        lightY:30,
        sphereX:0,
        sphereZ:0,
        cubeX:25,
        cubeZ:-5
    }

    var datGui = new dat.GUI();
    datGui.add(gui, "lightY", 0, 100);
    datGui.add(gui, "sphereX", -30, 30);
    datGui.add(gui, "sphereZ", -30, 30);
    datGui.add(gui, "cubeX", 0, 60);
    datGui.add(gui, "cubeZ", -30, 30);
}

var light;
function initLight(){
    scene.add(new THREE.AmbientLight(0x444444))
    light = new THREE.PointLight(0xffffff);
    light.position.set(13, 30, 10);
    light.castShadow = true;
    scene.add(light);
}

var sphere,cube;
function initModel(){
    var sphereGeometry = new THREE.SphereGeometry(5, 200, 200);
    var sphereMaterial = new THREE.MeshLambertMaterial({color:0xaaaaaa});

    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.y = 5;
    sphere.castShadow = true;
    scene.add(sphere);

    //光源的球
    var spGeometry = new THREE.SphereGeometry(0.5, 20, 20);
    var spMaterial = new THREE.MeshPhysicalMaterial({ color: 0xffffff });
    var sp = new THREE.Mesh(spGeometry, spMaterial);
    sp.position.set(15, 30, 10);
    scene.add(sp);

    // 立方体
    var cubeGeometry = new THREE.CubeGeometry(10, 10, 8);
    var cubeMaterial = new THREE.MeshLambertMaterial({color:0x00ffff});
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(25, 5, -5);

    cube.castShadow = true;
    scene.add(cube);

    var planGeometry = new THREE.PlaneGeometry(100, 100);
    var planMaterial = new THREE.MeshStandardMaterial({color:0xaaaaaa});
    var plan = new THREE.Mesh(planGeometry, planMaterial);
    plan.rotation.x = -0.5 * Math.PI;
    plan.rotation.y = -0;
    plan.receiveShadow = true;
    scene.add(plan);
}


var stats;
function initStats(){
    stats = new Stats();
    document.body.appendChild(stats.dom);
}

    //用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
    var controls;
    function initControls() {

        controls = new THREE.OrbitControls( camera, renderer.domElement );

        // 如果使用animate方法时，将此函数删除
        //controls.addEventListener( 'change', render );
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        controls.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        //是否可以缩放
        controls.enableZoom = true;
        //是否自动旋转
        controls.autoRotate = false;
        //设置相机距离原点的最远距离
        controls.minDistance  = 100;
        //设置相机距离原点的最远距离
        controls.maxDistance  = 200;
        //是否开启右键拖拽
        controls.enablePan = true;
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

        //更新相关位置
        light.position.y = gui.lightY;
        sphere.position.x = gui.sphereX;
        sphere.position.z = gui.sphereZ;
        cube.position.x = gui.cubeX;
        cube.position.z = gui.cubeZ;

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
