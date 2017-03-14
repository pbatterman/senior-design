function buildSongStructure(midifile) {
	var header = midifile.header;
	var tracks = midifile.tracks;

	var events = tracks[1];

	var totalTime = 0;
	var notesForStruct = {};
	var currentNotes = [];

	// if event contains 'noteOn' or 'noteOff' subtype, add note to an object for each time that an event occurs
	for (var e = 0; e < events.length; e++) {
		var noteEvent = events[e];
		if (noteEvent.type != "channel" || (noteEvent.subtype != "noteOn" && noteEvent.subtype != "noteOff")) continue;
		totalTime += noteEvent.deltaTime;
		var note = (noteEvent.noteNumber + 9) % 12;
		if (noteEvent.subtype == "noteOn") {
			currentNotes.push(note);
			notesForStruct[totalTime] = currentNotes;
		}
		else if(noteEvent.subtype == "noteOff") {
			var idx = currentNotes.indexOf(note);
			currentNotes.splice(idx, 1);
			notesForStruct[totalTime] = currentNotes;
		}

	}
	return notesForStruct;
}
