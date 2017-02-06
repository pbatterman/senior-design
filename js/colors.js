function getColorMap() {

	var primaryColors = {
		0: [ 360, 96, 51 ],
		1: [ 14, 91, 51 ],
		2: [ 29, 94, 52 ],
		3: [ 49, 90, 60 ],
		4: [ 60, 90, 60 ],
		5: [ 135, 76, 32 ],
		6: [ 172, 68, 34 ],
		7: [ 248, 82, 28 ],
		8: [ 273, 80, 27 ],
		9: [ 302, 88, 26 ],
		10: [ 313, 78, 37 ],
		11: [ 325, 84, 46 ]
	}
	var secondaryColors = { //offset by half from primary for testing
		5: [ 360, 96, 51 ],
		6: [ 14, 91, 51 ],
		7: [ 29, 94, 52 ],
		8: [ 49, 90, 60 ],
		9: [ 60, 90, 60 ],
		10: [ 135, 76, 32 ],
		11: [ 172, 68, 34 ],
		0: [ 248, 82, 28 ],
		1: [ 273, 80, 27 ],
		2: [ 302, 88, 26 ],
		3: [ 313, 78, 37 ],
		4: [ 325, 84, 46 ]
	}

	var primaryNoteColors = {};
	var secondaryNoteColors = {};

	for (var note = 0; notes < 88; note++) {

		var pCol = primaryColors[(note + 9) % 12];
		var phslCol = 'hsla(' + pCol[0] + ',' + pCol[1] + '%,' + pCol[2] + '%, 1)',
		primaryNoteColors[note] = phslCol;

		var sCol = secondaryColors[(note + 9) % 12];
		var shslCol = 'hsla(' + sCol[0] + ',' + sCol[1] + '%,' + sCol[2] + '%, 1)',
		secondaryNoteColors[note] = shslCol;
  	}

  	var allColors = {};
	allColors.primary = primaryNoteColors;
	allColors.secondary = secondaryNoteColors;

	return allColors;
}