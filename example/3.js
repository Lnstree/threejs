var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 4000)
camera.position.set(0, 0, 3);

var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(0,0,1);
scene.add(light);


// 加载纹理
var map =  new THREE.TextureLoader().load("./textures/box.jpg");
// 设置材质
var material = new THREE.MeshPhongMaterial({map:map});
var geometry = new THREE.CubeGeometry(1, 1, 1);
var cube     = new THREE.Mesh(geometry, material);
scene.add(cube);

function animation(){
    requestAnimationFrame(animation);
    cube.rotation.y += 0.01;
    cube.rotation.x += 0.01;
    renderer.render(scene, camera);
}
animation();