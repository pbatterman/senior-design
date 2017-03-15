// construct tonnetz geometry
function buildTemplateTonnetzGeometry() {
	var geometry = new THREE.Geometry();
   	vertexColors = [];
   	vertexKey = [];

   	var mag = 40;

   	for (var y = 0; y < 6; y++) {
   		for (var x = 0; x < 7; x++) {
   			var vertex = new THREE.Vector3(mag*x + mag*0.5*y, mag*5 - (mag*y), 0);
   			geometry.vertices.push(vertex);
   			vertexKey.push(noteVertices[x][y]);
   			var col = HSLArrayToString(gColorMap[x][y]);
   			var vertColor = new THREE.Color( col );
   			vertexColors.push(vertColor);
   		}
   	}

   	for (var v = 0; v < geometry.vertices.length - 1; v++) {
   		// first row
   		if ( v < 6 ) {
   			var face1 = new THREE.Face3( v, v+1, v+7 );
   			face1.normal.set(0,0,1);
 				face1.vertexColors[0] = vertexColors[v];
				face1.vertexColors[1] = vertexColors[v+1];
				face1.vertexColors[2] = vertexColors[v+7];
   			

				geometry.faces.push( face1 );
   		}
   		// middle rows
   		else if (( v > 6 && v < 13 ) || (v > 13 && v < 20) || (v > 20 && v < 27) || (v > 27 && v < 34)) {
   			var face0 = new THREE.Face3( v-6, v+1, v);
   			face0.normal.set(0,0,1);
   			face0.vertexColors[0] = vertexColors[v-6];
				face0.vertexColors[1] = vertexColors[v+1];
				face0.vertexColors[2] = vertexColors[v];

   			geometry.faces.push( face0 );
   			
   			var face1 = new THREE.Face3( v, v+1, v+7 );
   			face1.normal.set(0,0,1);
   			face1.vertexColors[0] = vertexColors[v];
				face1.vertexColors[1] = vertexColors[v+1];
				face1.vertexColors[2] = vertexColors[v+7];


				geometry.faces.push( face1 );
		}
   		else if (v > 34 && v < 41) {
   			var face0 = new THREE.Face3( v-6, v+1, v);
   			face0.normal.set(0,0,1);
   			face0.vertexColors[0] = vertexColors[v-6];
				face0.vertexColors[1] = vertexColors[v+1];
				face0.vertexColors[2] = vertexColors[v];


   			geometry.faces.push( face0 );
   		}
   		else {
   			continue;
   		}
   	}
  return geometry;
}


// convert array to threejs vertices for point cloud rendering
function createGeometry(noteArray, totalTime) {
	var geometry = new THREE.Geometry();
	var tonnetzGeo = [];
	var zidx = 0;
	var notes;
	var result = {};
 	// for (var eventTime in noteArray) {
 	for (var t = 0; t < totalTime; t++) {
 		if (noteArray[t]) {
 			notes = noteArray[t];
 			var singleTon = buildTemplateTonnetzGeometry();
 			tonnetzGeo.push(singleTon);
 		}
 		if (!notes) continue;
		// var notes = noteArray[eventTime];
		for (var n = 0; n < notes.length; n++) {
			var note = notes[n];
 			for (var x = 0; x < 7; x++) {
				for (var y = 0; y < 6; y++) {
					if (noteVertices[x][y] == (note % 12)) {
						octaveShift = Math.floor(note / 12) * 280;
						var vertex = new THREE.Vector3(40*x + 20*y + octaveShift - (280*3.5), 200 - (40*y), t);
						// var vertex = new THREE.Vector3(x, y, 0);
						geometry.vertices.push(vertex);
						var col = HSLArrayToString(gColorMap[note % 12]);
   					var vertColor = new THREE.Color( col );
   					geometry.colors.push(vertColor);
					}
				}
			}
 		}
 		zidx += 50;
 	}
 	result.notes = geometry;
 	result.tonnetz = tonnetzGeo;

 	return result;
}

function buildSongStructure(midifile) {
	var header = midifile.header;
	var tracks = midifile.tracks;

	var events = tracks[1];

	var totalTime = 0;
	var notesForStruct = {};
	var currentNotes = [];

	// if event contains 'noteOn' or 'noteOff' subtypes, add note to an object for each time that an event occurs
	for (var e = 0; e < events.length; e++) {
		var noteEvent = events[e];
		if (noteEvent.type != "channel" || (noteEvent.subtype != "noteOn" && noteEvent.subtype != "noteOff")) continue;
		totalTime += noteEvent.deltaTime;
		var note = (noteEvent.noteNumber + 9);
		if (noteEvent.subtype == "noteOn") {
			currentNotes.push(note);
		}
		else if(noteEvent.subtype == "noteOff") {
			var idx = currentNotes.indexOf(note);
			currentNotes.splice(idx, 1);
		}
		notesForStruct[totalTime] = currentNotes.slice();

	}
	var geometry = createGeometry(notesForStruct, totalTime);
	return geometry;
}
