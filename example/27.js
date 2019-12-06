// THREE.Merge
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
}


var gui;
var cubeMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00, transparent: true, opacity: 0.8});
function initGui(){
    gui = {
        numberOfObjects:500, //当前场景中模型的个数            //THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.
        merge: false,
        redraw(){
            var arr = [];
            scene.traverse(function (e) {
                if (e instanceof THREE.Mesh) arr.push(e);
            });

            arr.forEach(function (value) {
                scene.remove(value);
            });

            if (gui.merge){
                var geometry = new THREE.Geometry();
                    for(var i=0; i<gui.numberOfObjects; i++){
                        var cube = createBox();
                        cube.updateMatrix();
                        geometry.merge(cube.geometry, cube.matrix);
                    }
                    scene.add(new THREE.Mesh(geometry, cubeMaterial));
            }else{
                for(var i=0; i<gui.numberOfObjects; i++){
                    scene.add(createBox());
                }
            }
        }
    }

    var datGui = new dat.GUI();
    //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）

    //添加旋转功能
    datGui.add(gui, "numberOfObjects", 0, 20000);
    datGui.add(gui, "merge");
    datGui.add(gui, "redraw");

    gui.redraw();
}

function createBox(){
    var helper = new THREE.AxesHelper(50);
    scene.add(helper);

    var cubeGeometry = new THREE.CubeGeometry(5,5,5);
    var cubeMaterial = new THREE.MeshLambertMaterial({color:0x00ffff});
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = -100+Math.round(Math.random()*200);
    cube.position.y = -100+Math.round(Math.random()*200);
    cube.position.z = -100+Math.round(Math.random()*200);

    return cube;
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
    render.render( scene, camera );
    
    requestAnimationFrame(animate);
}

function draw() {
    // initGui();
    initRender();
    initScene();
    initCamera();
    initLight();
    initControls();
    initGui();

    animate();
}


draw();