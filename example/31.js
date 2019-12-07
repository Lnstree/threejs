// Bone
var camera;
function initCamera(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0, 40, 50);
}

var renderer;
function initRender() {
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xeeeeee);
    //告诉渲染器需要阴影效果
    document.body.appendChild(renderer.domElement);
}

var scene;
function initScene(){
    scene = new THREE.Scene();
}

var light;
function initLight(){
    scene.add(new THREE.AmbientLight(0x444444));

    light = new THREE.PointLight(0xffffff);
    light.position.set(0, 50, 0);
    light.castShadow = true;
    scene.add(light);
}


function initModel(){
    var helper = new THREE.AxesHelper(50);
    scene.add(helper);

    var segmentHeight = 6;
    var segmentCount  = 4;

    // 总高度
    var height = segmentHeight * segmentCount;
    var halfHeight = height * 0.5;

    var sizing = {
        segmentHeight : segmentHeight,
        segmentCount  : segmentCount,
        height : height,
        halfHeight : halfHeight
    };
    var geometry  = createGeometry(sizing);
    var bones = createBones( sizing ); //创建骨骼
    mesh = createMesh( geometry, bones ); //创建网格模型

    //mesh.scale.multiplyScalar( 1 );
    scene.add( mesh );
}


function createGeometry (sizing){
    // var geometry = new THREE.CylinderBufferGeometry(5, 5, sizing.height, 8, sizing.segmentCount * 3, true);

    // var len = geometry.faces.length;
    // for (var i = 0; i < len; i++){
    //     var face = geometry.faces[i].clone();
    //     face.materialIndex = 1;
    //     geometry.faces.push(face);
    // }

    // var len = geometry.faceVertexUvs[0].length;

    // for (var i = 0; i < len; ++i){
    //     geometry.faceVertexUvs[0].push(geometry.faceVertexUvs[0][i]);
    // }

    // for (var i = 0; i < geometry.vertices.length; ++i){
    //     var vertex =  geometry.vertices[i];
    //     var y = (vertex.y + sizing.halfHeight);

    //     var skinIndex = Math.floor(y / sizing.segmentHeight);
    //     var skinWeight = (y % sizing.segmentHeight) / sizing.segmentHeight;

    //     geometry.skinIndices.push( new THREE.Vector4( skinIndex, skinIndex + 1, 0, 0 ) );
    //     geometry.skinWeights.push( new THREE.Vector4( 1 - skinWeight, skinWeight, 0, 0 ) );
    // }

    // return  geometry;

    var geometry  = new THREE.CylinderBufferGeometry(5, 5, sizing.height, 8, sizing.segmentCount * 3, 5, 30);
    var position  = geometry.attributes.position;
    var vertex    = new THREE.Vector3();

    var skinIndices = [];
    var skinWeights = [];

    for (var i = 0; i < position.count; ++i){
        vertex.fromBufferAttribute(position, i);

        var y = (vertex.y + sizing.halfHeight);
        var skinIndex = Math.floor(y / sizing.segmentHeight);
        var skinWeight = (y % sizing.segmentHeight) / sizing.segmentHeight;
        skinIndices.push(skinIndex, skinIndex + 1, 0, 0);
        skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
    }

    geometry.setAttribute( 'skinIndex', new THREE.Uint16BufferAttribute( skinIndices, 4 ) );
    geometry.setAttribute( 'skinWeight', new THREE.Float32BufferAttribute( skinWeights, 4 ) );
    return geometry;

}

var bones;
function createBones(sizing){
    bones = [];
    var prevBone = new THREE.Bone();
    bones.push(prevBone);
    prevBone.position.y = -sizing.halfHeight;

    for (var i = 0; i < sizing.segmentHeight; ++i){
        var bone = new THREE.Bone();
        bone.position.y = sizing.segmentHeight;
        bones.push(bone);
        prevBone.add(bone);
        prevBone = bone;
    }
    return bones;
}


function createMesh(geometry, bones){
    var material = new THREE.MeshPhongMaterial({
        skinning : true,
        color: 0x156289,
        emissive: 0x072534,
        side: THREE.DoubleSide,
        flatShading:true
    });

    var lineMaterial = new THREE.MeshBasicMaterial({
        skinning : true,
        wireframe: true
    });

    // geometry = new THREE.BoxBufferGeometry(5, 5, 5);
    console.log(geometry)
    mesh = new THREE.SkinnedMesh( geometry,	[material, lineMaterial] );
    var skeleton = new THREE.Skeleton( bones ); //创建骨架

    mesh.add( bones[ 0 ] ); //将骨骼添加到模型里面
    mesh.bind( skeleton ); //模型绑定骨架
    //添加骨骼辅助标记
    skeletonHelper = new THREE.SkeletonHelper( mesh );
    skeletonHelper.material.linewidth = 2;
    scene.add( skeletonHelper );

    return mesh;
}

function initControls() {

    controls = new THREE.OrbitControls(camera, renderer.domElement);

}

function render() {
    var time = Date.now() * 0.001;

    //Wiggle the bones
    if ( state.animateBones ) {

        for ( var i = 0; i < mesh.skeleton.bones.length; i ++ ) {

            mesh.skeleton.bones[ i ].rotation.z = Math.sin( time ) * 2 / mesh.skeleton.bones.length;

        }

    }

    controls.update();
}

var gui;
var state = {
    animateBones : false
};

function initGui(){
    gui = new dat.GUI();
    var folder = gui.addFolder("General Options");
    folder.add(state, "animateBones");
    folder.__controllers[0].name("Animate Bones");

    folder.add(mesh, "pose");
    folder.__controllers[1].name(".pose()");
}

function animate() {
    //更新控制器
    render();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
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


draw()