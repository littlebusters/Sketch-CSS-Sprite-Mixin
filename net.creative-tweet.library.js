// Shortcut to CSS Sprite Generator (shift cmd g)
var cssSpriteGenerator = cssSpriteGenerator || {};
var artboard = [[doc currentPage] currentArtboard];
if ( !artboard ) {
	artboard = [[[doc currentPage] artboards] objectAtIndex:0];
}
var pasteBoard = null;
pasteBoard = NSPasteboard.generalPasteboard();
pasteBoard.declareTypes_owner( [ NSPasteboardTypeString ], null );

cssSpriteGenerator.getMixinSet = function( _type ) {
	return this.getMixin( _type ) + this.getSpriteValue( _type )
}

cssSpriteGenerator.getMixin = function( _type ) {
	var mixinName = 'cssSprite';

	switch ( _type ) {
		case 'scss':
			var varName = '$spriteVals',
				mixinStart = '@mixin ' + mixinName + '( ' + varName + ' ) {\n',
				mixinEnd   = '}\n',
				wrapStart = ' nth( ',
				listIdx   = ', ',
				wrapEnd   = ' )',
				bgImageStart = ' url( #{',
				bgImageEnd   = ' } );\n',
				i = 1;
			break;
		case 'less':
			var varName = '@spriteVals',
				mixinStart = '.' + mixinName + '( ' + varName + ' ) {\n',
				mixinEnd   = '}\n',
				wrapStart = ' extract( ',
				listIdx   = ', ',
				wrapEnd   = ' )',
				bgImageStart = ' e(%(\'url(%s)\',',
				bgImageEnd   = ' ) );\n',
				i = 1;
			break;
		case 'stylus':
			var varName = '$spriteVals',
				mixinStart = mixinName + '( ' + varName + ' )\n',
				mixinEnd   = '\n',
				wrapStart = ' ',
				listIdx   = '[',
				wrapEnd   = ']',
				bgImageStart = ' url(',
				bgImageEnd   = ' );\n',
				i = 0;
			break;
		default:
			var varName = '$spriteVals',
				mixinStart = '@mixin ' + mixinName + '( ' + varName + ' ) {\n',
				mixinEnd   = '}\n',
				wrapStart = ' nth( ',
				listIdx   = ', ',
				wrapEnd   = ' )',
				bgImageStart = ' url( #{',
				bgImageEnd   = ' } );\n',
				i = 1;
			break;
	}

	var mixin  = mixinStart
			   + '\twidth:' + wrapStart + varName + listIdx + ( i++ ) + wrapEnd + ';\n'
			   + '\theight:' + wrapStart + varName + listIdx + ( i++ ) + wrapEnd + ';\n'
			   + '\tbackground-repeat: no-repeat;\n'
			   + '\tbackground-image:' + bgImageStart 
			   						   + wrapStart + varName + listIdx + ( i++ ) + wrapEnd 
			   						   + bgImageEnd
			   + '\tbackground-position:' + wrapStart + varName + listIdx + ( i++ ) + wrapEnd
										  + wrapStart + varName + listIdx + i + wrapEnd + ';\n'
			   + mixinEnd;

	return mixin;
}

cssSpriteGenerator.getExportDir = function() {
	var fileURL  = [doc fileURL],
		filePath = [fileURL path],
		fileDir  = filePath.split( [doc displayName] )[0];

	var exportDir = ( [artboard name] ).split( ':' )[1];

	if ( exportDir ) {

	} else {
		var openPanel = [NSOpenPanel openPanel];
			[openPanel setPrompt:@"Choose"];
			[openPanel setTitle:@"Choose an Export Directory"];
			[openPanel setCanCreateDirectories:true];
			[openPanel setCanChooseFiles:false];
			[openPanel setCanChooseDirectories:true];
			[openPanel setAllowsMultipleSelection:false];
			[openPanel setShowsHiddenFiles:false];
			[openPanel setExtensionHidden:false];
			[openPanel setDirectoryURL:[NSURL fileURLWithPath:"~/Documents/"]];
		[[NSApplication sharedApplication] activateIgnoringOtherApps:true];
		var openPanelButtonPressed = [openPanel runModal];
		if (openPanelButtonPressed == NSFileHandlingPanelOKButton) {
			exportDir = [[openPanel URL] path];
			print( exportDir );
			// return exportDir
		}
	}
}


cssSpriteGenerator.getSpriteValue = function( _type ) {
	var prefix = '',
		sepalator = '';

	switch ( _type ) {
		case 'scss':
			prefix = '$';
			sepalator = ':';
			break;
		case 'less':
			prefix = '@';
			sepalator = ':';
			break;
		case 'stylus':
			prefix = '$';
			sepalator = ' =';
			break;
		default:
			prefix = '$';
			sepalator = ':';
			break;
	}

	var layers = [artboard layers],
		spriteVariable = '',
		imagePath = '../img/' + [artboard name] + '.png';

	spritePathVariableName = prefix + [artboard name] + '-path';
	spriteVariable += spritePathVariableName + sepalator + ' \'' + imagePath + '\';\n';

	for (var i = [layers count] - 1; i >= 0; i--) {
		var layer = [layers objectAtIndex:i];
			spriteVariable += prefix + [layer name] + sepalator
						    + ' ' + [[layer frame] width] + 'px' 
						    + ' ' + [[layer frame] height] + 'px'
						    + ' ' + spritePathVariableName
						    + ' ' + ( 0 - [[layer frame] x] ) + 'px' 
						    + ' ' + ( 0 - [[layer frame] y] ) + 'px' 
						    + ';\n';
	};

	return spriteVariable;
}
