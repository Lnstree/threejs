var camera;
function initCamera(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 10000);
    camera.position.set(0, 100, 200);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
}


var render;
function initRender(){
    render = new THREE.WebGLRenderer({antialias:true});
    render.setSize(window.innerWidth, window.innerHeight);
    render.shadowMap.enabled=true;
    document.body.appendChild(render.domElement);
}

var scene;
function initScene(){
    scene = new THREE.Scene();
}

var light;
var select = "PointLight";
function initLight(){
    scene.add(new THREE.AmbientLight(0xffffff));
    light = new THREE.PointLight(0x444444);
    light.castShadow = true;
    light.position.set(10, 100, 0);
    scene.add(light);
}

var controls;
function initControls(){
    controls = new THREE.OrbitControls(camera, render.domElement);
}


var plane;
function initModel(){
    var planeGeometry = new THREE.PlaneGeometry(1000, 1000);
    var planeMaterial = new THREE.MeshStandardMaterial({color:0xaaaaaa});
    plane  = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.receiveShadow=true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.rotation.y = -0;
    scene.add(plane)

}


var data ="\
.........#...#.#...#.\
.###.#####.###.#.###.\
.#.....#.#...#.#.#.#.\
.###.###.#.###.#.#.#.\
.........#.#.....#.#.\
.#.#.#.#.#.#.#####.#.\
.#.#.#.#.............\
.#.###.#####.#####.##\
.#...#.....#.....#...\
.###.###.#####.#.###.\
.#.....#.....#.#...#.\
.#.#.###.#.###.###.##\
.#.#.#...#.#.#...#...\
##.#####.#.#.#.###.#.\
.......#.#...#.#...#.\
.###.#.###.#.#####.##\
...#.#...#.#.....#...\
##.#.#.###.###.#####.\
...#.#...#...#.....#.\
##.#.###.#####.#.#.#.\
...#...#...#...#.#.#."
        
function drawMaze(width, height, data){
    let size = 10;
    var cubeMaterial  = new THREE.MeshPhysicalMaterial({color:0x3f3f3f});
    var cubeMaterial2 = new THREE.MeshPhysicalMaterial({color:0x8f3f3f});

    for (var i=0; i < height+1; ++i){
        for (var j = 0; j < width+1; j++){
            str += data[i * width + j];
            if (data[i * width + j] == "#"){
                    var cubeGeometry = new THREE.CubeGeometry(size, size, size);
                    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                    cube.position.set(j * size, size, i * size);
                    scene.add(cube);
            }else{
                    var cubeGeometry = new THREE.CubeGeometry(size, size, size);
                    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial2);
                    cube.position.set(j * size, size, i * size);
                    scene.add(cube);
            }
        }
       console.log(str);
    }
}

function animation(){
    render.render(scene, camera);
    requestAnimationFrame(animation);
}


function draw(){
    initScene();
    initRender();
    initCamera();
    initLight();
    initControls();
    initModel();
    drawMaze(20, 20, data);
    animation();

}

draw();