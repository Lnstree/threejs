var scene    = new THREE.Scene()
render = new THREE.WebGLRenderer({antialias: true});
var width = window.innerWidth;
var height = window.innerHeight;
render.setSize(width, height);
document.body.appendChild(render.domElement);

camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
camera.position.set(0, 40, 100)
camera.lookAt(new THREE.Vector3(0, 0, 0));


var gemoetry = new THREE.SphereGeometry(10, 30, 30);
var material = new THREE.MeshPhongMaterial({color:0xeeeeee});
var earthmesh = new THREE.Mesh(gemoetry, material);
earthmesh.position.set(-20,20,0);
earthmesh.castShadow = true;

var ambientLight = new THREE.AmbientLight("#111111");
scene.add(ambientLight)
var spotLight = new THREE.PointLight("#ffffff");
spotLight.position.set(160, 180, 12);
spotLight.castShadow = true;
scene.add(spotLight)

var planeGeometry = new THREE.PlaneGeometry(5000, 5000, 20, 20);
var planeMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });

plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;

//告诉底部平面需要接收阴影
scene.add(plane);


scene.add(earthmesh)

function animation(){
    requestAnimationFrame(animation)
    render.render(scene, camera);
}


animation()