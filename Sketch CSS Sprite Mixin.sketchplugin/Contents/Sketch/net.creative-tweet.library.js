var cssSpriteGenerator = cssSpriteGenerator || {};

cssSpriteGenerator.init = function( context ) {
	this.context = context;
	this.doc = context.document;
	this.artboard = this.doc.currentPage().currentArtboard();
	if( !this.artboard ) this.artboard = this.doc.currentPage().artboards().objectAtIndex( 0 );

	this.pasteBoard = null;
	this.pasteBoard = NSPasteboard.generalPasteboard();
	this.pasteBoard.declareTypes_owner( [ NSPasteboardTypeString ], null );
}

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
				mixinStart = '=' + mixinName + '( ' + varName + ' )\n',
				mixinEnd   = '\n',
				wrapStart = ' nth( ',
				listIdx   = ', ',
				wrapEnd   = ' )',
				bgImageStart = ' url( #{',
				bgImageEnd   = ' }\n',
				i = 1;
			break;
	}

	var termination = ';';
	if( _type == 'sass' ) termination = ''; 
	// @media only screen and (-webkit-min-device-pixel-ratio: 2), 
	// only screen and (min-device-pixel-ratio: 2) {
	var mixin  = mixinStart
			   + '\twidth:' + wrapStart + varName + listIdx + ( i++ ) + wrapEnd + termination + '\n'
			   + '\theight:' + wrapStart + varName + listIdx + ( i++ ) + wrapEnd + termination + '\n'
			   + '\tbackground-repeat: no-repeat;\n'
			   + '\tbackground-image:' + bgImageStart 
									   + wrapStart + varName + listIdx + ( i++ ) + wrapEnd 
									   + bgImageEnd
			   + '\tbackground-position:' + wrapStart + varName + listIdx + ( i++ ) + wrapEnd
										  + wrapStart + varName + listIdx + i + wrapEnd + termination + '\n'
			   + mixinEnd;

	return mixin;
}

cssSpriteGenerator.getSpriteValue = function( _type ) {
	var prefix = '',
		sepalator = '',
		termination = ';';

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
			termination = '';
			break;
	}

	var layers = this.artboard.layers(),
		spriteVariable = '',
		imageName      = this.artboard.name();
		imagePath      = '../img/' + imageName + '.png',
		imagePathx2    =  '../img/' + imageName + '@2.png',

	spritePathVariableName   = prefix + this.artboard.name() + '-path';
	spritePathVariableNamex2 = spritePathVariableName + 'x2';
	spriteVariable += spritePathVariableName + sepalator + ' \'' + imagePath + '\';\n';
	spriteVariable += spritePathVariableNamex2 + sepalator + ' \'' + imagePathx2 + '\';\n';

	for (var i = layers.count() - 1; i >= 0; i--) {
		var layer = layers.objectAtIndex( i );
			spriteVariable += prefix + layer.name() + sepalator
							+ ' ' + layer.frame().width() + 'px' 
							+ ' ' + layer.frame().height() + 'px'
							+ ' ' + spritePathVariableName
							+ ' ' + ( 0 - layer.frame().x() ) + 'px' 
							+ ' ' + ( 0 - layer.frame().y() ) + 'px' 
							+ ';\n';
	};

	return spriteVariable;
}