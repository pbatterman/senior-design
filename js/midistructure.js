// convert array to threejs vertices for point cloud rendering
function createGeometry(noteArray) {
	var geometry = new THREE.Geometry();
	var zidx = 0;
 	for (var eventTime in noteArray) {
		var notes = noteArray[eventTime];
		for (var note in notes) {
 			for (var x = 0; x < 7; x++) {
				for (var y = 0; y < 6; y++) {
					if (noteVertices[x][y] == note) {
						var vertex = new THREE.Vector3(100*x + 50*y, 500 - (100*y), zidx);
						// var vertex = new THREE.Vector3(x, y, 0);
						geometry.vertices.push(vertex);
						var col = HSLArrayToString(gColorMap[note]);
   					var vertColor = new THREE.Color( col );
   					geometry.colors.push(vertColor);
					}
				}
			}
 		}
 		zidx += 50;
 	}

 	return geometry;
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
		var note = (noteEvent.noteNumber + 9) % 12;
		if (noteEvent.subtype == "noteOn") {
			currentNotes.push(note);
		}
		else if(noteEvent.subtype == "noteOff") {
			var idx = currentNotes.indexOf(note);
			currentNotes.splice(idx, 1);
		}
		notesForStruct[totalTime] = currentNotes.slice();

	}
	var geometry = createGeometry(notesForStruct);
	return geometry;
}
