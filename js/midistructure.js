function buildSongStructure(midifile) {
	var header = midifile.header;
	var tracks = midifile.tracks;

	var events = tracks[1];

	var totalTime = 0;
	var notesForStruct = {};

	// if event contains 'noteOn' subtype, add note to an object for each time that an event occurs
	for (var e = 0; e < events.length; e++) {
		var noteEvent = events[e];
		if (noteEvent.type != "channel" || (noteEvent.subtype != "noteOn" && noteEvent.subtype != "noteOff")) continue;
		totalTime += noteEvent.deltaTime;
		if (noteEvent.subtype == "noteOn") {
			if (!notesForStruct[totalTime]) notesForStruct[totalTime] = [];
			notesForStruct[totalTime].push((noteEvent.noteNumber + 9) % 12);
		}

	}
	return notesForStruct;
}