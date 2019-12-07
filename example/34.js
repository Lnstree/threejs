// normalMap
var renderer, camera, scene, gui, light, stats, controls, cube1, cube2, pointLight;
var angle = 0, radian, r = 5;


function initRenderer(){
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xeeeeee);
    renderer.shadowMap.enabled = true;
    //告诉渲染器需要阴影效果
    document.body.appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 12, 15 );
}

function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xa0a0a0 );
    scene.fog = new THREE.Fog( 0xa0a0a0, 5, 50 );
}

function initGui(){
    gui = {
        normalScale:1,
    }

    var datGui = new dat.GUI();
    datGui.add(gui, "normalScale", -2, 30).onChange(function (e){
        cube1.material.normalScale.set(e, e);
        cube1.material.needsUpdate = true;
    });
}

function initLight() {
    scene.add(new THREE.AmbientLight(0x444444));

    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 20, 10 );

    light.castShadow = true;
    light.shadow.camera.top = 10;
    light.shadow.camera.bottom = -10;
    light.shadow.camera.left = -10;
    light.shadow.camera.right = 10;

    //告诉平行光需要开启阴影投射
    light.castShadow = true;

    scene.add(light);

    //添加可以移动的点光源
    pointLight = new THREE.PointLight(0x00ffff);
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);

    //给光源添加一个模型显示位置
    pointLight.add(new THREE.Mesh(new THREE.SphereGeometry(0.05, 20, 20), new THREE.MeshBasicMaterial({color:0x00ffff})));
}


function initModel(){
    var helper = new THREE.AxesHelper(50);
    scene.add(helper);

    var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(200, 200), new THREE.MeshPhongMaterial({color:0xffffff, depthWrite:false}));
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);

    var grid = new THREE.GridHelper(200, 50, 0x000000, 0x000000);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add(grid);

    var bump = new THREE.TextureLoader().load("./textures/plaster-normal.jpg");
    var normal = new THREE.TextureLoader().load("./textures/plaster.jpg");

    var material1 =new THREE.MeshPhongMaterial({map:normal});
    material1.normalMap = bump;

    var geometry = new THREE.CubeGeometry(6, 6, 6);
    cube1 = new THREE.Mesh(geometry, material1);
    cube1.position.set(-5, 5, 0);
    cube1.rotation.y += Math.PI/6;
    scene.add(cube1);

    var material2 = new THREE.MeshPhongMaterial({map:normal});
    cube2 = new THREE.Mesh(geometry, material2);
    cube2.position.set(5,5,0);
    cube2.rotation.y -= Math.PI/6;
    scene.add(cube2);
}


var controls;
function initControls(){
    controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function render(){
    if (gui.animation){
        cube1.rotation.y += 0.01;
        cube2.rotation.y -= 0.01;
    }

    angle += 1;
    radian = angle / 180 * Math.PI;
    var x = Math.sin(radian);
    var y = Math.cos(radian);

    if (angle%720 > 360){
        y = -y + 2;
    }

    pointLight.position.z = x * r;
    pointLight.position.x = y* r - r;
}


function animate() {
    //更新控制器
    render();
    //更新性能插件
    controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function draw() {
    //兼容性判断
    initGui();
    initRenderer();
    initScene();
    initCamera();
    initLight();
    initModel();
    initControls();
    animate();
}


draw();