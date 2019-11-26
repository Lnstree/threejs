//Mesh 属性与方法

var renderer;
function initRender(){
    renderer = new THREE.WebGLRenderer({antialias:true})
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

var settings;
function initGui(){
    settings = {
        positionX:0,
        positionY:5,
        positionZ:0,
        rotationX:0,
        rotationY:0,
        rotationZ:0,
        scaleX:1,
        scaleY:1,
        scaleZ:1,
        translateX:0,
        translateY:0,
        translateZ:0,
        translate: function(){
            cube.translateX(settings.translateX)
            cube.translateY(settings.translateY)
            cube.translateZ(settings.translateZ)

            settings.translateX = cube.translateX
            settings.translateY = cube.translateY
            settings.translateZ = cube.translateZ
        },
        visible: true
    }

    var gui = new dat.GUI();
    var position = gui.addFolder("position")
    position.add(settings, "positionX", -30, 30).listen();
    position.add(settings, "positionY", -30, 30).listen();
    position.add(settings, "positionZ", -30, 30).listen();
    var scale = gui.addFolder("scale");
    scale.add(settings, "scaleX", 0.01, 5);
    scale.add(settings, "scaleY", 0.01, 5);
    scale.add(settings, "scaleZ", 0.01, 5);

    var rotation = gui.addFolder("rotation");
    rotation.add(settings,"rotationX",-2*Math.PI,2*Math.PI);
    rotation.add(settings,"rotationY",-2*Math.PI,2*Math.PI);
    rotation.add(settings,"rotationZ",-2*Math.PI,2*Math.PI);

    // var translate = gui.addFolder("translate");
    // translate.add(settings,"translateX",-5,5);
    // translate.add(settings,"translateY",-5,5);
    // translate.add(settings,"translateZ",-5,5);
        // translate.add(settings,"translate");
    gui.add(settings,"visible");
}


var light;
function initLight(){
    scene.add(new THREE.AmbientLight(0x444444));
    light = new THREE.PointLight(0xffffff);
    light.castShadow = true;
    light.position.set(0, 100, 20);
    scene.add(light);
}

var cube;
function initModel(){
    var cubeGeometry = new THREE.CubeGeometry(10, 10, 10);
    var cubeMaterial = new THREE.MeshLambertMaterial({color:0x00ffff});
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cube.castShadow = true;
    scene.add(cube);


    var planeGemotry = new THREE.PlaneGeometry(100, 100);
    var planeMaterial = new THREE.MeshStandardMaterial({color:0xaaaaaa});

    var plane = new THREE.Mesh(planeGemotry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.rotation.y =-0;
    plane.receiveShadow = true;
    scene.add(plane);
}

var stats;
function initStats(){
    stats = new Stats();
    document.body.appendChild(stats.dom);
}


var controls;
function initControls(){
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 100;
    controls.maxDistance = 200;
    controls.enablePan = true;
}


function render(){
    renderer.render(scene, camera);
}

function animate(){
    render();
    stats.update();

    cube.position.set(settings.positionX,settings.positionY,settings.positionZ);
    cube.scale.set(settings.scaleX,settings.scaleY,settings.scaleZ);
    cube.rotation.set(settings.rotationX,settings.rotationY,settings.rotationZ);
    cube.visible = settings.visible;
    controls.update();
    requestAnimationFrame(animate);
}

function draw(){
    initGui();
    initRender();
    initScene();
    initCamera();
    initLight();
    initModel();
    initControls();
    initStats();

    animate();
}



draw();