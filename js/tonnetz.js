var scene, camera, renderer;

init();
animate();

function init() {

	scene = new THREE.Scene();
	var WIDTH = window.innerWidth,
	    HEIGHT = window.innerHeight;

	renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
    camera.position.set(0,6,0);
    scene.add(camera);

    window.addEventListener('resize', function() {
      var WIDTH = window.innerWidth,
          HEIGHT = window.innerHeight;
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
    });

    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100,200,100);
    scene.add(light);
 
   	var geom = new THREE.Geometry(); 

   	for (var y = 0; y < 6; y++) {
   		for (var x = 0; x < 7; x++) {
   			var vertex = new THREE.Vector3(100*x + 50*y, 100*y, 0);
   			geom.vertices.push(vertex);
   		}
   	}

	var normal = new THREE.Vector3( 0, 1, 0 ); //optional
   	for (var v = 0; v < geom.vertices.length - 2; v++) {

   		var color = new THREE.Color( 0xff0000 );
   		if ( v % 2 == 0) {
   			color = new THREE.Color( 0x0000ff );
   		}
   		geom.faces.push( new THREE.Face3( v, v+1, v+2, normal, color ) );
   	}

	//geom.faces.push( new THREE.Face3( 0, 1, 2 ) );

	var object = new THREE.Mesh( geom, new THREE.MeshNormalMaterial() );
	scene.add(object);


 	controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function animate() {
	requestAnimationFrame(animate);
 
    // Render the scene.
    renderer.render(scene, camera);
    controls.update();
}