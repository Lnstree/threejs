// 鼠标交互
var render;
function initRender(){
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0xffffff));
    document.body.appendChild(renderer.domElement);
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


var controls;
function initControls(){
    controls = new THREE.OrbitControls(camera, renderer.domElement);
}

  //随机生成颜色
  function randomColor() {
    var arrHex = ["0","1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d","e","f"],
        strHex = "#",
        index;
    for(var i = 0; i < 6; i++) {
        index = Math.round(Math.random() * 15);
        strHex += arrHex[index];
    }
    return strHex;
}

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseClick(event){
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
        raycaster.setFromCamera( mouse, camera );

        // 获取raycaster直线和所有模型相交的数组集合
        var intersects = raycaster.intersectObjects( scene.children );

        console.log(intersects);

        //将所有的相交的模型的颜色设置为红色，如果只需要将第一个触发事件，那就数组的第一个模型改变颜色即可
        for ( var i = 0; i < intersects.length; i++ ) {
            intersects[ i ].object.material.color.set( 0xfff000 );
        }
}
window.addEventListener( 'click', onMouseClick, false );

function initModel(){
    var geometry = new THREE.BoxGeometry(4, 4, 4);


    for (var i = -100; i < 100; i++){
        
        var material = new THREE.MeshBasicMaterial({color:randomColor()});
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = i  * Math.random() * 10;
        mesh.position.y = i  * Math.random() * 10;
        mesh.position.z = i  * Math.random() * 10;
        scene.add(mesh);
    }
}


function animation(){
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
}


function draw(){
    initScene();
    initRender();
    initCamera();
    initControls();
    initModel();
    animation();
}

draw();

