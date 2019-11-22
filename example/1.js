var scene = new THREE.Scene()

// 设置相机（视野，显示口的宽高比，近裁剪面，远裁剪面）
var camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight, 0.1, 1000);
// 渲染器
var renderer = new THREE.WebGLRenderer({antialias:true})
// 设置渲染器长宽
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);
// 盒子模型
var geomestry = new THREE.BoxGeometry(1, 2, 1);
// 使用基础材质
var material  = new THREE.MeshBasicMaterial({color:0x00ffff});

//使用网孔(Mesh)来承载几何模型
var cube      = new THREE.Mesh(geomestry, material);
scene.add(cube)
cube.position.z = -10;

function animation(){
    requestAnimationFrame(animation)

    // 每次重绘设置旋转
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera)
}

animation()