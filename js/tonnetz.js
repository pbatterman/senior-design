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
	var v1 = new THREE.Vector3(0,0,0);
	var v2 = new THREE.Vector3(0,500,0);
	var v3 = new THREE.Vector3(0,500,500);

	geom.vertices.push(v1);
	geom.vertices.push(v2);
	geom.vertices.push(v3);

	geom.faces.push( new THREE.Face3( 0, 1, 2 ) );

	var object = new THREE.Mesh( geom, new THREE.MeshNormalMaterial() );
	scene.addObject(object);


 	controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function animate() {
	requestAnimationFrame(animate);
 
    // Render the scene.
    renderer.render(scene, camera);
    controls.update();
}