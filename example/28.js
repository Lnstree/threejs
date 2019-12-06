// save and load
var render;
function initRender(){
    render = new THREE.WebGLRenderer({antialias:true});
    render.setSize(window.innerWidth, window.innerHeight);
    render.shadowMap.enabled = true;
    render.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap
    document.body.appendChild(render.domElement)
}

var camera;
function initCamera(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.set(0, 100, 100);
}

var scene;
function initScene(){
    scene = new THREE.Scene();
    console.log(scene)
}

var group, cube, sphere;
function initModel(){
    group = new THREE.Object3D();
    scene.add(group);

    var sphereGeometry = new THREE.SphereGeometry(5, 200, 200);
    var sphereMaterial = new THREE.MeshLambertMaterial({color:0xaaaaaa});

    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.position.x = -5;
        sphere.position.y = 5;
    group.add(sphere);

    var helper = new THREE.AxesHelper(50);
    scene.add(helper);

    var cubeGeometry = new THREE.CubeGeometry(10,10,8);
    var cubeMaterial = new THREE.MeshLambertMaterial({color:0x00ffff});
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = 15;
    cube.position.y = 5;
    cube.position.z = -5;

    //告诉立方体需要投射阴影
    cube.castShadow = true;

    group.add(cube);

    //底部平面
    var planeGeometry = new THREE.PlaneGeometry(100,100);
    var planeMaterial = new THREE.MeshStandardMaterial({color:0xaaaaaa});

    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = - 0.5 * Math.PI;
    plane.position.y = -0;

    //告诉底部平面需要接收阴影
    plane.receiveShadow = true;

    scene.add(plane);

}
var controls;
function initControls() {
    controls = new THREE.OrbitControls( camera, render.domElement );
}


var step = 0.02; //模型旋转的速度


var light;
function initLight() {
    scene.add(new THREE.AmbientLight(0x444444));

    light = new THREE.PointLight(0xffffff);
    light.position.set(15,50,10);

    //告诉平行光需要开启阴影投射
    light.castShadow = true;

    scene.add(light);
}


function animate() {
    group.rotation.y += step;
    // sphere.rotation.y += step;
    // cube.rotation.y += step;
    render.render( scene, camera );
    
    requestAnimationFrame(animate);
}
var gui;
function initGui() {
    //声明一个保存需求修改的相关数据的对象
    gui = {
        exportScene:function () {
            var sceneJson = JSON.stringify(scene.toJSON());
            localStorage.setItem('scene', sceneJson);
        },
        clearScene:function () {
            scene = new THREE.Scene();
        },
        importScene:function () {
            var json = localStorage.getItem("scene");

            if (json) {
                var loadedGeometry = JSON.parse(json);
                var loader = new THREE.ObjectLoader();
                scene = loader.parse(loadedGeometry);
                for (var s in scene.children){
                    s = scene.children[s]
                    if (s.children.length >= 2){
                        group = s
                    }
                }
            }
        }
    };
    var datGui = new dat.GUI();
    //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
    datGui.add(gui, "exportScene");
    datGui.add(gui, "clearScene");
    datGui.add(gui, "importScene");
}

function draw() {
    initRender();
    initScene();
    initCamera();
    initLight();
    initModel();
    initControls();
    initGui();
    animate();
}


draw();