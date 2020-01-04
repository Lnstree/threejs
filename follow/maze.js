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


function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) 
{	
	// note: texture passed by reference, will be updated by the update function.
		
	this.tilesHorizontal = tilesHoriz;
	this.tilesVertical = tilesVert;
	// how many images does this spritesheet contain?
	//  usually equals tilesHoriz * tilesVert, but not necessarily,
	//  if there at blank tiles at the bottom of the spritesheet. 
	this.numberOfTiles = numTiles;
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
	texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

	// how long should each image be displayed?
	this.tileDisplayDuration = tileDispDuration;

	// how long has the current image been displayed?
	this.currentDisplayTime = 0;

	// which image is currently being displayed?
	this.currentTile = 0;
		
	this.update = function( milliSec )
	{
		this.currentDisplayTime += milliSec;
		while (this.currentDisplayTime > this.tileDisplayDuration)
		{
			this.currentDisplayTime -= this.tileDisplayDuration;
			this.currentTile++;
			if (this.currentTile == this.numberOfTiles)
				this.currentTile = 0;
			var currentColumn = this.currentTile % this.tilesHorizontal;
			texture.offset.x = currentColumn / this.tilesHorizontal;
			var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
			texture.offset.y = currentRow / this.tilesVertical;
		}
	};
}		

var AM;

function initSprite(){
    var spriteMap = new THREE.TextureLoader().load('textures/mu.png');
    // spriteMap.wrapS = spriteMap.wrapT = THREE.RepeatWrapping; 
    // spriteMap.offset.x = 1;
    // spriteMap.repeat.set(0.5, 1); 

    AM = new TextureAnimator(spriteMap, 2, 1, 2, 100);
    var spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });
    var sprite = new THREE.Sprite(spriteMaterial);


    sprite.scale.set(10, 10, 1)
    sprite.position.set(200, 20, 1);
    scene.add(sprite);
}

var data ="\
#####################\
#...#.........#...#.#\
###.#.#########.###.#\
#...........#.......#\
#.###.#######.#######\
#.#.........#.....#.#\
#####.#####.#.#.###.#\
#.........#...#.#...#\
#####.###.#.#.#.#.#.#\
#.....#.#.#.#.#...#.#\
#.#####.#.###.###.#.#\
#.......#...#...#.#.#\
#.#.#.#.#.#.#.#####.#\
#.#.#.#.#.#.#...#...#\
#.#######.#####.###.#\
#.....#.......#.#...#\
###.#########.#####.#\
#...........#.#.....#\
#.#.###.#.#######.###\
#.#.#...#.......#...#\
#####################";
        
function drawMaze(width, height, data){
    let size = 10;
    var cubeMaterial  = new THREE.MeshPhysicalMaterial({color:0x3f3f3f});
    var cubeMaterial2 = new THREE.MeshPhysicalMaterial({color:0x8f3f3f});

    for (var i=0; i < height +1; ++i){
        for (var j = 0; j < width +1; j++){
            if (data[i * 21 + j] == "#"){
                    var cubeGeometry = new THREE.CubeGeometry(size, size, size);
                    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                    cube.position.set(j * size, size, i * size);
                    scene.add(cube);
            }else{
            }
        }
    }
}
var clock = new THREE.Clock();

function animation(){
    render.render(scene, camera);
    var delta = clock.getDelta(); 
    AM.update(1000 * delta);
    requestAnimationFrame(animation);
}


function draw(){
    initScene();
    initRender();
    initCamera();
    initLight();
    initControls();
    initModel();
    initSprite();
    drawMaze(20, 20, data);
    animation();

}

draw();