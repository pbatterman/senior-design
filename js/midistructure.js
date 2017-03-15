// convert array to threejs vertices for point cloud
function createGeometry(noteArray, totalTime) {
	var geometry = new THREE.Geometry();
	var zidx = 0;
	var notes;
 	// for (var eventTime in noteArray) {
 	for (var t = 0; t < totalTime; t++) {
 		if (noteArray[t]) {
 			notes = noteArray[t];
 		}
 		if (!notes) continue;
		// var notes = noteArray[eventTime];
		for (var n = 0; n < notes.length; n++) {
			var note = notes[n];
 			for (var x = 0; x < 7; x++) {
				for (var y = 0; y < 6; y++) {
					if (noteVertices[x][y] == (note % 12)) {
						octaveShift = Math.floor(note / 12) * 280;
						var vertex = new THREE.Vector3(40*x + 20*y, 200 - (40*y), t);
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
