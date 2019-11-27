// 融合材质
var render;
function initRender(){
    render = new THREE.WebGLRenderer({antialias:true, alpha:true});
    render.setSize(window.innerWidth, window.innerHeight);
    render.setClearColor(new THREE.Color(0x00000));
    document.body.appendChild(render.domElement);
}


var camera;
function initCamera(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0,40, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0))
}


var scene;
function initScene(){
    scene = new THREE.Scene();
}

function initControls(){
    var controls = new THREE.OrbitControls(camera, render.domElement)
}

function initLight(){
    // scene.add(new THREE.AmbientLight(0xffffff))
}

function initModel(){
    var helper = new THREE.AxesHelper(10);
    scene.add(helper);

    var s = 25;
    var cube = new THREE.CubeGeometry(s, s, s);

     //方块使用的网格深度材质
     var cubeMaterial = new THREE.MeshDepthMaterial();
     //方块使用的网格基础材质
     var colorMaterial = new THREE.MeshBasicMaterial({
         color: 0x00ff00,
         transparent: true,
         blending: THREE.MultiplyBlending
     });

    for (var i = 0; i < 3000; ++i){
        var mesh = new THREE.SceneUtils.createMultiMaterialObject(cube, [colorMaterial, cubeMaterial]);
        // var mesh = new THREE.SceneUtils.createMultiMaterialObject(cube, [colorMaterial]);
        mesh.children[1].scale.set(0.97, 0.97, 0.97);

        mesh.position.x = 800 * (2.0 * Math.random() - 1.0);
        mesh.position.y = 800 * (2.0 * Math.random() - 1.0);
        mesh.position.z = 800 * (2.0 * Math.random() - 1.0);

        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        mesh.rotation.z = Math.random() * Math.PI;

        mesh.updateMatrix();

        scene.add(mesh);
    }
}

function animation(){
     //让立方体动起来
     for(var i=0; i<scene.children.length; i++){
        scene.children[i].rotation.x += 0.02;
        scene.children[i].rotation.y += 0.02;
        scene.children[i].rotation.z += 0.02;
    }
    render.render(scene, camera);
    requestAnimationFrame(animation)
}


function draw(){
    initScene();
    initCamera();
    initRender();
    initLight();
    initControls();
    initModel();
    animation();
}

draw();