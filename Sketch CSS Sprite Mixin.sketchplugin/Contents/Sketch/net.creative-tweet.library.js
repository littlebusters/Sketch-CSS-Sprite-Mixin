var cssSpriteGenerator = cssSpriteGenerator || {};

cssSpriteGenerator.init = function( context, _type ) {
	this.context = context;
	this.doc = context.document;
	this.artboard = this.doc.currentPage().currentArtboard();
	if( !this.artboard ) this.artboard = this.doc.currentPage().artboards().objectAtIndex( 0 );

	this.pasteBoard = null;
	this.pasteBoard = NSPasteboard.generalPasteboard();
	this.pasteBoard.declareTypes_owner( [ NSPasteboardTypeString ], null );

	this.prefix = '',
	this.sepalator = '',
	this.termination = ';';
	switch ( _type ) {
		case 'scss':
			this.prefix = '$';
			this.sepalator = ':';
			break;
		case 'less':
			this.prefix = '@';
			this.sepalator = ':';
			break;
		case 'stylus':
			this.prefix = '$';
			this.sepalator = ' =';
			break;
		default:
			this.prefix = '$';
			this.sepalator = ':';
			this.termination = '';
			break;
	}
	var	bgiSize      = 'bgiSize';
	this.bgiSizeWVal = this.prefix + bgiSize + 'W';
	this.bgiSizeHVal = this.prefix + bgiSize + 'H';
}

cssSpriteGenerator.getMixinSet = function( _type ) {
	return this.getMixin( _type ) + this.getSpriteValue( _type );
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
				bgImageEnd   = ' } )' + this.termination + '\n',
				ruleSetStart = '{',
				i = 1;
			break;
		case 'less':
			var varName = '@spriteVals',
				mixinStart = '.' + mixinName + '( ' + varName + ' ) {\n',
				mixinEnd   = '}\n',
				wrapStart = ' extract( ',
				listIdx   = ', ',
				wrapEnd   = ' )',
				bgImageStart = ' e( %( \'url(%s)\',',
				bgImageEnd   = ' ) )' + this.termination + '\n',
				ruleSetStart = '{',
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
				bgImageEnd   = ' )' + this.termination + '\n',
				ruleSetStart = '',
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
				bgImageEnd   = ' } )' + this.termination + '\n',
				ruleSetStart = '',
				i = 1;
			break;
	}

	var mixin  = mixinStart
			   + '\twidth:' + wrapStart + varName + listIdx + ( i++ ) + wrapEnd + this.termination + '\n'
			   + '\theight:' + wrapStart + varName + listIdx + ( i++ ) + wrapEnd + this.termination + '\n'
			   + '\tbackground-repeat: no-repeat' + this.termination + '\n'
			   + '\tbackground-image:' + bgImageStart 
									   + wrapStart + varName + listIdx + ( i++ ) + wrapEnd 
									   + bgImageEnd
			   + '\tbackground-position:' + wrapStart + varName + listIdx + ( i++ ) + wrapEnd
										  + wrapStart + varName + listIdx + ( i++ ) + wrapEnd + this.termination + '\n'
			   + '\t@media only screen and ( -webkit-min-device-pixel-ratio: 2 ), '
			   + 'only screen and ( min-device-pixel-ratio: 2 ) ' + ruleSetStart + '\n'
			   + '\t\tbackground-image:' + bgImageStart 
									   + wrapStart + varName + listIdx + ( i++ ) + wrapEnd 
									   + bgImageEnd
			   + '\t\t' + 'background-size: ' + this.bgiSizeWVal + ' ' + this.bgiSizeHVal + this.termination + '\n'
			   + '\t' + mixinEnd
			   + mixinEnd;

	return mixin;
}

cssSpriteGenerator.getSpriteValue = function( _type ) {
	var layers = this.artboard.layers(),
		spriteVariable = '',
		imageName      = this.artboard.name();
		imagePath      = '../img/' + imageName;

	spritePathVariableName  = this.prefix + this.artboard.name() + 'Path';
	spriteVariable += spritePathVariableName + this.sepalator + ' \'' + imagePath + '\'' + this.termination + '\n';

	spriteURLVariableName   = this.prefix + this.artboard.name() + 'URL';
	spriteURLVariableNamex2 = this.prefix + this.artboard.name() + 'x2URL';
	spriteVariable += spriteURLVariableName   + this.sepalator + ' ' + spritePathVariableName + ' + \'.png\'' + this.termination + '\n';
	spriteVariable += spriteURLVariableNamex2 + this.sepalator + ' ' + spritePathVariableName + ' + \'@2.png\'' + this.termination + '\n';

	spriteVariable += this.bgiSizeWVal + this.sepalator + ' ' + this.artboard.frame().width() + 'px' + this.termination + '\n';
	spriteVariable += this.bgiSizeHVal + this.sepalator + ' ' + this.artboard.frame().height() + 'px' + this.termination + '\n';

	for (var i = layers.count() - 1; i >= 0; i--) {
		var layer = layers.objectAtIndex( i );
			spriteVariable += this.prefix + layer.name() + this.sepalator
							+ ' ' + layer.frame().width() + 'px' 
							+ ' ' + layer.frame().height() + 'px'
							+ ' ' + spriteURLVariableName
							+ ' ' + ( 0 - layer.frame().x() ) + 'px' 
							+ ' ' + ( 0 - layer.frame().y() ) + 'px' 
							+ ' ' + spriteURLVariableNamex2
							+ this.termination + '\n';
	};

	return spriteVariable;
}