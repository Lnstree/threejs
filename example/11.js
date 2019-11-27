// 多种材质比较
// MeshBasicMaterial（网格基础材质）	基础材质，用于给几何体赋予一种简单的颜色，可以显示几何体的线框
// MeshDepthMaterial（网格深度材质）	这个材质使用从摄像机到网格的距离来决定如何给网格上色
// MeshNormalMaterial（网格法向材质）	这是一种简单的材质，根据法向向量计算物体表面的颜色
// MeshFaceMaterial（网格面材质）	这是一个容器，可以为几何体的各个表面指定不同的材质
// MeshLambertMaterial（网格Lambert材质）	这是一种考虑光照影响的材质，用于创建暗淡的、不光亮的物体
// MeshPhongMaterial（网格Phong材质）	这是一种考虑光照的材质，用于创建光亮的物体
// ShaderMaterial（着色器材质）	这种材质允许使用自定义的着色器程序，直接控制顶点的放置方式以及像素的着色方式
// LineBasicMaterial（直线基础材质）	这种材质可以用于THREE.Line（直线）几何体，用来创建着色的直线
// LineDashMaterial（虚线材质）	这种材质与LineBasicMaterial（直线基础材质）一样，但允许创建出一种虚线的效果
// 属性
// id（标识符）	用来识别材质，并在材质创建时赋值。第一个材质的值从0开始，每新加一个材质，这个值增加1
// uuid（通用唯一识别码）	这是生成的唯一id，在内部使用
// name（名称）	可以通过这个属性赋予材质名称，用于调试的目的
// opacity（不透明度）	定义物体的透明度。与transparent属性一起使用。该属性的赋值范围从0到1
// transparent（是否透明）	如果该值设置为true，Three.js会使用指定的不透明度渲染物体。如果设置为false，这个物体就不透明–只是着色更明亮些。如果使用alpha（透明度）通道的纹理，该属性应该设置为true。
// overdraw（过渡描绘）	当你使用THREE.CanvasRender时，多边形会被渲染得稍微大一点。当使用这个渲染器渲染的物体有间隙时，可以将这个属性设置为true
// visible（是否可见）	定义该材质是否可见。如果设置为false，那么在场景中就看不到该物体
// side（侧面）	通过这个属性，可以定义几何体的哪一面应用材质。默认值为THREE.FrontSide（前面），这样可以将材质应用到物体的前面（外侧）。也可以将其设置为THREE.BackSide（后面），这样可以将材质应用到物体的后面（内侧）。或者也可以将它设置为THREE.DoubleSide（双侧），可将材质应用到物体的内外两侧
// needsUpdate（是否更新）	对于材质的某些修改，你需要告诉Three.js材质已经改变了。如果设置为true，Three.js会使用新的材质属性更新它的缓存

var camera;
function initCamera(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 400);
}


var renderer;
function initRenderer(){
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    document.body.appendChild(renderer.domElement);
}


var scene;
function  initScene(){
    scene = new THREE.Scene();
}

var light;

function initLight(){
    scene.add(new THREE.AmbientLight(0x444444));
    light = new THREE.PointLight(0xffffff);
    light.position.set(13,30, 10);
    light.castShadow = true;
    scene.add(light);
}

var planet;
function initPlane(){
    var planGemotry = new THREE.PlaneGeometry(100, 100);
    var planMaterial = new THREE.MeshLambertMaterial({color:0x00fffff});
    planet = new THREE.Mesh(planGemotry, planMaterial);
    planet.position.set(-10, -10, 0);
    planet.rotation.x = -0.5 * Math.PI;
    planet.rotation.y = -0;
    planet.receiveShadow = true;
    scene.add(planet);
}

function initModel(){
    var sphereGeometry = new THREE.SphereGeometry(10, 30, 10);
    var sphereMaterial = new THREE.MeshPhysicalMaterial({color:0xffffff});
    var sp = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sp.castShadow = true;
    sp.position.set(-20, 0, 0);
    scene.add(sp);


    var sphereMaterial2 = new THREE.MeshLambertMaterial({color:0xffffff});
    var sp2 = new THREE.Mesh(sphereGeometry, sphereMaterial2);
    sp2.castShadow = true;
    sp2.position.set(10, 0, 0);
    scene.add(sp2);

    var sphereMaterial3 = new THREE.MeshStandardMaterial({color:0xffffff});
    var sp3 = new THREE.Mesh(sphereGeometry, sphereMaterial3);
    sp3.position.set(10, 0, -30);
    sp3.castShadow = true;
    scene.add(sp3);
}

var controls;
function initControls(){
    controls = new THREE.OrbitControls( camera, renderer.domElement );

    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //controls.dampingFactor = 0.25;
    //是否可以缩放
    controls.enableZoom = true;
    //是否自动旋转
    controls.autoRotate = false;
    //设置相机距离原点的最远距离
    controls.minDistance  = 100;
    //设置相机距离原点的最远距离
    controls.maxDistance  = 200;
    //是否开启右键拖拽
    controls.enablePan = true;
}


function render(){
    renderer.render(scene, camera);
}

function animate(){
    render();
    controls.update();
    requestAnimationFrame(animate)
}

function draw(){
    initScene();
    initRenderer();
    initLight();
    initPlane();
    initModel();
    initCamera();
    initControls();
    animate();
}

draw();