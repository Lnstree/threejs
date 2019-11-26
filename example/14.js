// light
//THREE.AmbientLight	这是一个基础光源，也叫环境光源，该光源的颜色将会叠加到场景现有的颜色上面，无法创建阴影。
//THREE.PointLight	    点光源，从空间的一点向所有方向发射光源。
//THREE.SpotLight	    这种光源有聚光的效果，类似台灯、天花板上的吊灯或者手电筒。
///THREE.DirectionalLight	无限光，平行光。从这种光源发出的光线可以看作是平行的，比如太阳光。
//THREE.HemisphereLight	这是一种特殊光源，可以通过模拟反光面和光线微弱的天空来创建更加自然的室外光线。无法创建阴影。
//THREE.AreaLight	    使用这种光源可以指定散发光线的平面，而不是一个点。无法创建阴影。
//THREE.LensFlare	    这不是一种光源，但是通过使用THREE.LensFlare，可以为场景中的光源添加镜头光晕效果。


var camera;
function initCamera(){
}


var render;
function initRender(){

}

var scene;
function initScene(){

}

var light;
function initLight(){
}

var settings;
function initGui(){
    settings = {
        'lightType': "",
    }

    var gui = new dat.GUI();
    gui.add(settings, 'lightType',['PointLight', 'SpotLight', 'DirectionLight', 'HemisphereLight', 'AreaLight', 'LensFlare'] )
}

initGui();

function animation(){
    console.log(settings.lightType)
    requestAnimationFrame(animation);
}


function draw(){
    animation();
}

// draw();