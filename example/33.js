// 使用normalMap
var renderer, camera, scene, gui, light, controls, cube1, cube2;


function initRenderer(){
    renderer = new THREE.WebGLRenderer({antialias:true})
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xeeeeee);
    renderer.shadowMap.enable = true;
    document.body.appendChild(renderer.domElement);
}


function initCamera(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 200);
    camera.position.set(0, 5, 15);
}

function initScene(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);
    // scene.fog = new THREE.Fog(0xa0a0a0, 5, 50);
}



function initGui(){
    gui = {
        bump: 0.03,
        animation:false
    };

    var datGui = new dat.GUI();
    datGui.add(gui, "bump", -1, 1).onChange(function(e){
        console.log(e)
        cube1.material.bumpScale = e;
    })
    datGui.add(gui, "animation");
}

function initLight(){
    scene.add(new THREE.AmbientLight(0x4444444));
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 20, 10);

    light.castShadow = true;
    light.shadow.camera.top = 10;
    light.shadow.camera.bottom = -10;
    light.shadow.camera.left = -10;
    light.shadow.camera.right = 10;

    light.castShadow = true;
    scene.add(light)
}


function initModel(){
    var helper = new THREE.AxesHelper(50);
    scene.add(helper);

    var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(200, 200), new THREE.MeshPhongMaterial({color:0xffffff, depthWrite:false}));
    mesh.rotation.x = -Math.PI/2;
    mesh.receiveShadow = true;
    scene.add(mesh);

    var grid  = new THREE.GridHelper(200, 50, 0x000000, 0x000000);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add(grid);

    var bump = new THREE.TextureLoader().load("./textures/brick_bump.jpg");
    var normal =  new THREE.TextureLoader().load("./textures/brick_diffuse.jpg");
    var marital1 = new THREE.MeshPhongMaterial({map:normal});
    marital1.bumpMap = bump;
    marital1.bumpScale = 0.03;

    var geometry = new THREE.CubeGeometry(8, 8, 4);
    cube1 = new THREE.Mesh(geometry, marital1);
    cube1.position.set(-5, 5, 0);
    scene.add(cube1);

    var materal2 = new THREE.MeshPhongMaterial({map:normal});
    cube2 = new THREE.Mesh(geometry, materal2);
    cube2.position.set(5, 5, 0);
    scene.add(cube2);
}


function initControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function render() {
    if(gui.animation){
        cube1.rotation.y += 0.01;
        cube2.rotation.y -= 0.01;
    }
    controls.update();
}

function animate() {
    //更新控制器
    render();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}


function draw(){
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