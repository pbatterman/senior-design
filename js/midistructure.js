function buildSongStructure(midifile) {
	var header = midifile.header;
	var tracks = midifile.tracks;

	var events = tracks[1];

	var totalTime = 0;
	var notesForStruct = {};
	var previousEventTime = 0;

	// if event contains 'noteOn' or 'noteOff' subtype, add note to an object for each time that an event occurs
	for (var e = 0; e < events.length; e++) {
		var noteEvent = events[e];
		if (noteEvent.type != "channel" || (noteEvent.subtype != "noteOn" && noteEvent.subtype != "noteOff")) continue;
		if (noteEvent.deltaTime != 0) previousEventTime = totalTime;
		totalTime += noteEvent.deltaTime;
		var note = (noteEvent.noteNumber + 9) % 12;
		if (noteEvent.subtype == "noteOn") {
			if (!notesForStruct[totalTime]) notesForStruct[totalTime] = [];
				notesForStruct[totalTime].push(note);
		}
		else if(noteEvent.subtype == "noteOff") {
			var previousNotes = notesForStruct[previousEventTime];
				var idx = previousNotes.indexOf(note);
				previousNotes.splice(idx, 1);
				notesForStruct[totalTime] = previousNotes;
		}

	}
	return notesForStruct;
}
